/*
 * Simple class to switch views.
 *
 * We simply tag views to be hidden with class 
 * "view-handler-hidden" and style this in css.
 * 
 * All views you want to switch between *SHOULD* have
 * the same parent, and *MUST* have class "view-handler"
 * 
 */
class Views {
  constructor() {

    // Add all elements with class view-handler
    document.querySelectorAll('.view-handler').forEach(self => {

      self.classList.add('view-handler-hidden');
      // Add content with an id
      if (self.id) {
        const that = this;

        this[self.id] = {
          self,
          visible: false,

          // Show this view. Hide all others.
          show() {
            for (const key in that) {
              const s = that[key];
              if (s.self !== self) {
                s.self.classList.add('view-handler-hidden');
                s.visible = false;
                s.onHide();
              }
            }
            this.onShow();
            this.self.classList.remove('view-handler-hidden');
            this.visible = true;
          },

          // Override these to perform code when view is shown/hidden
          onShow() { console.log("Showing wiew:", self.id); },
          onHide() { return; },
        };
      }
    });
  }
}

const views = new Views;

