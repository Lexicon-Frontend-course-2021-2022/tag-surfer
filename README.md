# Tag Surfer

Dynamically Surf the flickr API using tags. 

### Notes

This was a fun project, in which I tried to separate and encapsulate functionality based on my current understanding of JavaScript. Specifically, I wantet to handle different views, and built a very simple View Class, complete with onShow()/onHide() hooks to handle switching views.

To enable view handling on html elements, simply give the element ```<element ... class="view-handler" ... >``` and it will automatically be enabled for view handling. Hidden elements get the class ```hidden``` while not visible. Use css to hide elements.

```html
<!-- Create four views -->

<!-- start veiew -->
<div id="start" class="view-handler">
    <!-- content -->
</div>

<!-- spinner view  -->
<div id="spinner" class="view-handler">
    <!-- content -->
</div>

<!-- thumbs view -->
<div id="thumbs" class="view-handler">
    <!-- content -->
</div>

<!-- details view -->
<div id="details" class="view-handler">
    <!-- content -->
</div>
```

```css
/* Hide hidden views */
.view-handler.hidden {
    visibility: hidden !important; 
    display: none !important;
    height: 0 !important;
    width: 0 !important;
}
```

```javascript
/*
 * create views object, hook onShow() for view details
 * and show view details
 */

views = new Views();

views.details.onShow = parms => {
    console.log(`views.details.onShow(${parms})`;
});

views.details.show('You can pass parms to show(), available to onShow()/onHide()');
```


The flickr API was encapsulated to hide the implementation, and instead just pass an object with the parameters.

```javascript
/* Example call to flickr API flickr.photos.getRecent */
const result = await flickrCallback({
    method: "flickr.photos.getRecent",
    per_page: 10,
    page: 1
  });
```


### Known bugs
- Sometimes there are lingering thumbs left when making a new search and waiting for more images at the same time
- When disabling tags in details view, these tags will never be associated with that thumb. This stems from a very naïve way of storing only NEW tags for each tumb.
- The marker for new tags in thumbs view is static, so thay will not reflect the state of the tag bar
- The app looks **REALLY** funky on Firefox! It looks ok on Chrome & Safari. I have **NO IDEA** what it looks like on other browsers.


### Reflections
Needless to say, if doing this project in a week or two it would probably look completely different. Learning JavaScript is fun, but I am currently only scratching the surface of what is possible. The more you know, the more you know that you don't know... :D