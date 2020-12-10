$(document).ready(function() {
    // Making the API calls upon loading and populating the arrays
    let booksArray = [];
    getBooks();
    let moviesArray = [];
    getMovies();
    let homeArray = [];
    getHome();
    let cookingArray = [];
    getCooking();
    let makeupArray = [];
    getMakeup();
    let gamesArray = [];
    getGames();

    let userInfo, UserId;
    let allUsers = [];
    let searchBooks = false;
    let searchMovies = false;
    let searchHome = false;
    let searchCooking = false;
    let searchMakeup = false;
    let searchGames = false;


// Event listeners
    // "Next" button listener (new user account modal)
    $(document).on("click", "#login", saveUser);
    // Checkbox listeners
    $(document).on("click", "#books", function() { searchBooks = true; });
    $(document).on("click", "#movies", function() { searchMovies = true; });
    $(document).on("click", "#home", function() { searchHome = true; });
    $(document).on("click", "#cooking", function() { searchCooking = true; });
    $(document).on("click", "#makeup", function() { searchMakeup = true; });
    $(document).on("click", "#games", function() { searchGames = true; });
    // "View Results" button listener (API calls, getting and showing gift suggestions) 
    $(document).on("click", "button#results", showResults);
    // "Save Gift" button listener
    $(document).on("click", "button.saveGift", saveGift);
    // "Next" button listener (view saved gifts modal)
    $(document).on("click", "#saved", getSavedGifts);

// Gift functions

// All get* functions - making the selected API calls and populating the corresponding arrays

    // Books - NYTimes API
    function getBooks() {
        var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

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

     // Movies (reviews) - NYTimes API
     function getMovies() {
        var queryURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=Y& opening-date=2019-01-01;2020-09-01&api-key=xUVU76OUVbXKD94Ig4mUUmlvQJGAyTSQ";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
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

    // Home Decor - eBay API
    function getHome() {
        var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=homedecor&AvailableItemsOnly=true&MaxEntries=50";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let jsonResponse = JSON.parse(response)
            let results = jsonResponse.Product;

            for (let i = 0; i < results.length; i++) {
                let newHome = {
                    title: results[i].Title,
                    url: results[i].DetailsURL,
                    image: results[i].StockPhotoURL
                };
                if (results[i].StockPhotoURL) {
                    homeArray.push(newHome);
                }
            };
            console.log("Home Decor:", homeArray);
        });
    }

    // Cooking books - eBay API
    function getCooking() {
        var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=cookbooks&AvailableItemsOnly=true&MaxEntries=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let jsonResponse = JSON.parse(response)
            let results = jsonResponse.Product;

            for (let i = 0; i < results.length; i++) {
                let newCooking = {
                    title: results[i].Title,
                    url: results[i].DetailsURL,
                    image: results[i].StockPhotoURL
                };
                if (results[i].StockPhotoURL) {
                    cookingArray.push(newCooking);
                }
            };
            console.log("Cookbooks:", cookingArray);
        });
    }

    // Makeup - eBay API
    function getMakeup() {
        var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=makeup&AvailableItemsOnly=true&MaxEntries=30"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let jsonResponse = JSON.parse(response)
            let results = jsonResponse.Product;

            for (let i = 0; i < results.length; i++) {
                let newMakeup = {
                    title: results[i].Title,
                    url: results[i].DetailsURL,
                    image: results[i].StockPhotoURL
                };
                if (results[i].StockPhotoURL) {
                    makeupArray.push(newMakeup);
                }
            };
            console.log("Makeup:", makeupArray);
        });
    }
    
    // Video games and consoles - eBay API
    function getGames() {
        var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=games&AvailableItemsOnly=true&MaxEntries=20"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let jsonResponse = JSON.parse(response)
            let results = jsonResponse.Product;

            for (let i = 0; i < results.length; i++) {
                let newGames = {
                    title: results[i].Title,
                    url: results[i].DetailsURL,
                    image: results[i].StockPhotoURL
                };
                if (results[i].StockPhotoURL) {
                    gamesArray.push(newGames);
                }
            };
            console.log("Video Games:", gamesArray);
        });
    }

// All show* functions - displaying the results of each search

    // Umbrella function triggering appropriate categories
    function showResults(e) {
        e.preventDefault();
        if (searchBooks)   { showBooks();   }
        if (searchMovies)  { showMovies();  }
        if (searchHome)    { showHome();    }
        if (searchCooking) { showCooking(); }
        if (searchMakeup)  { showMakeup();  }
        if (searchGames)   { showGames();   }
    }
    
    // Books
    function showBooks() {
        $("#results-header1").text("NYT Best Sellers List");
        const resultsDiv = $("#results-content1");
        resultsDiv.empty();

        for (let i = 0; i < booksArray.length; i++) {
            let bookDiv = $("<div class='book'>");
                let imageDiv = $("<div class='bookImg'>");
                    let bookImg = $("<img class='book-cover'>");
                    bookImg.attr("src", booksArray[i].image_url);
                    bookImg.attr("alt", "Cover of " + booksArray[i].title);
                    imageDiv.append(bookImg);
                bookDiv.append(imageDiv);
                
                let textDiv = $("<div class='bookInfo'>");
                    let titleLink = $("<a class='text-bold title'>" + booksArray[i].title + "</a>");
                    titleLink.attr("href", booksArray[i].url)
                    titleLink.attr("target", "_blank");
                    textDiv.append(titleLink);
                    let authorDiv = $("<div class='author'>" + booksArray[i].author + "</div>");
                    textDiv.append(authorDiv);
                    let descDiv = $("<div class='bookDesc'>" + booksArray[i].description + "</div>");
                    textDiv.append(descDiv);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    textDiv.append(saveBtn); 
                bookDiv.append(textDiv);
            resultsDiv.append(bookDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }

        $("#results-div1").removeClass("uk-hidden");
    }

    // Movies
    function showMovies() {
        $("#results-header2").text("NYT Movie Reviews");
        const resultsDiv = $("#results-content2");
        resultsDiv.empty();
        for (let i = 0; i < moviesArray.length; i++) {
            let movieDiv = $("<div class='movie'>");
                let movieDesc = $("<div class='movie-description'>");
                    let imageDiv = $("<div class='movieImg'>");
                        let movieImg = $("<img class='movie-cover'>");
                        movieImg.attr("src", moviesArray[i].image_url);
                        movieImg.attr("alt", "Image of '" + moviesArray[i].title + "'");
                        imageDiv.append(movieImg);
                    movieDesc.append(imageDiv);
                    
                    let reviewDiv = $("<div class='movieReview'>");
                        let reviewLink = $("<a class='review'>" + moviesArray[i].headline + "</a>");
                        reviewLink.attr("href", moviesArray[i].url);
                        reviewLink.attr("target", "_blank");
                        reviewDiv.append(reviewLink);
                        let criticDiv = $("<div class='critic'>" + moviesArray[i].byline + "</div>");
                        reviewDiv.append(criticDiv); 
                    movieDesc.append(reviewDiv);
                movieDiv.append(movieDesc);

                let textDiv = $("<div class='movieInfo'>");
                    let title = $("<div class='text-bold'>" + moviesArray[i].title + "</div>");
                    textDiv.append(title);
                    let descDiv = $("<div class='movieDesc'>" + moviesArray[i].description + "</div>");
                    textDiv.append(descDiv);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    textDiv.append(saveBtn);
                movieDiv.append(textDiv);
            resultsDiv.append(movieDiv);
            resultsDiv.append($("<hr class='uk-divider-large'></hr>"));
        }
        $("#results-div2").removeClass("uk-hidden");
    }   
    
    // Home Decor
    function showHome() {
        $("#results-header3").text("Home Decor");
        const resultsDiv = $("#results-content3");
        resultsDiv.empty();
        for (let i = 0; i < homeArray.length; i++) {
            let homeDiv = $("<div class='home'>");
                let imageDiv = $("<div class='homeImg'>");
                    let homeImg = $("<img class='home-cover'>");
                    homeImg.attr("src", homeArray[i].image);
                    homeImg.attr("alt", "Image of " + homeArray[i].title);
                    imageDiv.append(homeImg);
                homeDiv.append(imageDiv);

                let titleDiv = $("<div class='homeInfo'>");
                    let titleLink = $("<a class='text-bold'>" + homeArray[i].title + "</a>");
                    titleLink.attr("href", homeArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    titleDiv.append(saveBtn); 
                homeDiv.append(titleDiv);
            resultsDiv.append(homeDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }
        $("#results-div3").removeClass("uk-hidden");
    }

    // Cooking Books
    function showCooking() {
        $("#results-header4").text("Cookbooks");
        const resultsDiv = $("#results-content4");
        resultsDiv.empty();
        for (let i = 0; i < cookingArray.length; i++) {
            let cookingDiv = $("<div class='cooking'>");
                let imageDiv = $("<div class='cookingImg'>");
                    let cookingImg = $("<img class='cookbook-cover'>");
                    cookingImg.attr("src", cookingArray[i].image);
                    cookingImg.attr("alt", "Image of " + cookingArray[i].title);
                    imageDiv.append(cookingImg);
                cookingDiv.append(imageDiv);

                let titleDiv = $("<div class='cookbookInfo'>");
                    let titleLink = $("<a class='text-bold'>" + cookingArray[i].title + "</a>");
                    titleLink.attr("href", cookingArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    titleDiv.append(saveBtn); 
                cookingDiv.append(titleDiv);
            resultsDiv.append(cookingDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }
        $("#results-div4").removeClass("uk-hidden");
    }
 
    // Makeup 
    function showMakeup() {
        $("#results-header5").text("Makeup");
        const resultsDiv = $("#results-content5");
        resultsDiv.empty();
        for (let i = 0; i < makeupArray.length; i++) {
            let makeupDiv = $("<div class='makeup'>");
                let imageDiv = $("<div class='makeupImg'>");
                    let makeupImg = $("<img class='makeup-cover'>");
                    makeupImg.attr("src", makeupArray[i].image);
                    makeupImg.attr("alt", "Image of " + makeupArray[i].title);
                    imageDiv.append(makeupImg);
                makeupDiv.append(imageDiv);

                let titleDiv = $("<div class='makeupInfo'>");
                    let titleLink = $("<a class='text-bold'>" + makeupArray[i].title + "</a>");
                    titleLink.attr("href", makeupArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    titleDiv.append(saveBtn); 
                makeupDiv.append(titleDiv);
            resultsDiv.append(makeupDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }
        $("#results-div5").removeClass("uk-hidden");
    }

    // Video Games and Consoles
    function showGames() {
        $("#results-header6").text("Video Games & Consoles");
        const resultsDiv = $("#results-content6");
        resultsDiv.empty();
        for (let i = 0; i < gamesArray.length; i++) {
            let gamesDiv = $("<div class='games'>");
                let imageDiv = $("<div class='gamesImg'>");
                    let gamesImg = $("<img class='games-cover'>");
                    gamesImg.attr("src", gamesArray[i].image);
                    gamesImg.attr("alt", "Image of " + gamesArray[i].title);
                    imageDiv.append(gamesImg);
                gamesDiv.append(imageDiv);

                let titleDiv = $("<div class='gamesInfo'>");
                    let titleLink = $("<a class='text-bold'>" + gamesArray[i].title + "</a>");
                    titleLink.attr("href", gamesArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='saveGift'>");
                    saveBtn.text("Save to the Gift List");
                    titleDiv.append(saveBtn); 
                gamesDiv.append(titleDiv);
            resultsDiv.append(gamesDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }
        $("#results-div6").removeClass("uk-hidden");
    }

    

// CRUD - Database functions
    
// CREATE DB record - POST method 
    
    // Create a new user account (new row in the 'users' table)
    function saveUser() {
        userInfo = {
            username: $("input.username").val().trim(),
            email: $("input.email").val().trim()
        };
        
        $.get("/api/users", function(users){
            if (users.length > 0) {
                allUsers = users; 
            } else {
                allUsers = [];
            }
        });

        if (allUsers.length > 0) {      
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].username === userInfo.username || 
                    allUsers[i].email === userInfo.email) {
                        console.log(
                            `You already have an account. \n 
                            Your account login is: \n ?
                            Username: ${allUsers[i].username} \n 
                            Email: ${allUsers[i].email}`
                        );
                        break;
                } else if (i = allUsers.length-1) {
                    $.post("/api/user", userInfo, function(newUser){
                        console.log(newUser);
                        UserId = newUser.id; 
                    });                                
                } else {
                    continue;
                }
            }
        } else {
            $.post("/api/user", userInfo, function(newUser){
                console.log(newUser);
                UserId = newUser.id; 
            });
        }            
    }

    // Create a new gift record (a row in "gifts" table)
    function saveGift(e) {
        e.preventDefault();
        const gift = {
            gift: $(this).siblings('.title').text(),
            gift_desc: $(this).siblings('.bookDesc').text(),
            UserId: UserId
        };
        $.post("/api/gift", gift, function(newGift){
            console.log(newGift);
            $(this).text("Gift Saved!");
        });
    }

// READ DB - GET method
    
    // Get all users
    function getAllUsers() {
        $.get("/api/users", function(users) {
            console.log(users);
        });
    }

    // Get one user
    function getOneUser() {
        $.get("/api/user", function(user) {
            console.log(user);
        });
    }

    // Get all gifts for a specific user
    function getSavedGifts(username) {
        $.get("/api/gifts", function(gifts) {
            console.log(gifts);
            if (!gifts || !gifts.length) {
                displayEmpty(username);
            } else {
                location.redirect("/api/saved");
            }
        });
    }

    function displayEmpty(username) {
        const pageContainer = $(".container");
        const partial = "";
        if (username) {
          partial = " for " + username;
        }
        pageContainer.empty();
        const messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No saved gifts yet" + partial + ", please go to <a href='/#modal-group-2'>search page</a> to get started.");
        pageContainer.append(messageH2);
      }

// UPDATE DB - PUT method

    // function updateOneGift() {
    //     const gift = {
    //         gift: $(this).siblings('.title').text(),
    //         gift_desc: $(this).siblings('.bookDesc').text(),
    //         UserId: UserId
    //     };
    //     $.update("/api/gift", gift, function(updGift) {
    //         console.log(updGift);
    //     });
    // }

// DELETE DB record - DELETE method

    // function deleteOneGift() {
    //     const gift = {
    //         id: id
    //     };
    //     $.delete("/api/gift", gift, function(delGift) {
    //         console.log(delGift);
    //     });
    // }

    
});
