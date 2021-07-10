// read the API docs and get key if needed
// create a namespaced object
const app = {};

app.apiUrl = 'http://open.mapquestapi.com/nominatim/v1/search.php';
app.apiKey = 'z5ozkhvGgMEVbz9RpjyRNgJXPaL5o5DG';
​
// http://open.mapquestapi.com/nominatim/v1/search.php
​
app.init = function () {
  app.getLocations();
}
​
// make an API call  with fetch()
  // construct new URL to add to search parameters
app.getLocations = function () {
​
  const url = new URL(app.apiUrl);
​
  url.search = new URLSearchParams({
    key: app.apiKey,
    format: 'json',
    q: 'toronto[pub]'
  });
​
  fetch(url)
  .then(function (results) {
    return results.json();
  })
  .then( function (data) {
    console.log(data);
    // app.displayLocations(data);
  });
}
​
// display locations we get to the page
app.displayLocations = function (locationList) {
  locationList.forEach(function (location) {
    console.log(location.display_name);
  });
}
​
app.init();