class Tags {

  constructor() {
    this.items = {};
    this.callback = null;
  }

  /*
   * Add tag to object and HTML
   */

  add(tag, enabled = true) {

    // Handle null value or doubles
    if (!tag || this.items[tag]) {
      return false;
    }


    // Add tag
    const e = document.createElement('div');
    e.classList.add('tag');
    e.classList.add('tag-item');
    e.innerText = tag;

    if (this.callback) {
      e.addEventListener('click', this.callback);
      e.classList.add('clickable');
    }

    if (!enabled) {
      e.classList.add(['tag-disabled']);
    }

    elements.tags.container.appendChild(e);

    this.items[tag] = {
      enabled,
      e,
      toggle() {
        if (this.enabled) {
          this.e.classList.add(['tag-disabled']);
        } else {
          this.e.classList.remove(['tag-disabled']);
        }
        this.enabled = !this.enabled;
      }
    };

    return true;
  }

  /*
   * Remove single tag from object and html
   */
  remove(tag) {
    // Handle null value or doubles
    if (!tag || !this.items[tag]) {
      return false;
    }

    // Remove html element
    elements.tags.container.removeChild(this.items[tag].e);

    // Remove tag from array
    delete this.items[tag];
  }

  /*
   * Remove all tags
   */
  removeAll() {
    for (const key in this.items) {
      this.remove(key);
    }
  }

  /*
   * Remove disabled tags
   */
  removeDisabled() {
    for (const tag in this.items) {
      if (!this.items[tag].enabled) {
        this.remove(tag);
      }
    }
  }

  /*
   * Return list of active tags
   */
  list() {
    let result = [];
    for (const tag in this.items) {
      if (this.items[tag].enabled) {
        result.push(tag)
      }
    }
    return result;
  }

  setClickHandler(callback) {
    this.callback = callback;
  }
}

const tags = new Tags;

tags.setClickHandler(e => {
  const me = e.target;
  const tag = me.innerText;

  if (!content.details.visible) {
    tags.remove(tag);
  } else {
    tags.items[tag].toggle();
  }

  elements.search.innerText = "New search!";

});

