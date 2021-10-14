/* ============================================================================
 * Start view
 *
 * Handles all code related to start view (The search form)
 * ========================================================================== */

// Add elements specific for start view
views.start.input = document.querySelector('#start-tags');
views.start.button = document.querySelector('#start-button');

/*
 * Event listener for input field
 *
 * Empty field: button says 'Surprise me!'
 * Text in field: button says 'Go!'
 */
views.start.input.addEventListener('input', e => {

  if (e.target.value) {
    views.start.button.innerText = 'Go!';
  } else {
    views.start.button.innerText = 'Surpise me!';
  }
});

/*
 * Event listener for button
 *
 * Empty input field: 
 *   Search for recent photos
 * 
 * Text in input field: 
 *   Add space delimited text as tags and perform a 
 *   tag-based search (If we got any valid tags)
 */
views.start.button.addEventListener('click', e => {

  e.preventDefault();

  // Add tags
  if (views.start.input.value) {
    views.start.input.value.split(' ').forEach(tag => {
      tags.add(tag.toLowerCase(), true);
    })
  }

  // We want a spinner and an empty thumbs page when searching...
  views.spinner.show();
  thumbs.removeAll();

  // Perform actual search
  if (!tags.list().length) {

    // No valid tags
    thumbs.search(
      {
        method: "flickr.photos.getRecent",
        media: 'photos',
        per_page: 20,
      }
    );

  } else {

    // We got some tags, perform tag-based search
    thumbs.search(
      {
        method: "flickr.photos.search",
        tags: tags.list().join(','),
        tag_mode: 'all',
        media: 'photos',
        per_page: 20,
      }
    );

  }
});

/*
 * Always reset controls when search view is shown.
 */
views.start.onShow = () => {
  views.start.input.value = null;
  views.start.button.innerText = 'Surprise me!';
}
