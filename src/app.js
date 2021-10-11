
// Just some testing for now

// Get recent photos, 50 per page, first page
flickrPhotosGetRecent(50).then(result => console.log(result));

// Get recent photos, 12 per page, 10:th page
flickrPhotosGetRecent(12, 10).then(result => console.log(result));
