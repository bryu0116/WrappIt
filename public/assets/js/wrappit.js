let booksArray = [];
getBooks();
let moviesArray = [];
getMovies();
let homeArray = [];
getHome();

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

// // "Show Home Decor" button listener
// $("#home").on("click", function () {
//     $("#results-header3").text("Home Decor");
//     const resultsDiv = $("#results-content3");
//     resultsDiv.empty();
//     for(let i = 0; i < homeArray.length; i++) {
//         let homeDiv = $("<div class='home'>");
//             let homeDesc = $("<div class='movie-description'>");
//                 let imageDiv = $("<div class='homeImg'>");
//                     let homeImg = $("<img class='home-cover'>");
//                     homeImg.attr("src", homeArray[i].image_url);
//                     homeImg.attr("alt", "Image of '" + homeArray[i].title + "'");
//                     homeImg.append(homeImg);
//                 homeDesc.append(imageDiv);
            
//                 let textDiv = $("<div class='homeInfo'>");
//                     let title = $("<div class='text-bold'>" + homeArray[i].Title + "</div>");
//                     textDiv.append(Title);
//                     let descDiv = $("<div class='homeDesc'>" + homeArray[i].description + "</div>");
//                     textDiv.append(descDiv);               
//                 homeDesc.append(textDiv);
//             homeDiv.append(homeDesc); 
                
//             let reviewDiv = $("<div class='movieReview'>");
//                 let reviewLink = $("<a class='review'>" + moviesArray[i].headline + "</a>");
//                 reviewLink.attr("href", moviesArray[i].url);
//                 reviewLink.attr("target", "_blank");
//                 reviewDiv.append(reviewLink);
//                 let criticDiv = $("<div class='critic'>" + moviesArray[i].byline + "</div>");
//                 reviewDiv.append(criticDiv);
//             homeDiv.append(reviewDiv); 
//         resultsDiv.append(homeDiv);
//         resultsDiv.append($("<hr class='uk-divider-large'></hr>"));
//     }
//     $("#results-div2").removeClass("uk-hidden");
// });


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

// Function that accesses the NYTimes API given a string representing their place search, and builds an array of movie objects with only the key values we care about
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

// Function that accesses the eBay API given a string representing their place search, and builds an array of artwork objects with only the key values we care about
function getHome() {
	var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=homedecor&AvailableItemsOnly=true&MaxEntries=5";
    
    $.ajax({
		url: queryURL,
		method: "GET"
    }).then(function(response) {
            let results = response.Product;
        // Iterate through the result and build a cleaner array of objects representing each movie on the list
        for (let i = 0; i < results.length; i++) {
            let newHome = {
                title: results[i].Title,  
                url: results[i].DetailsURL,
            };
            homeArray.push(newHome);
        };
        console.log("Home Decor:", homeArray);
    
    });
}



