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
  let url = secrets.flickr.endpoint;

  // We only want to use json, and no callbacks.
  const common = {
    api_key: secrets.flickr.key,  // Defined in secrets.js
    format: 'json',
    nojsoncallback: 1,
  };


  // Add options to url
  let delimiter = '?';
  for (const [key, value] of Object.entries({ ...common, ...options })) {
    // This REALLY should use url-escaping, but for this simple project I won't bother. :)
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

/*
 * Search photos by tags
 */
const flickrPhotosSearchByTags = async (tags, per_page = 20, page = 1) => {
  return await flickrCallback({
    method: "flickr.photos.search",
    tags: tags.join(','),
    tag_mode: 'all',
    media: 'photos',
    per_page,
    page
  });
};

/*
 * Get photo details
 */
const flickrPhotosGetInfo = async (photo_id, secret) => {
  return await flickrCallback({
    method: "flickr.photos.getInfo",
    photo_id,
    secret
  });
};
