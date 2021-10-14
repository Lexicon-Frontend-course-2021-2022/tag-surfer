/* ============================================================================
 * Tag handler
 *
 * Handles all code related to tags and the tag bar
 * ========================================================================== */

class Tags {

  constructor(selector, callback) {
    this.items = {};
    this.callback = callback;
    this.container = document.querySelector(selector);
  }

  /* ============================================================================
   * Add tag
   * ========================================================================== */

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
      e.classList.add(['disabled']);
    }

    this.container.appendChild(e);

    this.items[tag] = {
      enabled,
      e,
      toggle() {
        if (this.enabled) {
          this.e.classList.add(['disabled']);
        } else {
          this.e.classList.remove(['disabled']);
        }
        this.enabled = !this.enabled;
      }
    };

    return true;
  }

  /* ============================================================================
   * Remove single tag
   * ========================================================================== */

  remove(tag) {
    // Handle null value or doubles
    if (!tag || !this.items[tag]) {
      return false;
    }

    // Remove html element
    this.container.removeChild(this.items[tag].e);

    // Remove tag from array
    delete this.items[tag];
  }

  /* ============================================================================
   * Remove all tags
   * ========================================================================== */

  removeAll() {
    for (const key in this.items) {
      this.remove(key);
    }
  }

  /* ============================================================================
   * Remove all disabled tags
   * ========================================================================== */
  removeDisabled() {
    for (const tag in this.items) {
      if (!this.items[tag].enabled) {
        this.remove(tag);
      }
    }
  }

  /* ============================================================================
   * Return list of enabled tags
   * ========================================================================== */
  list() {
    let result = [];
    for (const tag in this.items) {
      if (this.items[tag].enabled) {
        result.push(tag)
      }
    }
    return result;
  }

}


/*
 * Create tags object
 *
 * Pass in our selector and the 'click' event handler
 */

const tags = new Tags('#tag-bar', e => {

  const tag = e.target.innerText;

  /*
   * Clicking in details view toggles between enabled/disables
   * Anywhere else, tag is removed
   */
  if (!views.details.visible) {
    tags.remove(tag);
  } else {
    tags.items[tag].toggle();
  }

  // Add text to "New search!" bar to show it.
  document.querySelector('#new-search-bar').innerText = "New search!";

});

