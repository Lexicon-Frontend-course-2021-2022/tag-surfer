/*
 *
 */
elements.search = document.querySelector('#new-search-bar');

elements.search.addEventListener('click', () => {

  elements.search.innerText = "";

  console.log(tags.list());
  // Nothing to search for, only disabled tags left
  if (!tags.list().length) {
    content.start.input.value = '';
    tags.removeAll();
    content.start.show();
    return;
  } else {
    tags.removeDisabled();
    thumbs.clear();
    content.spinner.show();
    thumbs.search(
      {
        method: "flickr.photos.search",
        tags: tags.list().join(','),
        tag_mode: 'all',
        media: 'photos',
        per_page: 10,
      }
    );
  }

});