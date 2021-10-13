// Store our tags...
let tagArray = {};

// Reset app (Remove all tags)
const resetTags = () => {
  elements.tags.container.childNodes.forEach(e => {
    elements.tags.container.removeChild(e);
  });
}

const removeTag = tag => {
  // Remove html element
  elements.tags.container.childNodes.forEach(e => {
    if (e.innerText === tag)
      elements.tags.container.removeChild(e);
  });

  // Remove tag from array
  delete tagArray[tag];

  // No tags left? Show start page
  if (!getNumTags) {
    showSection('start')
  }
};

const getNumTags = () => {
  return Object.keys(tagArray).length;
}
/* 
  
  Tag click handler

  When details is visible, switch between enabled/disabled state.
  Else, remove tag.

*/
const clickTag = e => {
  const me = e.target;
  const tag = me.innerText;

  if (document.querySelector('#details').classList.value.split(' ').indexOf('hidden') != -1) {
    removeTag(tag);
  } else {
    console.log("Clicked tag:", tag);
    tagArray[tag] = !tagArray[tag];
    if (me.classList.value.split(' ').indexOf('tag-disabled') == -1) {
      me.classList.add('tag-disabled');
    } else {
      me.classList.remove('tag-disabled');
    }
  }

  elements.search.innerText = "New search!";

};


// Create new tag item and add to list. If this is first tag, add reset.
const addTag = (tag, isEnabled = true) => {

  // Handle null value
  if (!tag) {
    return;
  }

  // Handle illegal values
  // if (!verifyTag(tag)) {
  //  return;
  // }

  // Handle doubles
  if (tagArray[tag]) {
    return;
  }

  tagArray[tag] = isEnabled;

  // Add tag
  const div = document.createElement('div');
  div.classList.add(['tag']);
  div.classList.add(['tag-item']);
  div.innerText = tag;
  div.dataset.tag = tag;

  div.addEventListener('click', clickTag);

  if (!isEnabled) {
    div.classList.add(['tag-disabled']);
  }

  elements.tags.container.appendChild(div);
};

/*
 Remove disabled tags
 */
const removeDisabledTags = () => {
  for (tag in tagArray) {
    if (!tagArray[tag]) {
      removeTag(tag);
    }
  }
}

const tagsGetEnabled = () => {
  let result = [];
  for (tag in tagArray) {
    if (tagArray[tag]) {
      result.push(tag);
    }
  }
  return result;
};

// document.querySelector('#new-search').addEventListener('click', e => {
//   removeDisabledTags();
//   if (!getNumTags()) {
//     showSection( 'start');
//   }
// });