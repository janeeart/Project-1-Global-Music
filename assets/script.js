var input = document.querySelector(".input");
var button = document.querySelector(".button");
var bioEl = document.querySelector(".bio");
var genreEl = document.querySelector(".genre");
var countryEl = document.querySelector(".country");
var eventAmountEl = document.querySelector(".eventAmount");
var eventUrlEl = document.querySelector(".eventUrl");
var artistLogo = document.querySelector(".logo");

// PORTION OF THE SCRIPT THAT CONTROLS THE MODALS 

var modal = document.getElementById("infoModal");
    
// var showModal = document.getElementById("test").addEventListener("click", function(){
//     modal.setAttribute("class", "modal is-active")
// })
      
var exitModal = document.querySelector(".modal-close").addEventListener("click", function(){
    modal.setAttribute("class", "modal hide")
})

function handleSearchFormSubmit (event) {
	event.preventDefault();
console.log('works');

var searchInputVal = document.querySelector('.input').value;

var noArtistSearched = document.getElementById('noSearchModal');

    if (!searchInputVal) {
        
        // window.alert('Please enter an Artist to search for.')
        noArtistSearched.setAttribute("class", "modal is-active");
    }

    getParams()

    
}

var exitNoArtistModal = document.querySelector(".modal-close").addEventListener("click", function(){
    noSearchModal.setAttribute("class", "modal hide")
})
    



function getParams (search){
    var search = input.value;
    console.log(search);

    getArtistInfo(search);
    getArtistEvent(search);
}


function getArtistInfo(search) {
    var apiArtist = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + (search);

    fetch(apiArtist)
    .then(function (response) {
    console.log(response.ok);
    if (!response.ok) {
        window.alert('Unable to connect');
        throw response.json();
}

return response.json()
})
    .then(function (artistResults){
        printArtistResults(artistResults);
    })

}

function getArtistEvent(search) {
    var apiEvents = "https://app.ticketmaster.com/discovery/v2/attractions.json?" + "keyword=" + (search) + "&apikey=" + "5pHWUAmDnwF3nJzxzlERJBtBG2o4Rl4q";

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

function printArtistResults (artistResults){
    // console.log(artistResults);
    var artistName = document.querySelector('.title');
    artistResults.artists ? artistName.innerText = artistResults.artists[0].strArtist : modal.setAttribute("class", "modal is-active");
    var artistPicture = document.querySelector('.artist-pic');
    artistPicture.src = artistResults.artists[0].strArtistThumb;
    var artistCountry = document.querySelector('.country');
    artistCountry.innerText = artistResults.artists[0].strCountry;
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

    
    
