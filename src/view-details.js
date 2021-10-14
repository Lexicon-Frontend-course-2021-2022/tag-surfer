/*
 * Handle "details" view
 */


// Render details
views.details.displayPhoto = res => {
  res.tags.forEach(tag => {
    tags.add(tag, false);
  });
  views.details.self.style.backgroundImage = `url('${res.url}')`;
  views.details.show();
}

// Click handler
views.details.self.addEventListener('click', () => {
  tags.removeDisabled();
  views.thumbs.show();
});