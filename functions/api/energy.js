export async function onRequest({ request }) {
  const zones = [
    "GR", "DE-LU", "FR", "IT-North", "ES", "AT", "BE", 
    "NL", "PL", "PT", "RO", "BG", "HU", "CZ", "SK", 
    "SI", "HR", "RS", "CH", "DK1", "FI", "EE", "LT", "LV"
  ];
  
  const results = [];
  
  // Fetch in chunks to avoid overwhelming the external API and avoid rate limiting/503s
  for (let i = 0; i < zones.length; i += 4) {
    const chunk = zones.slice(i, i + 4);
    const chunkPromises = chunk.map(async (zone) => {
      try {
        const resp = await fetch(`https://api.energy-charts.info/price?bzn=${zone}`);
        if (!resp.ok) return { code: zone, price: null, source: "N/A" };
        
        const data = await resp.json();
        if (data && data.price && data.price.length > 0) {
          const avg = data.price.reduce((a, b) => a + b, 0) / data.price.length;
          return { code: zone, price: avg, source: "Energy-Charts" };
        }
        return { code: zone, price: null, source: "N/A" };
      } catch (e) {
        return { code: zone, price: null, source: "N/A" };
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600" // Cache results at the Edge for 1 hour!
    }
  });
}
