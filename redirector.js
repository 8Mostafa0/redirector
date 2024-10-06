addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  /**
   * Handle the incoming request
   * @param {Request} request
   */
  async function handleRequest(request) {
    // Extract the image URL from the query parameter 'url'
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
  
    if (!imageUrl) {
      return new Response('Missing "url" query parameter.', { status: 400 })
    }
  
    try {
      // Fetch the image from the provided URL
      const response = await fetch(imageUrl)
  
      if (!response.ok) {
        return new Response('Failed to fetch the image.', { status: 500 })
      }
  
      // Copy response headers, especially the content-type
      const headers = new Headers(response.headers)
      headers.set('Access-Control-Allow-Origin', '*') // Enable CORS if necessary
  
      return new Response(response.body, {
        status: response.status,
        headers: headers
      })
    } catch (error) {
      return new Response('Error fetching image.', { status: 500 })
    }
  }
  