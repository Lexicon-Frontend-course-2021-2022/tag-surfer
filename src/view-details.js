/*
 * Handle "details" view
 */


// Render details
views.details.displayPhoto = indata => {

  // Add disabled tags
  indata.tags.forEach(tag => {
    tags.add(tag, false);
  });

  // Set background image & show details
  views.details.self.style.backgroundImage = `url('${indata.url}')`;
  views.details.show();
}

// Click handler
views.details.self.addEventListener('click', () => {
  views.thumbs.show();
});

// Clear disabled tags when hiding details view
views.details.onHide = () => {
  tags.removeDisabled();
};