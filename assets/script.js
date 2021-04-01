var input = document.querySelector(".input");
//needed to change class of button to an id because of the 'recent seach' button
var button = document.querySelector("#searchButton");

//Eric working on recent search modal loop and function
    for (var i = 0; i < localStorage.length; i++) {
        var recentSearchArr = JSON.parse(localStorage.getItem(i)) ;
        var artistName = $(".list-group").addClass("list-group-item");
        artistName.append("<li>" + recentSearchArr + "</li>");
      }
    
var recentButton = document.getElementById("recent-search");
var modal = document.getElementById("recent-search");

recentButton.onclick = function() {
    modal.style.display = 'block';
}

function recentSearch(event) {
    event.preventDefault();

    var btnGroup = document.querySelector('#search-modal');
    recentSearchArr.reverse().


    
    forEach(function(search){
        var artistBtn = document.createElement('<a>');
        artistBtn.document.addclass('button')
        artistBtn.textContent = search;
        artistBtn.classList.add('btn');
        btnGroup.append(artistBtn);
    })
}

function getParams(query){
    console.log(query)

    if (recentSearchArr.length <=4) {
        recentSearchArr.push(query);
        localStorage.setItem(i, JSONstringify(searchHistoryArr));
    }
    getArtistInfo(query)
}
//^^^Eric's modal function^^^


function handleSearchFormSubmit (event) {
	event.preventDefault();
console.log('works');

var searchInputVal = document.querySelector('.input').value;

    if (!searchInputVal) {
        modal.style.display = 'block';
        //window.alert('Please enter an Artist to search for.')
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
        // printEventResults(eventResults);
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
    artistPicture.src = artistResults.artists[0].strArtistThumb;
//inner html for image
}

function printEventResults (eventResults){
    console.log(eventResults);
	}	


	button.addEventListener('click', handleSearchFormSubmit);

