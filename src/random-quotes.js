class RandomQuotes {
  selection = [
    "Spiffyfying spiffs!",
    "Looking under a stone!",
    "Asking the thingamajig for tags...",
    "Tags? TAGS? Where are they?",
    "Floofin' some floof!",
    "Ploop, snoop, Flickr-loop!",
    "All this waiting is making me sick!",
    "Tick! Tock!",
    "Grumpifying gramps!",
    "Poking with a stick!",
    "Gung ho!"
  ];
  last = -1;

  // get new quote. Avoid using same quote twice in a row
  get() {
    let r;
    do {
      r = Math.floor(Math.random() * this.selection.length);
    } while (r === this.last);
    this.last = r;
    return this.selection[r];
  }
}

