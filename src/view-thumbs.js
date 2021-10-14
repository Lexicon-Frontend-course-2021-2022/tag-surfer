/*
 * Thumbs class
 *
 * Handles all code related to displaying/searching thumbs etc.
 */
class Thumbs {
  constructor() {
    this.items = {};
    this.search.options = null; // Used for search paging...
  }

  // Add photo
  add(photo, callback) {

    const key = `${photo.id}`;

    const e = document.createElement('div');
    e.classList.add('thumb');
    e.classList.add('faded'); // Start as faded

    // Set background image
    e.style.backgroundImage =
      `url("https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg")`;

    // Add to main
    views.thumbs.self.appendChild(e);

    this.items[key] = {
      e,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      tags: [],
    };

    // Get photo details and connect event listener for 'click'-handling.
    flickrPhotosGetInfo(photo.id, photo.secret).then(res => {
      // Only update if image is part of current set.
      if (key in this.items) {
        const t = this.items[key].tags;

        res.photo.tags.tag.forEach(e => {
          if (tags.list().indexOf(e._content) === -1) {
            t.push(e._content);
          }
        });

        if (t.length) {
          const p = document.createElement('p');
          p.classList.add('num-tags');
          p.innerText = `+${t.length} tags`;
          e.appendChild(p);
        }

        e.addEventListener('click', e => {
          views.details.displayPhoto(this.items[key]);
        });

        // Enable this
        e.classList.remove('faded');
        e.classList.add('clickable');
      } else {
        try {
          views.thumbs.self.removeChild(e);
        } catch (_) { }
      }
    });

  }

  /* 
   * Remove all thumbs
   *
   * NOTE: This does not cancel outstanding http requests!
   * 
   */

  removeAll() {
    for (const k in this.items) {
      this.remove(k);
    }

    // HACK: Remove lingering thumbs.
    // Asyncronous code is funky! :)
    views.thumbs.self.childNodes.forEach(e => {
      views.thumbs.self.removeChild(e);
    });

  }

  remove(id) {
    views.thumbs.self.removeChild(this.items[id].e);
    delete this.items[id];
  };
  /*
   * Search flickr for photos
   * If options are missing, get next page of last search...
   */
  async search(options = null) {
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
    // Add thumbs to page

    const result = await flickrCallback(options);

    // Since we're running asynchrounos, we may need to set a known state here...
    views.thumbs.show();
    tags.removeDisabled();

    // Remove lingering "More..." button
    document.querySelectorAll('.more-button').forEach(e => {
      e.parentNode.removeChild(e);
    });

    try {
      for (const photo of result.photos.photo) {
        this.add(photo);
      }
      if (result.photos.page < result.photos.pages) {
        this.addMoreButton();
      }
    } catch (e) { }
  };

  // Naïve more...
  addMoreButton() {

    const e = document.createElement('div');
    e.classList.add('thumb');
    e.classList.add('more-button'); // Start as faded
    e.innerText = "More...";

    // Clicking "More..." starts a new search for next page
    e.addEventListener('click', () => {
      e.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
      document.removeEventListener('click', e);
      this.search();
    });

    // Add to thumbs container
    views.thumbs.self.appendChild(e);

  }
}

const thumbs = new Thumbs;
