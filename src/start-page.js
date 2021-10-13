/*
  Startpage interactivity!
 */

elements.start.tags.addEventListener('input', e => {
  if (e.target.value) {
    elements.start.button.innerText = 'Go!';
  } else {
    elements.start.button.innerText = 'Surpise me!';
  }
});

elements.start.button.addEventListener('click', e => {
  e.preventDefault();
  if (elements.start.tags.value) {
    elements.start.tags.value.split(' ').forEach(tag => {
      console.log('Adding tag: ', tag)
      addTag(tag);
    })
  }
});
