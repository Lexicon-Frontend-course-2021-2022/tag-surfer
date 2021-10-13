/*
  Start content interactivity!
 */

// Add elements specific for start page
content.start.input = document.querySelector('#start-tags');
content.start.button = document.querySelector('#start-button');

content.start.input.addEventListener('input', e => {
  if (e.target.value) {
    content.start.button.innerText = 'Go!';
  } else {
    content.start.button.innerText = 'Surpise me!';
  }
});

content.start.button.addEventListener('click', e => {
  e.preventDefault();
  if (content.start.input.value) {
    content.start.input.value.split(' ').forEach(tag => {
      tags.add(tag.toLowerCase(), true);
    })

  }

  content.spinner.show();
  thumbs.clear();

  if (!tags.list().length) {
    thumbs.search(
      {
        method: "flickr.photos.search",
        tag_mode: 'all',
        media: 'photos',
        per_page: 25,
      }
    );
  } else {
    thumbs.search(
      {
        method: "flickr.photos.search",
        tags: tags.list().join(','),
        tag_mode: 'all',
        media: 'photos',
        per_page: 25,
      }
    );
  }

});
