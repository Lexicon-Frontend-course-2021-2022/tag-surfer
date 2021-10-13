/*
 * Simple class to switch content.
 *
 * We simply tag content to be hidden with class 
 * "content-handler-hidden" and style this in css.
 * 
 * All content you want to switch between *SHOULD* have
 * the same parent, and have class "content-handler"
 * 
 */
class ContentHandler {
  constructor() {

    // Add all elements with class content-handler
    document.querySelectorAll('.content-handler').forEach(self => {

      self.classList.add('content-handler-hidden');
      // Add content with an id
      if (self.id) {
        const that = this;

        this[self.id] = {
          self,
          visible: false,

          // Show this content. Hide all others.
          show() {
            for (const key in that) {
              const s = that[key];
              if (s.self !== self) {
                s.self.classList.add('content-handler-hidden');
                s.visible = false;
              }
              this.self.classList.remove('content-handler-hidden');
              this.visible = true;
            }
          }
        };
      }
    });
  }
}

const content = new ContentHandler;

