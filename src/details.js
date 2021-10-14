//content.details.photo = document.querySelector('#details-image');

content.details.displayPhoto = res => {

  res.tags.forEach(tag => {
    tags.add(tag, false);
  });
  content.details.self.style.backgroundImage = `url('${res.url}')`;

  content.details.show();
}

content.details.self.addEventListener('click', () => {

  tags.removeDisabled();
  content.thumbs.show();

});