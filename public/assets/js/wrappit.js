let booksArray = [];
getBooks();
let moviesArray = [];
getMovies();
let artArray = [];
getArt();


// "Show Books" button listener
$("#books").on("click", function () {
	$("#results-header1").text("NYT Best Sellers List");
	$("#results-content1").empty();
	for(let i = 0; i < booksArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + booksArray[i].books[0].title + "</a>");
		titleDiv.attr("href", booksArray[i].amazon_product_url)
		titleDiv.attr("target", "_blank");
		$("#results-content1").append(titleDiv);
		if(booksArray[i].by && booksArray[i].by != "By") {
			let author = $("<div>by " + booksArray[i].by + "</div>");
			$("#results-content1").append(author);
		}
		let yearDiv = $("<div>Published: " + newsArray[i].published_date.substring(0,9) + "</div>");
		$("#results-content1").append(yearDiv);
		$("#results-content1").append($("<hr class='uk-divider-large'></hr>"));
	}
	$("#results-div1").removeClass("uk-hidden");
});


// "Show Movies" button listener
$("#movies").on("click", function () {
    $("#results-header2").text("NYT 2020 Movie Reviews");
    $("#results-content2").empty();
    for(let i = 0; i < moviesArray.length; i++) {
        let titleDiv = $("<a class='text-bold'>" + moviesArray[i].display_title + "(" + moviesArray[i].publication_date + ")" + "</a>");
		titleDiv.attr("href", moviesArray[i].url);
		titleDiv.attr("target", "_blank");
        $("#results-content2").append(titleDiv);
        $("#results-content2").append($("<br>"));
        let nameDiv = $("<div> Movie Title: " + moviesArray[i].display_title+ "</div>")
		$("#results-content2").append(nameDiv);
        $("#results-content2").append($("<hr class='uk-divider-large'></hr>"));
    }
    $("#results-div2").removeClass("uk-hidden");
});

// "Show Art" button listener
$("#art").on("click", function () {
	$("#results-header3").text("2020 Harvard Art Museum Publications");
	$("#results-content3").empty();
	for(let i = 0; i < artArray.length; i++) {
		let titleDiv = $("<a class='text-bold'>" + artArray[i].title + "</a>");
		titleDiv.attr("href", artArray[i].url);
		titleDiv.attr("target", "_blank");
		$("#results-content3").append(titleDiv);
		let nameDiv = $("<div>Title: " + artArray[i].title + "</div>");
		$("#results-content3").append(nameDiv);
		$("#results-content3").append($("<hr class='uk-divider-large'></hr>"));
	}
	$("#results-div3").removeClass("uk-hidden");
});



// Function that accesses the NYTimes API given a string representing their place search, and builds an array of book objects with only the key values we care about
function getBooks() {
    var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux";

     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let results = response.results.books[0];
        // Iterate through the results array of objects representing books 
        for (let i = 0; i < results.length; i++) {
            let bookList = {
                title: results[i].title,
                author: results[i].author,
                url: results[i].amazon_product_url,
                year: results[i].published_date,
            };
            booksArray.push("Books:", bookList);
        }
        console.log("Books:", booksArray);

    });
}

// Function that accesses the Open Movie Database API given a string representing their place search, and builds an array of movie objects with only the key values we care about
function getMovies() {
	var queryURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=big&api-key=xUVU76OUVbXKD94Ig4mUUmlvQJGAyTSQ";

    $.ajax({
		url: queryURL,
		method: "GET"
  }).then(function(response) {

        let results = response.results;
        // Iterate through the result and build a cleaner array of objects representing each book on the list
        for (let i = 0; i < results.length; i++) {
            let newMovie = {
                title: results[i].display_title,  
                url: results[i].link.url,
                byline: results[i].byline,
            };
            moviesArray.push("Movies", newMovie);
        }
        console.log("Movies:", moviesArray);
    
    });
}

// Function that accesses the Harvard Art Museums API given a string representing their place search, and builds an array of artwork objects with only the key values we care about
function getArt() {
	var queryURL = "https://api.harvardartmuseums.org/publication?q=publicationyear=2020&apikey=ad869fde-b267-4f1d-bf87-6a7b86478a0c";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {

		let results = response.records;
		// Iterate through the results array of objects representing art
		for (let i = 0; i < results.length; i++) {
		 let newArt = {
            title: results[i].title,   
            url: results[i].publicationplace, 
        };
        artArray.push("Art:", newArt);
    }
    console.log("Art:", artArray);

    });
}


