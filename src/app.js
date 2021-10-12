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
  console.log(content);
  const photos = content.photos.photo;
  let thumb;

  while (thumb = document.querySelector('.thumb')) {
    thumbs.removeChild(thumb);
  }

  for (photo of photos) {
    createThumb(photo)
  }
};

const showDetails = (e, photo) => {
  console.log("Details: " + photo);
}

const createThumb = photo => {

  const div = document.createElement('div');
  div.classList.add(['thumb']);
  div.classList.add(['faded']);

  const img = document.createElement('img');
  const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
  img.src = imgUrl;

  div.style.backgroundImage = `url("${imgUrl})`;
  thumbs.appendChild(div);

  flickrPhotosGetInfo(photo.id, photo.secret).then(res => {
    const numTags = document.createElement('p');
    numTags.classList.add(['num-tags']);
    numTags.innerText = `+${res.photo.tags.tag.length} tags`;
    div.appendChild(numTags);
    div.classList.remove(['faded']);
    div.addEventListener('click', e => showDetails(e, photo));
    console.log(res)
  });
}

const flickrPhotosSearchByTags = async (tags, per_page = 20, page = 1) => {
  return await flickrCallback({
    method: "flickr.photos.search",
    tags: tags.join(','),
    tag_mode: 'all',
    media: 'photos',
    per_page,
    page
  });
};

const flickrPhotosGetInfo = async (photo_id, secret) => {
  return await flickrCallback({
    method: "flickr.photos.getInfo",
    photo_id,
    secret
  });
};

addTag("blue", "Skydive");
addTag("blue", "Freefly");


flickrPhotosSearchByTags(['Skydive', 'Freefly'], 28).then(result => fillContent(result));

//flickrPhotosGetRecent(20).then(result => fillContent(result));