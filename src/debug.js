const getContentSections = () => {
  return document.querySelectorAll('.content');
}

const initDebug = () => {
  const buttons = document.querySelectorAll('.debug-button');
  for (button of buttons) {
    button.addEventListener('click', clickSetSection)
  }
}


const clickSetSection = e => {
  showSection(e.target.dataset.section);
}

const showSection = section => {
  const sections = document.querySelectorAll('.content');

  for (const s of sections) {
    const hidden = s.classList.value.split(' ').indexOf('hidden');
    if (s.id == section && hidden) {
      s.classList.remove('hidden');
    }
    if (s.id != section) {
      s.classList.add('hidden');

    }
  }
};

initDebug();


// .then((data) => {
//   let idx = arr.indexOf(sizeSuffix);
//   if ((idx === 3 && data.sizes.size[idx].width !== 240) ||
//     (idx === 2 && data.sizes.size[idx].width !== 100) ||
//     (idx === 4 && data.sizes.size[idx].width !== 320) ||
//     (idx === 5 && data.sizes.size[idx].width !== 400)) {
//     ;
//   }
//   else {
//     let apiPhoto = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeSuffix}.jpg`;
//     fetch(apiPhoto).then((response) => {
//       const songItem = document.createElement("li");
//       songItem.innerHTML = `<img src=${response.url} />`;
//       lista.appendChild(songItem);
//     });
//   }
// });