const app = {};

app.apiUrl = 'https://www.mapquestapi.com/search/v4/place';
app.apiKey = 'z5ozkhvGgMEVbz9RpjyRNgJXPaL5o5DG';

// center points of communities
app.communities = {
  eastYork: [-79.32997, 43.69797],
  northYork: [-79.44131, 43.75562],
  scarborough: [-79.22995, 43.77633],
  oldToronto: [-79.39501, 43.66465],
  york: [-79.47652, 43.68775],
  etobicoke: [-79.55590, 43.68155]
}

// grab the 'let's go!' button
const form = document.querySelector('form');

// create an event to listen for click
app.formEvent = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get the value from the select
    const userSelection = document.querySelector('select');
    
    // run the fetch with that option
    app.getTheData(userSelection.value);
  });
}

// Requesting data from API using user's data
app.getTheData = (communitySelection) => {
  app.url = new URL('http://proxy.hackeryou.com');
  app.url.search = new URLSearchParams({
    reqUrl: app.apiUrl,
    'params[key]': app.apiKey,
    'params[pageSize]': 50,
    'params[sort]': 'distance',
    'params[category]': ['sic:581228'],
    'params[location]': app.communities[communitySelection],
  });
  fetch(app.url)
    .then(response => {
      return response.json();
    })
    .then(data => { 
      app.displayData(data.results);
    });
}

// display the results using a loop
app.displayData = (selectedShops) => {
  const shopList = document.querySelector('ul');
  shopList.innerHTML = '';
  //Create a for loop to loop through results
  selectedShops.forEach(shop => {
    const shopName = shop.name;
    const shopAddress = shop.place.properties.street;
    const shopLink = shop.slug;

    // create an elements for each
    const shopListItem = document.createElement('li');
    const itemName = document.createElement('h3');
    itemName.textContent = shopName;
    shopListItem.appendChild(itemName);
    const itemAddress = document.createElement('a');
    itemAddress.textContent = shopAddress;
    itemAddress.setAttribute('href' , `http://www.mapquest.ca${shopLink}`);
    itemAddress.setAttribute('target' , '_blank');
    itemAddress.setAttribute('rel' , 'noopener');
    shopListItem.appendChild(itemAddress);  

    // append to the ul in page
    shopList.appendChild(shopListItem);
  });
}

app.init = () => {
  app.formEvent();
}
app.init();