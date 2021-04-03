var input = document.querySelector(".input");
//needed to change class of button to an id because of the 'recent seach' button
var button = document.querySelector("#searchButton");
var bioEl = document.querySelector(".bio");
var genreEl = document.querySelector(".genre");
var countryEl = document.querySelector(".country");
var eventAmountEl = document.querySelector(".eventAmount");
var eventUrlEl = document.querySelector(".eventUrl");
var artistLogo = document.querySelector(".logo");
var recentSearchArr = JSON.parse(localStorage.getItem('previousSearches')) || [];
var backgroundPic = document.getElementById("background-picture")

//Eric working on recent search modal loop and function
var recentSearchModal = document.getElementById("search-modal");
var recentButton = document.getElementById("recent-search").addEventListener("click", function(){
    recentSearchModal.setAttribute("class", "modal is-active")
})

var exitSeachModal = document.querySelector(".modal-close").addEventListener("click", function () {
    recentSearchModal.setAttribute("class", "modal hide");
    });

//Janee no search result modal
var modal = document.getElementById("infoModal");

var exitModal = document.querySelector(".no-search-modal").addEventListener("click", function(){
    modal.setAttribute("class", "modal hide")
})


var exitNoArtistModal = document.querySelector(".modal-close").addEventListener("click", function(){
    noSearchModal.setAttribute("class", "modal hide")
})

    var buttonGroup = document.querySelector(".row");
    for (let i = 0; i < recentSearchArr.length; i++) {
    var artistBtn = recentSearchArr[i];
    var artistButton = document.createElement("button");
    artistButton.textContent = `${artistBtn}`;
    artistButton.addEventListener('click', handleRecentSearchFormSubmit);
    buttonGroup.append(artistButton);
    }

function handleRecentSearchFormSubmit(event) {
    event.preventDefault();
    console.log("works");
    recentSearchModal.setAttribute("class", "modal hide");
    var searchInputVal = this.textContent;
    console.log(searchInputVal);

    getParamsRecentSearches(searchInputVal);
}

//^^^Eric's modal function^^^


function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log('works');

    var searchInputVal = document.querySelector('.input').value;

	var noArtistSearched = document.getElementById('noSearchModal');

    if (!searchInputVal) {
        
        // window.alert('Please enter an Artist to search for.')
        noArtistSearched.setAttribute("class", "modal is-active");
    } 

    if (searchInputVal === "")  {
        return(handleSearchFormSubmit);
        }

    getParams()
}

var exitNoArtistModal = document.querySelector(".no-search-modal-close").addEventListener("click", function(){
    noSearchModal.setAttribute("class", "modal hide")
})

function getParamsRecentSearches(search) {

    if (recentSearchArr.length <= 10) {
    recentSearchArr.push(search);
    localStorage.setItem('previousSearches', JSON.stringify(recentSearchArr));
    }

    getArtistInfo(search);
    getArtistEvent(search);
}


function getParams(search) {
    var search = input.value;
    console.log(search);
    
    
  ////Eric added if statement for localStorage
    if (recentSearchArr.length <= 10) {
    recentSearchArr.push(search);
    localStorage.setItem('previousSearches', JSON.stringify(recentSearchArr));
    }
//Eric added if statement for localStorage ^^^^

    getArtistInfo(search);
    getArtistEvent(search);
}


function getArtistInfo(search) {
    var apiArtist = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + (search);
    backgroundPic.setAttribute("class", "content-hide");

    fetch(apiArtist)
        .then(function (response) {
            console.log(response.ok);
            if (!response.ok) {
                window.alert('Unable to connect');
                throw response.json();
            }

            return response.json()
        })
        .then(function (artistResults) {
            printArtistResults(artistResults);
        })

}

function getArtistEvent(search) {
    var apiEvents = "https://app.ticketmaster.com/discovery/v2/attractions.json?" + "keyword=" + (search) + "&apikey=" + "5pHWUAmDnwF3nJzxzlERJBtBG2o4Rl4q";
    backgroundPic.setAttribute("class", "content-hide");

    fetch(apiEvents)
        .then(function (response) {
            console.log(response.ok);
            if (!response.ok) {
                window.alert('Unable to connect');
                throw response.json();
            }

    return response.json()
})
    .then(function (eventResults){
        var resultArr = eventResults._embedded.attractions
        console.log(resultArr)
        //this is best bet if you want some sort of filtering happening- instead of printing all results, we are selecting the most relevent
        //to pass through to printEventResults fn
        var filteredArr = resultArr.filter(function(index) {
            return index.name.toLowerCase().includes(search.toLowerCase())
        } )
        printEventResults(filteredArr);
        // console.log(filteredArr)
    })


}

function printArtistResults(artistResults) {
    console.log(artistResults);
    var artistName = document.querySelector('.title');
    artistResults.artists ? artistName.innerText = artistResults.artists[0].strArtist : modal.setAttribute("class", "modal is-active");
    var artistPicture = document.querySelector('.artist-pic');
    artistPicture.src = artistResults.artists[0].strArtistThumb;
    var artistCountry = document.querySelector('.country');
    artistCountry.innerText = artistResults.artists[0].strCountry;
    var artistLogo = document.querySelector('.logo');
    artistLogo.src = artistResults.artists[0].strArtistLogo;
    var artistBio = document.querySelector('.bio');
    artistBio.innerText = artistResults.artists[0].strBiographyEN;
    var artistGenre = document.querySelector('.genre');
    artistGenre.innerText = artistResults.artists[0].strGenre;

    //inner html for image
}

function printEventResults (eventResults){
    console.log(eventResults);
    $("#eventList").empty()
    for(i=0; i<eventResults.length; i++){
        //image portion of card
        var newImage = $('<img>').attr("src", eventResults[i].images[0].url)
        var newFigure = $('<figure>').attr("class", "image is-48x48").append(newImage)
        var newMediaL = $('<div>').attr("class", "media-left").append(newFigure)
        //title portion
        var newTitle = $('<p>').attr("class", "title is-4").text(eventResults[i].name)
        var newMediaC = $('<div>').attr("class", "media-content").append(newTitle)
        //appending to main media
        var newMainMedia = $('<div>').attr("class", "media")
        newMainMedia.append(newMediaL)
        newMainMedia.append(newMediaC)
        //creating country
        var newLink = $('<a>').attr('href', eventResults[i].url).text("Follow Me")
        var newP = $('<p>').text(`Tickets available at: `).append(newLink)
        var newContent = $('<div>').attr("class", "content").append(newP)
        //almost there
        var newCardC = $('<div>').attr("class", "card-content")
        newCardC.append(newMainMedia)
        newCardC.append(newContent)
        var newCard = $('<div>').attr("class", "card").append(newCardC)
        $("#eventList").append(newCard)

    }
	}	

button.addEventListener('click', handleSearchFormSubmit);