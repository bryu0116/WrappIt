let booksArray = [];
getBooks();
let moviesArray = [];
getMovies();
let homeArray = [];
getHome();
let cookingArray = [];
getCooking();
let gamesArray = [];
getGames();
let makeupArray = [];
getMakeup();

// "Show Books" button listener
$("#books").on("click", function () {
    $("#results-header1").text("NYT Best Sellers List");
    const resultsDiv = $("#results-content1");
    resultsDiv.empty();
    for(let i = 0; i < booksArray.length; i++) {
        let bookDiv = $("<div class='book'>");
            let imageDiv = $("<div class='bookImg'>");
                let bookImg = $("<img class='book-cover'>");
                bookImg.attr("src", booksArray[i].image_url);
                bookImg.attr("alt", "Cover of " + booksArray[i].title);
                imageDiv.append(bookImg);
            bookDiv.append(imageDiv);
            
            let textDiv = $("<div class='bookInfo'>");
                let titleLink = $("<a class='text-bold'>" + booksArray[i].title + "</a>");
                    titleLink.attr("href", booksArray[i].url)
                    titleLink.attr("target", "_blank");
                textDiv.append(titleLink);
                
                let authorDiv = $("<div class='author'>" + booksArray[i].author + "</div>");
                textDiv.append(authorDiv);
                
                let descDiv = $("<div class='bookDesc'>" + booksArray[i].description + "</div>");
                textDiv.append(descDiv);
            bookDiv.append(textDiv);

        resultsDiv.append(bookDiv);
        resultsDiv.append($("<hr class='uk-divider-large'>"));
    }
    $("#results-div1").removeClass("uk-hidden");
});


// "Show Movies" button listener
$("#movies").on("click", function () {
    $("#results-header2").text("NYT Movie Reviews");
    const resultsDiv = $("#results-content2");
    resultsDiv.empty();
    for(let i = 0; i < moviesArray.length; i++) {
        let movieDiv = $("<div class='movie'>");
            let movieDesc = $("<div class='movie-description'>");
                let imageDiv = $("<div class='movieImg'>");
                    let movieImg = $("<img class='movie-cover'>");
                    movieImg.attr("src", moviesArray[i].image_url);
                    movieImg.attr("alt", "Image of '" + moviesArray[i].title + "'");
                    imageDiv.append(movieImg);
                movieDesc.append(imageDiv);
            
                let textDiv = $("<div class='movieInfo'>");
                    let title = $("<div class='text-bold'>" + moviesArray[i].title + "</div>");
                    textDiv.append(title);
                    let descDiv = $("<div class='movieDesc'>" + moviesArray[i].description + "</div>");
                    textDiv.append(descDiv);               
                movieDesc.append(textDiv);
            movieDiv.append(movieDesc); 
                
            let reviewDiv = $("<div class='movieReview'>");
                let reviewLink = $("<a class='review'>" + moviesArray[i].headline + "</a>");
                reviewLink.attr("href", moviesArray[i].url);
                reviewLink.attr("target", "_blank");
                reviewDiv.append(reviewLink);
                let criticDiv = $("<div class='critic'>" + moviesArray[i].byline + "</div>");
                reviewDiv.append(criticDiv);
            movieDiv.append(reviewDiv); 
        resultsDiv.append(movieDiv);
        resultsDiv.append($("<hr class='uk-divider-large'></hr>"));
    }
    $("#results-div2").removeClass("uk-hidden");
});

// "Show Home Decor" button listener
// Need to fix image
$("#home").on("click", function () {
    $("#results-header3").text("Home Decor");
    const resultsDiv = $("#results-content3");
    resultsDiv.empty();
    for(let i = 0; i < homeArray.length; i++) {
        let homeDiv = $("<div class='home'>");
            let imageDiv = $("<div class='homeImg'>");
                let homeImg = $("<img class='home-cover'>");
                homeImg.attr("src", homeArray[i].StockPhotoURL);
                homeImg.attr("alt", "Image of " + homeArray[i].Title);
                imageDiv.append(homeImg);
            homeDiv.append(imageDiv);
            
            let textDiv = $("<div class='homeInfo'>");
                let titleLink = $("<a class='text-bold'>" + homeArray[i].Title + "</a>");
                    titleLink.attr("href", homeArray[i].DetailsURL)
                    titleLink.attr("target", "_blank");
                textDiv.append(titleLink);
        

        resultsDiv.append(homeDiv);
        resultsDiv.append($("<hr class='uk-divider-large'>"));
    }
    $("#results-div3").removeClass("uk-hidden");
});

// "Show Cookbooks" button listener
// Need to fix image
$("#cooking").on("click", function () {
    $("#results-header4").text("Cookbooks");
    const resultsDiv = $("#results-content4");
    resultsDiv.empty();
    for(let i = 0; i < cookingArray.length; i++) {
        let cookingDiv = $("<div class='home'>");
            let imageDiv = $("<div class='homeImg'>");
                let homeImg = $("<img class='home-cover'>");
                homeImg.attr("src", cookingArray[i].StockPhotoURL);
                homeImg.attr("alt", "Image of " + cookingArray[i].Title);
                imageDiv.append();
            cookingDiv.append(imageDiv);
            
            let textDiv = $("<div class='homeInfo'>");
                let titleLink = $("<a class='text-bold'>" + cookingArray[i].Title + "</a>");
                    titleLink.attr("href", cookingArray[i].DetailsURL)
                    titleLink.attr("target", "_blank");
                textDiv.append(titleLink);
        

        resultsDiv.append(cookingDiv);
        resultsDiv.append($("<hr class='uk-divider-large'>"));
    }
    $("#results-div4").removeClass("uk-hidden");
});

//"Show Makeup" button listener
// need to get image to load
$("#makeup").on("click", function () {
	$("#results-header5").text("Makeup");
    const resultsDiv = $("#results-content5");
    resultsDiv.empty();
    for(let i = 0; i < makeupArray.length; i++) {
        let makeupDiv = $("<div class='makeup'>");
        let imageDiv = $("<div class='makeupImg'>");
            let makeupImg = $("<img class='makeup-cover'>");
            makeupImg.attr("src", makeupArray[i].image);
            makeupImg.attr("alt", "Image of " + makeupArray[i].title);
            imageDiv.append();
        makeupDiv.append(imageDiv);

		let titleDiv = $("<a class='text-bold'>" + makeupArray[i].title + "</a>");
		titleDiv.attr("href", makeupArray[i].url)
		titleDiv.attr("target", "_blank");
		$("#results-content5").append(titleDiv);
	
		resultsDiv.append(titleDiv);
		resultsDiv.append($("<hr class='uk-divider-large'>"));
	}
	$("#results-div5").removeClass("uk-hidden");
});

// "Show Video Games" button listener
// Need to fix image
$("#games").on("click", function () {
    $("#results-header6").text("Video Games & Consoles");
    const resultsDiv = $("#results-content6");
    resultsDiv.empty();
    for(let i = 0; i < gamesArray.length; i++) {
        let gamesDiv = $("<div class='games'>");
            let imageDiv = $("<div class='gamesImg'>");
                let gamesImg = $("<img class='games-cover'>");
                gamesImg.attr("src", gamesArray[i].StockPhotoURL);
                gamesImg.attr("alt", "Image of " + gamesArray[i].Title);
                imageDiv.append();
            gamesDiv.append(imageDiv);
            
            let textDiv = $("<div class='gamesInfo'>");
                let titleLink = $("<a class='text-bold'>" + gamesArray[i].Title + "</a>");
                    titleLink.attr("href", gamesArray[i].DetailsURL)
                    titleLink.attr("target", "_blank");
                textDiv.append(titleLink);
        

        resultsDiv.append(gamesDiv);
        resultsDiv.append($("<hr class='uk-divider-large'>"));
    }
    $("#results-div6").removeClass("uk-hidden");
});


// Function that accesses the NYTimes API given a string representing their place search, and builds an array of book objects with only the key values we care about
function getBooks() {
    var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let results = response.results.books;
        // Iterate through the results array of objects representing books 
        for (let i = 0; i < results.length; i++) {
            let book = {
                image_url: results[i].book_image,
                title: results[i].title,
                author: results[i].contributor,
                description: results[i].description,
                url: results[i].amazon_product_url  
            };
            booksArray.push(book);
        }
        console.log("Books: ", booksArray);
    });
}

// Function that accesses the NYTimes API given a string representing their movie search, and builds an array of movie objects with only the key values we care about
function getMovies() {
	var queryURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=Y& opening-date=2019-01-01;2020-09-01&api-key=xUVU76OUVbXKD94Ig4mUUmlvQJGAyTSQ";

    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
            let results = response.results;
        // Iterate through the result and build a cleaner array of objects representing each movie on the list
        for (let i = 0; i < results.length; i++) {
            let newMovie = {
                title: results[i].display_title,  
                description: results[i].summary_short,
                url: results[i].link.url,
                headline: results[i].headline,
                byline: results[i].byline,
                image_url: results[i].multimedia.src
            };
            moviesArray.push(newMovie);
        };
        console.log("Movies:", moviesArray);
    
    });
}

// Function that accesses the eBay API given a string representing their home decor search, and builds an array of artwork objects with only the key values we care about
function getHome() {
	var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=homedecor&AvailableItemsOnly=true&MaxEntries=10";
    
    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
        let jsonResponse = JSON.parse(response)
         let results = jsonResponse.Product;
        // Iterate through the result and build a cleaner array of objects representing home decor on the list
        for (let i = 0; i < results.length; i++) {
            let newHome = {
                title: results[i].Title,  
                url: results[i].DetailsURL,
                image: results[i].StockPhotoURL
            };
            homeArray.push(newHome);
        };
        console.log("Home Decor:", homeArray);
    
    });
}

// Function that accesses the eBay API given a string representing their cookbook search, and builds an array of objects with only the key values we care about
function getCooking() {
	var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=cookbooks&AvailableItemsOnly=true&MaxEntries=10"
    
    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
        let jsonResponse = JSON.parse(response)
         let results = jsonResponse.Product;
        // Iterate through the result and build a cleaner array of objects representing each cookbook on the list
        for (let i = 0; i < results.length; i++) {
            let newCooking = {
                title: results[i].Title,  
                url: results[i].DetailsURL,
                image: results[i].StockPhotoURL
            };
            cookingArray.push(newCooking);
        };
        console.log("eBay Cookbooks:", cookingArray);
    
    });
}


// Function that accesses the eBay API given a string representing their games search, and builds an array of objects with only the key values we care about
function getGames() {
	var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=games&AvailableItemsOnly=true&MaxEntries=10"
    
    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
        let jsonResponse = JSON.parse(response)
         let results = jsonResponse.Product;
        // Iterate through the result and build a cleaner array of objects representing each video game & console on the list
        for (let i = 0; i < results.length; i++) {
            let newGames = {
                title: results[i].Title,  
                url: results[i].DetailsURL,
                image: results[i].StockPhotoURL
            };
            gamesArray.push(newGames);
        };
        console.log("Video Games:", gamesArray);
    
    });
}
// Function that accesses the eBay API given a string representing their makeup search, and builds an array of objects with only the key values we care about
function getMakeup() {
	var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=makeup&AvailableItemsOnly=true&MaxEntries=10"
    
    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
        let jsonResponse = JSON.parse(response)
         let results = jsonResponse.Product;
        // Iterate through the result and build a cleaner array of objects representing each makeup item on the list
        for (let i = 0; i < results.length; i++) {
            let newMakeup = {
                title: results[i].Title,  
                url: results[i].DetailsURL,
                image: results[i].StockPhotoURL
            };
            makeupArray.push(newMakeup);
        };
        console.log("Makeup:", makeupArray);
    
    });
}





