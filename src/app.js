class Thumbs {
  constructor() {
    this.items = {};
    this.callback = null;
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
    content.thumbs.self.appendChild(e);

    this.items[key] = {
      e,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      tags: [],
    };

    // Get photo details and connect event listener for 'click'-handling.
    flickrPhotosGetInfo(photo.id, photo.secret).then(res => {
      try {
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
          content.details.displayPhoto(this.items[key]);
        });

        // Enable this
        e.classList.remove('faded');
        e.classList.add('clickable');
      } catch { };
    });

  }

  /* 
   * Remove all thumbs
   *
   * NOTE: This does not cancek outstanding http requests!
   * 
   */

  clear() {
    for (const [k, v] of Object.entries(this.items)) {
      content.thumbs.self.removeChild(v.e);
      delete this.items[k];
    }
  }

  /*
   * Search flickr for photos
   * If options are missing, get next page of last search...
   */
  async search(options = null) {
    if (!options) {
      if (!this.options) {
        console.log("No options!")
        return false;
      } else {
        options = this.options;
        options.page++;
        if (options.page > options.pages) {
          return false;
        }
      }
    } else {
      options.page = 1;
    }
    this.options = options;
    // Add thumbs to page

    const result = await flickrCallback(options);
    content.thumbs.show();

    console.log(result);

    // Remove lingering "More..." buttons
    const more = document.querySelectorAll('.more-button');
    more.forEach(e => {
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


    e.addEventListener('click', () => {
      e.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
      document.removeEventListener('click', e);
      this.search();
    });

    // Add to main
    content.thumbs.self.appendChild(e);

  }

}

const thumbs = new Thumbs;

content.start.show();