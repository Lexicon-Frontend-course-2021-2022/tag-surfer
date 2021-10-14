/* ============================================================================
 * Details view
 *
 * Handles all code related to details view
 * ========================================================================== */


/* ============================================================================
 * onShow() override to add disabled tags to tag-bar and set image
 * ========================================================================== */
views.details.onShow = indata => {

  // Add disabled tags to tag bar
  indata.tags.forEach(tag => tags.add(tag, false));

  // Set background image & show details
  views.details.e.style.backgroundImage = `url('${indata.url}')`;
};

/* ============================================================================
 * onHide() override (see views.js) to remove disabled tags from tag bar
 * ========================================================================== */
views.details.onHide = () => tags.removeDisabled();

/* ============================================================================
 * 'click' event handler. Close details and show thumbs instead.
 * ========================================================================== */
views.details.e.addEventListener('click', () => views.thumbs.show());
