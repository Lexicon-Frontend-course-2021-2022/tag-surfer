const tags = document.querySelector("#tags");

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


addTag("blue", "Blue");
addTag("yellow", "Yellow");
addTag("green", "Green");
addTag("white", "White");
addTag("black", "Black");
