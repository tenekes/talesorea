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
    
    // Aggressive caching of 1 hour to heavily minimize external API load
    newResponse.headers.set("Cache-Control", "public, max-age=3600");
    
    return newResponse;
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
