const app = {};

// fetch API json file

app.apiUrl = 'http://www.mapquestapi.com/search/v4/place';
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
    const userSelection = document.querySelector('select');
    // console.log(userSelection.value);
    app.getTheData(userSelection.value);
  });
}

  // get the value from select
  // run the fetch with that option
  // if ()
  // runs a function that scrolls to results

  // listen for click
  
  // when they click
    // get the value from the select
      // grab option value
    // run the fetch with that option
app.getTheData = (communitySelection) => {
  app.url = new URL('http://proxy.hackeryou.com');
  app.url.search = new URLSearchParams({
    reqUrl: app.apiUrl,
    'params[key]': app.apiKey,
    'params[pageSize]': 10,
    'params[sort]': 'distance',
    // 'params[q]': 'Coffee',
    'params[category]': ['sic:581228'],
    'params[location]': app.communities[communitySelection],
    // sic:581228 = coffee shops
    // sic:581214 = cafes
  });
  fetch(app.url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(`This is the data for ${communitySelection}`);
      console.log(data.results);
      app.displayData(data.results);
    });
}

 // display the results using a loop
    // create an li for each
    // append to the ul in page

app.displayData = (selectedShops) => {
  console.log(selectedShops);

  const shopList = document.querySelector('ul');

  shopList.innerHTML = '';

  selectedShops.forEach(shop => {
    const shopName = shop.name;

    const shopAddress = shop.place.properties.street;

    const shopLink = shop.slug;
    // console.log(shopName, shopAddress);

    const shopListItem = document.createElement('li');

    const itemName = document.createElement('h3');

    itemName.textContent = shopName;
    shopListItem.appendChild(itemName);

    const itemAddress = document.createElement('a');

    itemAddress.textContent = shopAddress;
    itemAddress.setAttribute('href' , `http://www.mapquest.ca${shopLink}`)
    itemAddress.setAttribute('target' , "_blank")

    itemAddress.setAttribute('rel' , "noopener")

    shopListItem.appendChild(itemAddress);  
    
    shopList.appendChild(shopListItem);
  });
}

app.init = () => {
  app.formEvent();
}
app.init();