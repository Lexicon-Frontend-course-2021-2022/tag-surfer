/*
 * Simple class to switch content.
 *
 * We simply tag content to be hidden with class 
 * "content-handler-hidden" and style this is css.
 * 
 * All content you want to switch between *SHOULD* have
 * the same parent, and have class "content-handler"
 * 
 */
class ContentHandler {
  constructor() {

    // Add all elements with class content-handler
    document.querySelectorAll('.content-handler').forEach(e => {

      e.classList.add('content-handler-hidden');

      // Add content with an id
      if (e.id) {
        const that = this;

        this[e.id] = {
          e,

          // Show this content. Hide all others.
          show() {
            for (const key in that) {
              const s = that[key];
              if (s.e !== e) {
                s.e.classList.add('content-handler-hidden');
              }
              this.e.classList.remove('content-handler-hidden');
            }
          }
        };
      }
    });
  }
}

const content = new ContentHandler;



