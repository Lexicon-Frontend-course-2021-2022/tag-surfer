const initDebug = () => {
  const buttons = document.querySelectorAll('.debug-button');
  for (button of buttons) {
    button.addEventListener('click', e => {
      content[e.target.dataset.section].show();
    });
  }
}

initDebug();

