/* ============================================================================
 * Simple class to switch views.
 *
 * We simply tag views to be hidden with class "hidden" and style 
 * ".view-handler.hidden" in css.
 * 
 * All views you want to switch between *SHOULD* have the same parent, and 
 * *MUST* have class "view-handler" *AND* an id.
 * ========================================================================== */

class Views {

  constructor() {

    /*
     * Iterate elements with class "view-handler"
     */
    document.querySelectorAll('.view-handler').forEach(e => {

      /*
       * Only add elements with an id
       */
      if (e.id) {

        // Start off hidden
        e.classList.add('hidden');

        // Save this 'this' context for elements
        const that = this;

        /*
         * Create new key 'id' in object for new view
         */
        this[e.id] = {
          e,
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
              if (s.e !== e) {
                s.e.classList.add('hidden');
                s.visible = false;
                s.onHide();
              }
            }
            this.onShow();
            this.e.classList.remove('hidden');
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

