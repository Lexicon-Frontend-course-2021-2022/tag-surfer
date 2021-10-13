content.details.photo = document.querySelector('#details-image');

content.details.displayPhoto = res => {

  res.tags.forEach(tag => {
    tags.add(tag, false);
  });
  content.details.photo.src = res.url;

  content.details.show();
}

content.details.photo.addEventListener('click', () => {

  tags.removeDisabled();
  content.thumbs.show();

});