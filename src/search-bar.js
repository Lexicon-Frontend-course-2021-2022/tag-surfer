/*
 * Handle "New search!"
 */

document.querySelector('#new-search-bar').addEventListener('click', e => {

  // Hide search bar by removing text
  e.target.innerHTML = '';

  if (!tags.list().length) {

    // Nothing to search for, only disabled tags left
    // Show start view
    tags.removeAll();
    views.start.show();
    return;

  } else {

    // Make new search based on current tags
    tags.removeDisabled();
    thumbs.clear();
    views.spinner.show();
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