/* ============================================================================
 * "New search!" handler.
 *
 * Basically just a 'click' event handler to initiate a new serch when clicked.
 * ========================================================================== */

document.querySelector('#new-search-bar').addEventListener('click', e => {

  // Hide search bar by removing text
  e.target.innerHTML = '';

  if (!tags.list().length) {

    /*
     * We have no enabled tags left to search for.
     * Show start view instead...
     */
    tags.removeAll();
    views.start.show();

  } else {

    /*
     * Set known state and perform a new search based on enabled tags
     */
    tags.removeDisabled();
    thumbs.removeAll();
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