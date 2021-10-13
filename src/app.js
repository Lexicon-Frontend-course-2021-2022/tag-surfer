const thumbnailsWrapper = document.querySelector("#thumbnails");
const initWrapper = document.querySelector("#init");



// (Re-)populate main area with thumbs
const fillContent = content => {
  const photos = content.photos.photo;
  let thumb;

  thumbnailsWrapper.style.visibility = "visible";
  thumbnailsWrapper.style.width = "100%";
  initWrapper.style.visibility = "hidden";
  initWrapper.style.width = "0";

  while (thumb = document.querySelector('.thumb')) {
    thumbnailsWrapper.removeChild(thumb);
  }

  for (photo of photos) {
    createThumb(photo)
  }
};

/* Render thumbnail.
 * 
 * Keep thumbnail faded until details have been fetched. Then unfade,
 * add tag-info and connect to click-handler.
 */
const createThumb = photo => {
  const div = document.createElement('div');
  div.classList.add(['thumb']);
  div.classList.add(['faded']); // Start as faded

  // Set background image
  div.style.backgroundImage =
    `url("https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg")`;

  // Add to main
  thumbnailsWrapper.appendChild(div);

  // Get photo details and connect event listener for 'click'-handling.
  flickrPhotosGetInfo(photo.id, photo.secret).then(res => {
    const numTags = document.createElement('p');
    numTags.classList.add(['num-tags']);
    numTags.innerText = `+${res.photo.tags.tag.length} tags`;
    div.appendChild(numTags);
    div.classList.remove(['faded']);
    div.addEventListener('click', e => showDetails(e, photo));
  });
}

// Just a stub for now...
const showDetails = (e, photo) => {
  console.log("Details: " + photo);
}


// No intelligence in buttons for now. Just mock this!
// addTag("blue", "Skydive");
// addTag("blue", "Freefly");
//flickrPhotosSearchByTags(['Skydive', 'Freefly'], 28).then(result => fillContent(result));

// Get random tag
// Flow:
// flickrPhotosGetRecent(1, [1-1000]).then(e => console.log(e));

// flickrPhotosGetRecent(1, 123).then(e => console.log(e));


// Get a random tag by stupidly look for tags on different pictures.
// This algo is extremely stupid and inefficient, but I don't care, because
// it has a nice spinner while waiting! :)
const getRandomTag = async () => {

  thumbnailsWrapper.style.visibility = "hidden";
  thumbnailsWrapper.style.width = "0";
  initWrapper.style.visibility = "visible";
  initWrapper.style.width = "100%";

  const initText = document.querySelector("#init-text");
  initText.innerHTML = "";

  let tag;
  const rq = new RandomQuotes;  // Declare outside loop 
  do {
    const random = Math.ceil(Math.random() * 1000);
    initText.innerHTML = rq.get();
    const result = await flickrPhotosGetRecent(1, random);
    initText.innerHTML = rq.get();
    const picture = await flickrPhotosGetInfo(result.photos.photo[0].id, result.photos.photo[0].secret);
    const tags = picture.photo.tags.tag;
    if (tags.length) {
      const tagArray = [];
      tags.forEach(tag => {
        tagArray.push(tag.raw);
      });
      console.log("Got tags!: " + tagArray);
      tag = tagArray[Math.floor(Math.random() * tagArray.length)];
      addTag(tag, tag);
      initText.innerHTML = "Loading images...";
      flickrPhotosSearchByTags([tag]).then(res => fillContent(res));
    }
  } while (!tag);
}

//getRandomTag();

addTag('enabled');
addTag('disabled', false);

//showSection('details');
