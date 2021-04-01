var input = document.querySelector(".input");
//needed to change class of button to an id because of the 'recent seach' button
var button = document.querySelector("#searchButton");
var input = document.querySelector(".input");
var bioEl = document.querySelector(".bio");
var genreEl = document.querySelector(".genre");
var countryEl = document.querySelector(".country");
var eventAmountEl = document.querySelector(".eventAmount");
var eventUrlEl = document.querySelector(".eventUrl");
var artistLogo = document.querySelector(".logo");
var recentSearchArr = JSON.parse(localStorage.getItem('previousSearches')) || [];

//Eric working on recent search modal loop and function

var recentSearchModal = document.getElementById("search-modal");

var recentButton = document.getElementById("recent-search").addEventListener("click", function(){
    recentSearchModal.setAttribute("class", "modal is-active")
})

var exitSeachModal = document.querySelector(".modal-close").addEventListener("click", function () {
    recentSearchModal.setAttribute("class", "modal hide");
  });

//recentButton.addEventListener("click", function(){
  //recentSearchModal.querySelector("class", "modal is-active");
//};

function generateBtns() {
  var buttonGroup = document.querySelector("#search-modal");
 
  recentSearchArr.reverse().forEeach(function (artist) {
    var artistBtn = document.createElement("<button>");
    artistBtn.textContent = artist;
    artistBtn.addEventListener("click", handleRecentSearchFormSubmit);
    buttonGroup.append(artistBtn);
  });
}

/*function getParams(search) {
  console.log(search);

  if (recentSearchArr.length <= 10) {
    recentSearchArr.push(search);
    localStorage.setItem('previousSearches', JSON.stringify(recentSearchArr));
  }
  getArtistInfo(search);
}*/

function handleRecentSearchFormSubmit(event) {
  event.preventDefault();
  console.log("works");

  var searchInputVal = this.textContent;

  getParams(searchInputVal);
}

//^^^Eric's modal function^^^

function handleSearchFormSubmit(event) {
  event.preventDefault();
  console.log("works");

  var searchInputVal = document.querySelector(".input").value;

  if (!searchInputVal) {
    modal.style.display = "block";
    //window.alert('Please enter an Artist to search for.')
  }

  getParams();
}

function getParams(search) {
  var search = input.value;
  console.log(search);

  if (recentSearchArr.length <= 10) {
    recentSearchArr.push(search);
    localStorage.setItem('previousSearches', JSON.stringify(recentSearchArr));
  }

  getArtistInfo(search);
  getArtistEvent(search);
}

function getArtistInfo(search) {
  var apiArtist = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + search;

  fetch(apiArtist)
    .then(function (response) {
      console.log(response.ok);
      if (!response.ok) {
        window.alert("Unable to connect");
        throw response.json();
      }

      return response.json();
    })
    .then(function (artistResults) {
      printArtistResults(artistResults);
    });
}

function getArtistEvent(search) {
  var apiEvents =
    "https://app.ticketmaster.com/discovery/v2/attractions.json?" +
    "keyword=" +
    search +
    "&apikey=" +
    "5pHWUAmDnwF3nJzxzlERJBtBG2o4Rl4q";

  fetch(apiEvents)
    .then(function (response) {
      console.log(response.ok);
      if (!response.ok) {
        window.alert("Unable to connect");
        throw response.json();
      }

      return response.json();
    })
    .then(function (eventResults) {
      // printEventResults(eventResults);
      var resultArr = eventResults._embedded.attractions;
      console.log(resultArr);
      //this is best bet if you want some sort of filtering happening
      //to pass through to printEventResults fn
      var filteredArr = resultArr.filter(function (index) {
        return index.name.toLowerCase().includes(search.toLowerCase());
      });
      console.log(filteredArr);
    });
}


function printArtistResults(artistResults) {
  console.log(artistResults);

  
  var artistName = document.querySelector(".title");
  artistResults.artists
    ? (artistName.innerText = artistResults.artists[0].strArtist)
    : (artistName.innerText = "No");
  var artistPicture = document.querySelector(".artist-pic");
  artistPicture.src = artistResults.artists[0].strArtistThumb;
  var artistCountry = document.querySelector(".country");
  artistCountry.innerText = artistResults.artists[0].strCountry;
  //inner html for image
}

function printEventResults(eventResults) {
  console.log(eventResults); 
}


button.addEventListener("click", handleSearchFormSubmit); 
