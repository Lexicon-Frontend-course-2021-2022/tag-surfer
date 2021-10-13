elements.search.addEventListener('click', () => {
  const enabledTags = tagsGetEnabled();

  elements.search.innerText = "";

  // Nothing to search for, only disabled tags left
  if (!enabledTags.length) {
    showSection('start', () => {
      removeDisabledTags();
      elements.start.tags.value = '';
    });
    return;
  }

});