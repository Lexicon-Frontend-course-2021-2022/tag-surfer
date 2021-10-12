const tags = document.querySelector("#tags");
const thumbs = document.querySelector("main");

// Reset app (Remove all tags)
const resetTags = () => {
  let tag;
  while (tag = document.querySelector('.tag')) {
    tags.removeChild(tag);
  }
}

// Remove one tag. If last tag, also remove reset
const removeTag = e => {
  const me = e.target;
  tags.removeChild(me);
  if (tags.children.length == 1) {
    tags.removeChild(document.querySelector("#reset"));
  }
};


// Create new tag item and add to list. If this is first tag, add reset.
const addTag = (text, value) => {

  // Add "Reset" before first tag
  if (!tags.children.length) {
    const reset = document.createElement('div');
    reset.classList.add(['tag']);
    reset.classList.add(['reset']);
    reset.id = 'reset';
    reset.innerText = "Reset";
    reset.addEventListener('click', resetTags);
    tags.appendChild(reset);
  }

  // Add tag
  const div = document.createElement('div');
  div.classList.add(['tag']);
  div.classList.add(['tag-item']);
  div.innerText = value;
  div.dataset.tag = value;
  div.addEventListener('click', removeTag);
  tags.appendChild(div);
};



// (Re-)populate main area with thumbs
const fillContent = content => {
  const photos = content.photos.photo;
  let thumb;

  while (thumb = document.querySelector('.thumb')) {
    thumbs.removeChild(thumb);
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
  thumbs.appendChild(div);

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
//addTag("blue", "Skydive");
//addTag("blue", "Freefly");
//flickrPhotosSearchByTags(['Skydive', 'Freefly'], 28).then(result => fillContent(result));

// Get random tag
// Flow:
// flickrPhotosGetRecent(1, [1-1000]).then(e => console.log(e));

// flickrPhotosGetRecent(1, 123).then(e => console.log(e));


const getRandomTag = async () => {
  let tag;
  const rq = new RandomQuotes;  // Declare outside loop
  do {
    const random = Math.ceil(Math.random() * 1000);
    console.log(rq.get());
    const result = await flickrPhotosGetRecent(1, random);
    console.log(rq.get());
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
      console.log(rq.get());
      flickrPhotosSearchByTags([tag]).then(res => fillContent(res));
    }
  } while (!tag);
}

getRandomTag();