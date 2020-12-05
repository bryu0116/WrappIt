// Assignment Code
let nextBtn = document.querySelector("#next");

// Add event listener to generate button
nextBtn.addEventListener("click", startQuestions);

// Various Arrays 
let number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specialChar = ["!", "%", "&", ",", "*", "+", "-", ".", "/", "<", ">", "?","~"];
let alphaLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let alphaUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Variables 
var confirmPasswordLength = "";
var confirmSpecialCharacter;
var confirmNumericCharacter;
var confirmUpperCase;
var confirmLowerCase;

// Prompt to confirm how many characters the user would like in their password
function generatePassword() {
  var confirmPasswordLength = (prompt("How many characters would you like your password to contain?"));
  
  // Loop if answer is outside the criteria 
  while(confirmPasswordLength < 8 || confirmPasswordLength > 128) {
      alert("Your password must contain at least 8 to 128 characters. Please try again.");
      var confirmPasswordLength = (prompt("How many characters would you like your password to contain?"));
      } 

      // Repeat back how many charactes the user will have  
      alert(`Your password will have ${confirmPasswordLength} characters.`);

    // Determine criteria of password 
    var confirmSpecialCharacter = confirm("Click OK to confirm including special characters.");
    var confirmNumericCharacter = confirm("Click OK to confirm including numeric characters.");    
    var confirmLowerCase = confirm("Click OK to confirm including lowercase characters.");
    var confirmUpperCase = confirm("Click OK to confirm including uppercase characters.");

      // Loop if answer is outside the critera 
      while(confirmUpperCase === false && confirmLowerCase === false && confirmSpecialCharacter === false && confirmNumericCharacter === false) {

        alert("You must choose at least one criteria");

        var confirmSpecialCharacter = confirm("Click OK to confirm including special characters.");
        var confirmNumericCharacter = confirm("Click OK to confirm including numeric characters.");    
        var confirmLowerCase = confirm("Click OK to confirm including lowercase characters.");
        var confirmUpperCase = confirm("Click OK to confirm including uppercase characters.");   
    } 

    var passwordCharacters = []
    // Password if statements
    if (confirmSpecialCharacter) {
      passwordCharacters = passwordCharacters.concat(specialChar)
    }

    if (confirmNumericCharacter) {
      passwordCharacters = passwordCharacters.concat(number)
    }
      
    if (confirmLowerCase) {
      passwordCharacters = passwordCharacters.concat(alphaLower)
    }

    if (confirmUpperCase) {
      passwordCharacters = passwordCharacters.concat(alphaUpper)
    }

      console.log(passwordCharacters)

      // Empty string to be filled based on for loop selecting random characters from the array
      var randomPassword = ""
      
      for (var i = 0; i < confirmPasswordLength; i++) {
        randomPassword = randomPassword + passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
        console.log(randomPassword)
      }
      return randomPassword;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}





// Get place from localStorage - if nothing's there, use Philadelphia
let place = localStorage.getItem('place');
if (!place) { place = "Philadelphia"; }

let booksArray = [];
getBooks(place);
let moviesArray = [];
getMovies(place);
let newsArray = [];
getNews(place);
let artArray = [];
getArt(place);

$("#header").text("Welcome to " + place);
console.log(place);

// Search by city button
$('#searchBtn').on('click', function () {
    let newPlace = $('#searchBar').val();
    // Check to make sure their input is valid
    if(checkInput(newPlace)) {
		// Store the new place
		localStorage.setItem('place', newPlace);
		console.log(newPlace);
		// Reset all the arrays
		booksArray = [];
		moviesArray = [];
		newsArray = [];
		artArray = [];
		// Render the new page
		$("#header").text("Welcome to " + newPlace);
		$("#results-div").addClass("hide");
        getBooks(newPlace);
		getMovies(newPlace);
		getNews(newPlace);
		getArt(newPlace);
    }
});

// Send me somewhere random button
$('#randomBtn').on('click', function () {
    let index = Math.floor(Math.random() * places.length);
    let newPlace = places[index];
	// Store the new place
	localStorage.setItem('place', newPlace);
	console.log(newPlace);
	// Reset all the arrays
	booksArray = [];
	moviesArray = [];
	newsArray = [];
	artArray = [];
	// Render the new page
	$("#header").text("Welcome to " + newPlace);
	$("#results-div").addClass("hide");
	getBooks(newPlace);
	getMovies(newPlace);
	getNews(newPlace);
	getArt(newPlace);
});

// Use my location button
$('#locationBtn').on('click', function () {
	let mapsAPI = 'AIzaSyDP6Zh-LaIStr2ODLz_C9yj--XdyC4CZ28';

	$.ajax({
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + mapsAPI,
        method: "POST"
      }).then (function(response) {
        let lat = JSON.stringify(response.location.lat);
		let lng = JSON.stringify(response.location.lng);
        //API call to use lat & long to retrieve place name
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng +'&key=' + mapsAPI,
			method: "POST"
		}).then (function(results) {
			console.log(results);
			// Get the city name from the exact location results
			let here = JSON.stringify(results.results[0].address_components[3].long_name);
			// Remove the quotation marks from around the city name
			here = here.substr(1, (here.length - 2));

			// Store the new place
			localStorage.setItem('place', here);
			console.log(here);
			// Reset all the arrays
			booksArray = [];
			moviesArray = [];
			newsArray = [];
			artArray = [];
			// Render the new page
			$("#header").text("Welcome to " + here);
			$("#results-div").addClass("hide");
			getBooks(here);
			getMovies(here);
			getNews(here);
			getArt(here);
		});
	});
});

function checkInput(userInput) {
    // We're going to accept all user inputs for now until we figure out how to check this
	if (userInput != "") { 
		return true; 
	} else {
		return false
	}
}

// "Show Books" button listener
$("#show-books").on("click", function () {
	$("#results-header").text("Book Recommendations");
	$("#results-content").empty();
	for(let i = 0; i < booksArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + booksArray[i].title + "</a>");
		titleDiv.attr("href", booksArray[i].url);
		titleDiv.attr("target", "_blank");
		$("#results-content").append(titleDiv);
		let byDiv = $("<div>by " + booksArray[i].by + "</div>");
		$("#results-content").append(byDiv);
        if (booksArray[i].year) {
            let yearDiv = $("<div>Published: " + booksArray[i].year + "</div>");
            $("#results-content").append(yearDiv);
        }
		if (booksArray[i].image != "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png") {
			let bookImage = $("<img src ='" + booksArray[i].image + "' alt='book image'>")
			$("#results-content").append(bookImage);
		}
		$("#results-content").append($("<div class='divider'></div>"));
	}
	$("#results-div").removeClass("hide");
});

// "Show Movies" button listener
$("#show-movies").on("click", function () {
    $("#results-header").text("Movie Recommendations");
    $("#results-content").empty();
    for(let i = 0; i < moviesArray.length; i++) {
        let titleDiv = $("<a class='text-bold'>" + moviesArray[i].title + "(" + moviesArray[i].year + ")" + "</a>");
		titleDiv.attr("href", moviesArray[i].url);
		titleDiv.attr("target", "_blank");
        $("#results-content").append(titleDiv);
        $("#results-content").append($("<br>"));
        let posterImage = $("<img src ='" + moviesArray[i].image + "' alt='movie poster'>")
		$("#results-content").append(posterImage);
		$("#results-content").append($("<div class='divider'></div>"));
    }
    $("#results-div").removeClass("hide");
});

// "Show News" button listener
$("#show-news").on("click", function () {
	$("#results-header").text("News Articles");
	$("#results-content").empty();
	for(let i = 0; i < newsArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + newsArray[i].title + "</a>");
		titleDiv.attr("href", newsArray[i].url)
		titleDiv.attr("target", "_blank");
		$("#results-content").append(titleDiv);
		if(newsArray[i].by && newsArray[i].by != "By") {
			let byDiv = $("<div>by " + newsArray[i].by + "</div>");
			$("#results-content").append(byDiv);
		}
		let yearDiv = $("<div>Published: " + newsArray[i].year.substring(0,9) + "</div>");
		$("#results-content").append(yearDiv);
		$("#results-content").append($("<div class='divider'></div>"));
	}
	$("#results-div").removeClass("hide");
});

// "Show Art" button listener
$("#show-art").on("click", function () {
	$("#results-header").text("Art Exhibitions");
	$("#results-content").empty();
	for(let i = 0; i < artArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + artArray[i].title + "</a>");
		titleDiv.attr("href", artArray[i].url);
		titleDiv.attr("target", "_blank");
		$("#results-content").append(titleDiv);
		let nameDiv = $("<div>Venue: " + artArray[i].venues + "</div>");
		$("#results-content").append(nameDiv);
		$("#results-content").append($("<div class='divider'></div>"));
	}
	$("#results-div").removeClass("hide");
});

// Function that accesses the GoodReads API given a string representing their place search, and builds an array of book objects with only the key values we care about
function getBooks(place) {
    let queryURL = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search.xml?key=Ftrxz5uVKXShxfHT69uvg&q=genre%20" + genre;

    $.ajax({
		url: queryURL,
		dataType: "text",
        method: "GET"
    }).then(function(xml) {
      
        const XmlNode = new DOMParser().parseFromString(xml, 'text/xml');
        const results = xmlToJson(XmlNode).GoodreadsResponse.search.results.work;
		// Iterate through the messy array and build a cleaner array of objects representing each book on the list
        for (let i = 0; i < results.length; i++) {
            let newBook = {
                title: results[i].best_book.title["#text"],  
                by: results[i].best_book.author.name["#text"], 
                image: results[i].best_book.image_url["#text"], 
				year: results[i].original_publication_year["#text"], 
				url: "https://www.goodreads.com/book/show/" + results[i].best_book.id["#text"]
			};

            booksArray.push(newBook);
        }
        console.log("Books:", booksArray);

		// Add a few reccomendations from books to the books card content
		let limit = 5;
		if (booksArray.length < 5) { limit = booksArray.length; }
		$("#book-preview").empty();
		for (let i = 0; i < limit; i++) {
            let newDiv = $("<div>- " + booksArray[i].title + "</div>");
            $("#book-preview").append(newDiv);
		}
		// Unhide the "show results" link & show how many results there are
		$("#books-title").text(place + " in Books (" + booksArray.length + ")");
        $("#book-action").removeClass("hide");
    });
}

// Function that accesses the Open Movie Database API given a string representing their place search, and builds an array of movie objects with only the key values we care about
function getMovies(genre) {
	var queryURL = "https://www.omdbapi.com/?s=" + genre + "&apikey=54717e73";

    $.ajax({
		url: queryURL,
		method: "GET"
  }).then(function(response) {

        let results = response.Search;
        // Iterate through the result and build a cleaner array of objects representing each book on the list
        for (let i = 0; i < results.length; i++) {
            let newMovie = {
                title: results[i].Title,  
                image: results[i].Poster, 
				year: results[i].Year,
				url: "https://www.imdb.com/title/" + results[i].imdbID
            };
            moviesArray.push(newMovie);
        }
        console.log("Movies:", moviesArray);
    
        // Add a few reccomendations from moviesArray to the movies card content
		let limit = 5;
		if (moviesArray.length < 5) { limit = moviesArray.length; }
		$("#movie-preview").empty();
		for (let i = 0; i < limit; i++) {
            let newDiv = $("<div>- " + moviesArray[i].title + "</div>");
            $("#movie-preview").append(newDiv);
        }       
		// Unhide the "show results" link & show how many results there are
		$("#movies-title").text(place + " at the Movies (" + moviesArray.length + ")");
        $("#movie-action").removeClass("hide");
    });
}

// Function that accesses the NYTimes API given a string representing their place search, and builds an array of article objects with only the key values we care about
function getNews(place) {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=articles&fq=glocations:" + place + "&api-key=g3KFAz8SGDwQs4rxRmIrPbDPuhJbsmtG";

     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let results = response.response.docs;

        // Iterate through the results array of objects representing news articles
        for (let i = 0; i < results.length; i++) {
            let newArticles = {
                title: results[i].headline.main,
                url: results[i].web_url,
                by: results[i].byline.original,
                year: results[i].pub_date
            };
            newsArray.push(newArticles);
        }
        console.log("News:", newsArray);

        // Add a few reccomendations from newsArray to the news card content
		let limit = 5;
		if (newsArray.length < 5) { limit = newsArray.length; }
		$("#news-preview").empty();
		for (let i = 0; i < limit; i++) {
            let newDiv = $("<div>- " + newsArray[i].title + "</div>");
            $("#news-preview").append(newDiv);
        }
		// Unhide the "show results" link & show how many results there are
		$("#news-title").text(place + " in the News (" + newsArray.length + ")");
        $("#news-action").removeClass("hide");
    });
}
// Function that accesses the Harvard Art Museums API given a string representing their place search, and builds an array of artwork objects with only the key values we care about
function getArt(place) {
	var queryURL = "https://api.harvardartmuseums.org/exhibition?q=" + place + "&apikey=ad869fde-b267-4f1d-bf87-6a7b86478a0c";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		let results = response.records;
		// Iterate through the results array of objects representing art
		for (let i = 0; i < results.length; i++) {
  // First, build a string of the venues in the results[i].venues array (venueList)
  let venueList = results[i].venues[0].name;
  if (results[i].venues.length > 1) {
	  for (let j = 0; j < results[i].venues.length; j++) {
		  venueList += ", " + results[i].venues[j].name;
	  }
  }
         // Then build the newArt object and push to artArray
		 let newArt = {
            title: results[i].title,
            url: results[i].url,
            venues: venueList};
            artArray.push(newArt);
        }
    
        console.log("Art:", artArray);

        // Add a few reccomendations from articles to the news card content
		let limit = 5;
		if (artArray.length < 5) { limit = artArray.length; }
		$("#art-preview").empty();
		for (let i = 0; i < limit; i++) {
            let newDiv = $("<div>- " + artArray[i].title + "</div>");
            $("#art-preview").append(newDiv);
        }
		// Unhide the "show results" link & show how many results there are
		$("#art-title").text(place + " in Art (" + artArray.length + ")");
        $("#art-action").removeClass("hide");
    });
}

// Changes XML to JSON
// Code sourced from https://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};