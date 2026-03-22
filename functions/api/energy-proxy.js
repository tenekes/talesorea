export async function onRequest({ request }) {
  const url = new URL(request.url);
  let target = url.searchParams.get("target");
  
  if (!target) {
    return new Response("Missing target parameter", { status: 400 });
  }

  try {
    // Reconstruct full URL if it had multiple query params
    const targetUrl = new URL(target);
    url.searchParams.forEach((val, key) => {
      if (key !== 'target') targetUrl.searchParams.append(key, val);
    });

    const response = await fetch(targetUrl.toString());
    
    // Clone response to modify headers
    const newResponse = new Response(response.body, response);
    
    // Inject CORS headers to allow frontend fetching
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    
    // Aggressively cache data at the Cloudflare Edge layer!
    // This turns Cloudflare into a massive global storage, preventing external crashes.
    const isHistorical = target.includes("start=") && target.includes("end=");
    
    // Previous month data NEVER changes. Cache it on Cloudflare for 24 hours (86400 seconds).
    // Today's data changes daily. Cache it on Cloudflare for 2 hours (7200 seconds).
    const cacheTime = isHistorical ? 86400 : 7200;
    
    // CRITICAL FIX: Only apply the static cache if the remote energy API responds successfully!
    // This prevents 429 (Too many requests) or 500 errors from becoming immortalized in the Edge network cache.
    if (response.ok) {
      newResponse.headers.set("Cache-Control", `public, max-age=${cacheTime}`);
    } else {
      newResponse.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    }
    
    return newResponse;
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
