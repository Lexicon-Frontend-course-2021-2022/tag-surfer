/* ============================================================================
 * Details view
 *
 * Handles all code related to details view
 * ========================================================================== */


/*
 * Create function to render details view
 */
views.details.displayPhoto = indata => {

  // Add disabled tags to tag bar
  indata.tags.forEach(tag => {
    tags.add(tag, false);
  });

  // Set background image & show details
  views.details.e.style.backgroundImage = `url('${indata.url}')`;
  views.details.show();
}

/*
 * 'click' event handler.
 *
 * Close details view and show thumbs instead
 */
views.details.e.addEventListener('click', () => {
  views.thumbs.show();
});

/*
 * onHide() callback (see views.js) to remove disabled tags from tag bar
 */
views.details.onHide = () => {
  tags.removeDisabled();
};