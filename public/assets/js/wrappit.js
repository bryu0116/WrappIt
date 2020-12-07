let booksArray = [];
getBooks();
let moviesArray = [];
getMovies();
let musicArray = [];
getArt();
let toysArray = [];
getElectronics();
let artArray = [];
getToys();
let cookingArray = [];


// "Show Books" button listener
$("#books").on("click", function () {
	$("#results-header").text("NYT Best Sellers List");
	$("#results-content").empty();
	for(let i = 0; i < booksArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + booksArray[i].title + "</a>");
		titleDiv.attr("href", booksArray[i].amazon_product_url)
		titleDiv.attr("target", "_blank");
		$("#results-content").append(titleDiv);
		if(booksArray[i].by && booksArray[i].by != "By") {
			let author = $("<div>by " + booksArray[i].by + "</div>");
			$("#results-content").append(author);
		}
		let yearDiv = $("<div>Published: " + newsArray[i].published_date.substring(0,9) + "</div>");
		$("#results-content").append(yearDiv);
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

// Function that accesses the NYTimes API given a string representing their place search, and builds an array of book objects with only the key values we care about
function getBooks() {
    var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux";

     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let results = response.response.docs;
        // Iterate through the results array of objects representing books articles
        for (let i = 0; i < results.length; i++) {
            let bookList = {
                type: results[i].list_name,
                title: results[i].books.title,
                author: results[i].books.author,
                url: results[i].books.amazon_product_url,
                year: results[i].published_date
            };
            booksArray.push(bookList);
        }
        console.log("News:", booksArray);

		// Unhide the "show results" link & show how many results there are
		$("#book-title").
        $("#book-action").removeClass("uk-hidden");
    });
}

// Function that accesses the Open Movie Database API given a string representing their place search, and builds an array of movie objects with only the key values we care about
function getMovies() {
	var queryURL = "https://www.omdbapi.com/?s=" + place + "&apikey=10b7e919";

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

// Function that accesses the Harvard Art Museums API given a string representing their place search, and builds an array of artwork objects with only the key values we care about
function getArt() {
	var queryURL = "https://api.harvardartmuseums.org/exhibition?q=&apikey=ad869fde-b267-4f1d-bf87-6a7b86478a0c";

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



