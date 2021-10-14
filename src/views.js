/* ============================================================================
 * Simple class to switch views.
 *
 * We simply tag views to be hidden with class "view-handler-hidden" and style 
 * this in css.
 * 
 * All views you want to switch between *SHOULD* have the same parent, and 
 * *MUST* have class "view-handler" *AND* an id.
 * ========================================================================== */

class Views {

  constructor() {

    /*
     * Add all html elements with class "view-handler"
     */
    document.querySelectorAll('.view-handler').forEach(self => {

      /*
       * Only add elements with an id
       */
      if (self.id) {

        // Start off as hidden
        self.classList.add('view-handler-hidden');

        // Save this 'this' context for elements
        const that = this;

        /*
         * Create new key 'id' in object for new view
         */
        this[self.id] = {
          self,
          visible: false,

          /*
           * Call to show this view. Hide all others.
           *
           * ie. views.id.show();
           * 
           */
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

          /*
           * Override these to perform code when view is shown/hidden
           */
          onShow() { },
          onHide() { },
        };
      }
    });
  }
}

const views = new Views;

