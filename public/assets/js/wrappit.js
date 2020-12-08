$(document).ready(function() {
    
    let booksArray = [];
    getBooks();
    let moviesArray = [];
    getMovies();
    let artArray = [];
    getArt();
    
// Event listeners
    $(document).on("click", "input#books", showBooks);
    $(document).on("click", "input#movies", showMovies);
    $(document).on("click", "input#art", showArt);

    $(document).on("click", "button#saveBooks", saveBooks);
    // $(document).on("click", "button#saveMovies", saveMovies);
    // $(document).on("click", "button#saveArt", saveArt);

// AJAX calls to third-party APIs
    // Books - NYTimes API
    function getBooks() {
        var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            let results = response.results.books;
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

    function showBooks() {
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

        let saveBtn = $("<button id='saveBooks'>");
        saveBtn.attr("type", "submit");
        saveBtn.text("Save results");
        resultsDiv.append(saveBtn);
    }

    // Movies (reviews) - NYTimes API
    function getMovies() {
        var queryURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=Y& opening-date=2019-01-01;2020-09-01&api-key=xUVU76OUVbXKD94Ig4mUUmlvQJGAyTSQ";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                let results = response.results;
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
            }
            console.log("Movies:", moviesArray);
        });
    }

    function showMovies() {
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
    }   

    // Art - Harvard Art Museums API
    function getArt() {
        var queryURL = "https://api.harvardartmuseums.org/publication?q=publicationyear=2020&size=50&apikey=ad869fde-b267-4f1d-bf87-6a7b86478a0c";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let results = response.records;
            for (let i = 0; i < results.length; i++) {
                let newArt = {
                    title: results[i].title,   
                    url: results[i].publicationplace, 
                };
                artArray.push(newArt);
            }
            console.log("Art:", artArray);
        });
    }
    
    function showArt() {
            $("#results-header3").text("Harvard Art Museum Publications");
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
    }

// CRUD 
    
    // CREATE DB record - POST method 
    function saveBooks(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/wrappit",
            method: "POST"
        }).then(function(response) {
            console.log(response);
        });
    }

    // // READ DB - GET method
    // function getBooksDB() {

    // }

    // // UPDATE DB - PUT method
    // function updateBooks() {

    // }

    // // DELETE DB record - DELETE method
    // function deleteBooks() {

    // }

    
});