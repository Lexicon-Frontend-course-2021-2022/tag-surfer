/* ============================================================================
 * Thumbs class
 *
 * Handles all code related to displaying/searching thumbs etc.
 * ========================================================================== */

class Thumbs {

  constructor() {
    this.items = {};
    this.search.options = null; // Used for search paging...
  }

  /* ============================================================================
   * Add thumb
   * ========================================================================== */

  add(photo, callback) {

    const key = photo.id;

    const e = document.createElement('div');

    // Create and add thumb
    e.classList.add('thumb');
    e.classList.add('faded'); // Start as faded
    e.style.backgroundImage = `url("https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg")`;
    views.thumbs.e.appendChild(e);

    // Store thumb details
    this.items[key] = {
      e,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      tags: [],
    };

    /*
     * Get photo details and connect event listener for 'click'-handling.
     *
     * This happens asynchronously and faded thumbs will unfade as responses are received.
     */
    flickrPhotosGetInfo(photo.id, photo.secret).then(res => {

      // Only update if thumb is in known set of thumbs
      if (key in this.items) {

        const item = this.items[key];

        // Only add unique tags. 
        // (Testing to see what the code looks like using &&-stringing instead of if-construct.)
        res.photo.tags.tag.forEach(e => tags.list().indexOf(e._content) === -1 && item.tags.push(e._content));

        // If we have *ANY* unique tags, show on thumb
        if (item.tags.length) {
          const p = document.createElement('p');
          p.classList.add('num-tags');
          p.innerText = `+${item.tags.length} tags`;
          e.appendChild(p);
        }

        // Clicking on a thumb opens details view for picture
        e.addEventListener('click', e => views.details.show(item));

        // Enable thumb
        e.classList.remove('faded');
        e.classList.add('clickable');

      } else {

        /*
         * Na??ve way on handling responses for thumbs we know nothing about.
         *
         * Try to delete the element. It may, or may not, exist.
         */

        try { views.thumbs.e.removeChild(e); } catch (_) { }

      }

    });

  }

  /* ============================================================================
   * Remove all thumbs
   *
   * NOTE: This does not cancel outstanding http requests!
   * ========================================================================== */

  removeAll() {

    // Remove all thumbs we KNOW about.
    for (const k in this.items) this.remove(k);

    // HACK: Remove lingering thumbs we DON'T know about.
    // Asyncronous code is quite funky! :)
    views.thumbs.e.childNodes.forEach(e => views.thumbs.e.removeChild(e));

  }

  /* ============================================================================
   * Remove specific thumb
   * ========================================================================== */

  remove(id) {
    views.thumbs.e.removeChild(this.items[id].e);
    delete this.items[id];
  };


  /* ============================================================================
   * Search flickr for photos
   * If options are missing, perform paged search based on last search
   * ========================================================================== */

  async search(options = null) {

    /*
     * Handle option persitance for paging
     */
    if (!options) {
      if (!this.search.options) {
        return false;
      } else {
        options = this.search.options;
        options.page++;
        if (options.page > options.pages) {
          return false;
        }
      }
    } else {
      options.page = 1;
    }
    this.search.options = options;


    /*
     * Perform search and add thumbs
     */

    const result = await flickrCallback(options);

    // Doing this here ensures we're in a known state.
    // Asynchronous code is quite funky! :)
    views.thumbs.show();
    tags.removeDisabled();


    // We have results - remove any lingering "More..." button
    document.querySelectorAll('.more-button').forEach(e => {
      e.parentNode.removeChild(e);
    });

    // If we have valid results, add thumbs AND a "More..." button.
    // Wrap this in try ... catch in order to avoid error handling.
    try {
      for (const photo of result.photos.photo) {
        this.add(photo);
      }
      if (result.photos.page < result.photos.pages) {
        this.addMoreButton();
      }
    } catch (e) { }

  };

  /* ============================================================================
   * Add a na??ve "More..." button for paging results...
   * ========================================================================== */

  addMoreButton() {

    const e = document.createElement('div');

    e.classList.add('thumb');
    e.classList.add('more-button');

    e.innerText = "More...";

    // Add event listsner to start a paged search when clicked.
    e.addEventListener('click', () => {
      e.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
      document.removeEventListener('click', e);
      this.search();
    });

    // Add to thumbs container
    views.thumbs.e.appendChild(e);
  }
}

const thumbs = new Thumbs;

