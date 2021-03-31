var input = document.querySelector(".input");
var button = document.querySelector(".button");


function handleSearchFormSubmit (event) {
	event.preventDefault();
console.log('works');

var searchInputVal = document.querySelector('.input').value;

    if (!searchInputVal) {
        window.alert('Please enter an Artist to search for.')
    }

    getParams()
}

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
        printEventResults(eventResults);
        var resultArr = eventResults._embedded.attractions
        console.log(resultArr)
        //this is best bet if you want some sort of filtering happening
        //to pass through to printEventResults fn
        var filteredArr = resultArr.filter(function(index) {
          return index.name.toLowerCase().includes(search.toLowerCase())
        } )
        console.log(filteredArr)
    })

}

function printArtistResults (artistResults){
    console.log(artistResults);
    var artistName = document.querySelector('.title');
    artistResults.artists ? artistName.innerText = artistResults.artists[0].strArtist : artistName.innerText = "No";
    var artistPicture = document.querySelector('.artist-pic');
    artistResults.artists ? artistPicture.src = artistResults.artists[0].strArtistThumb : artistPicture.src = "Nothing found";
//inner html for image
}

function printEventResults (eventResults){
    console.log(eventResults);
	}	

	button.addEventListener('click', handleSearchFormSubmit);

    
    
//     var artistModal = document.querySelector('.modal')
//     function artistModal () {
     
// artistResults.artists ? artistName.innerText = artistResults.artists[0].strArtist : document.querySelector('.modal', 'is-active');
//     }

    //function eventModal