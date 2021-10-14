/*
  Start content interactivity!
 */

// Add elements specific for start page
views.start.input = document.querySelector('#start-tags');
views.start.button = document.querySelector('#start-button');

views.start.input.addEventListener('input', e => {
  if (e.target.value) {
    views.start.button.innerText = 'Go!';
  } else {
    views.start.button.innerText = 'Surpise me!';
  }
});

views.start.button.addEventListener('click', e => {
  e.preventDefault();
  if (views.start.input.value) {
    views.start.input.value.split(' ').forEach(tag => {
      tags.add(tag.toLowerCase(), true);
    })

  }

  views.spinner.show();
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

// Clear search text on show
views.start.onShow = () => {
  console.log('onShow', this);
  views.start.input.value = null;
  views.start.button.innerText = 'Surprise me!';
}