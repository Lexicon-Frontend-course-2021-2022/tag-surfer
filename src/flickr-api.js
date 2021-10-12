/*
 * Define simple flickr API to keep app readable
 */


/*
 * Generic flickr API. This can be used to invoke any API method.
 *
 * We're building request url using some common options to hide details and to
 * make the rest of the code easier on the eyes.
 * 
 * This function will be wrapped by functions for each API method we want
 * to use in the app.
 */

const flickrCallback = async (options) => {

  // Build base request for endpoint 
  let url = `https://api.flickr.com/services/rest/`;

  // We only want to use json, and no callbacks.
  const common = {
    api_key: secrets.flickr.key,  // Defined in secrets.js
    format: 'json',
    nojsoncallback: 1,
  };


  // Add options to url
  let delimiter = '?';
  for (const [key, value] of Object.entries({ ...common, ...options })) {
    url += `${delimiter}${key}=${value}`;
    delimiter = '&';
  }

  // No error handling. Let's just assume the world is flawless! :D
  const result = await fetch(url);
  const json = await result.json();
  return json;
};

/*
 * Get recent photos
 */
const flickrPhotosGetRecent = async (per_page, page = 1) => {
  return await flickrCallback({
    method: "flickr.photos.getRecent",
    per_page,
    page
  });
};

