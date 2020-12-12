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
    let allUsers = [];
    getUsers();
    let userInfo, UserId;
    
    let searchBooks = false;
    let searchMovies = false;
    let searchHome = false;
    let searchCooking = false;
    let searchMakeup = false;
    let searchGames = false;

// Event listeners
    // "Next" button listener (new user account modal)
    $(document).on("click", "button#login", saveUser);
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
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
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
                    let title = $("<div class='text-bold title'>" + moviesArray[i].title + "</div>");
                    textDiv.append(title);
                    let descDiv = $("<div class='movieDesc'>" + moviesArray[i].description + "</div>");
                    textDiv.append(descDiv);
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
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
                let imageDiv = $("<div class='ebayImg homeImg'>");
                    let homeImg = $("<img class='ebay-cover home-cover'>");
                    homeImg.attr("src", homeArray[i].image);
                    homeImg.attr("alt", "Image of " + homeArray[i].title);
                    imageDiv.append(homeImg);
                homeDiv.append(imageDiv);

                let titleDiv = $("<div class='ebayInfo homeInfo'>");
                    let titleLink = $("<a class='text-bold title'>" + homeArray[i].title + "</a>");
                    titleLink.attr("href", homeArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
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
                let imageDiv = $("<div class='ebayImg cookingImg'>");
                    let cookingImg = $("<img class='ebay-cover cookbook-cover'>");
                    cookingImg.attr("src", cookingArray[i].image);
                    cookingImg.attr("alt", "Image of " + cookingArray[i].title);
                    imageDiv.append(cookingImg);
                cookingDiv.append(imageDiv);

                let titleDiv = $("<div class='ebayInfo cookbookInfo'>");
                    let titleLink = $("<a class='text-bold title'>" + cookingArray[i].title + "</a>");
                    titleLink.attr("href", cookingArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
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
                let imageDiv = $("<div class='ebayImg makeupImg'>");
                    let makeupImg = $("<img class='ebay-cover makeup-cover'>");
                    makeupImg.attr("src", makeupArray[i].image);
                    makeupImg.attr("alt", "Image of " + makeupArray[i].title);
                    imageDiv.append(makeupImg);
                makeupDiv.append(imageDiv);

                let titleDiv = $("<div class='ebayInfo makeupInfo'>");
                    let titleLink = $("<a class='text-bold title'>" + makeupArray[i].title + "</a>");
                    titleLink.attr("href", makeupArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
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
                let imageDiv = $("<div class='ebayImg gamesImg'>");
                    let gamesImg = $("<img class='ebay-cover games-cover'>");
                    gamesImg.attr("src", gamesArray[i].image);
                    gamesImg.attr("alt", "Image of " + gamesArray[i].title);
                    imageDiv.append(gamesImg);
                gamesDiv.append(imageDiv);

                let titleDiv = $("<div class='ebayInfo gamesInfo'>");
                    let titleLink = $("<a class='text-bold title'>" + gamesArray[i].title + "</a>");
                    titleLink.attr("href", gamesArray[i].url);
                    titleLink.attr("target", "_blank");
                    titleDiv.append(titleLink);
                    let saveBtn = $("<button type='submit' class='uk-button uk-button-secondary saveGift'>");
                    saveBtn.text("Save Gift");
                    saveBtn.attr("style", "border-radius=5px;")
                    titleDiv.append(saveBtn); 
                gamesDiv.append(titleDiv);
            resultsDiv.append(gamesDiv);
            resultsDiv.append($("<hr class='uk-divider-large'>"));
        }
        $("#results-div6").removeClass("uk-hidden");
    }

    
// Email validation function

function IsEmail(email) {
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(email.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

// CRUD - Database functions
    
// CREATE DB record - POST method 
    
    // Create a new user account (new row in the 'users' table)
    function saveUser(e) {
        e.preventDefault();
        userInfo = {
            username: $("input.username").val().trim(),
            email: $("input.email").val().trim()
        };

        const isEmail = IsEmail(userInfo.email);
        const validation = $("#valid");
        const warning = $("<div class='warning'>");

        if (userInfo.username.length < 1 || userInfo.username.length > 100) {
            warning.text("Your Username is not valid! \n Please try again.");
            validation.prepend(warning);
        } else if (!isEmail) {
            warning.text("Your Email is not valid! \n Please try again.");
            validation.prepend(warning);
        } else if (allUsers.length > 0) {      
                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].username === userInfo.username || 
                        allUsers[i].email === userInfo.email) {
                            warning.text(`You already have an account. \n 
                                Your login is: \n
                                Username: ${allUsers[i].username} \n 
                                Email: ${allUsers[i].email}`);
                            validation.prepend(warning);
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
        let user = UserId;
        let btn = $(this);
        let gift = {};
        if (btn.parent('.bookInfo')) {
            gift = {
                gift: btn.siblings('.title').text(),
                author: btn.siblings('.author').text(),
                gift_desc: btn.siblings('.bookDesc').text(),
                gift_url: btn.siblings('.title').attr('href'),
                image_url: btn.parent('.bookInfo').siblings('.bookImg').children('.book-cover').attr('src'),
                UserId: user
            };
        } else if (btn.parent('.movieInfo')) {
            console.log(btn.parent('.movieInfo').siblings('.movie-description').children('.movieReview').children('.review').attr('href'));
            gift = {
                gift: btn.siblings('.title').text(),
                author: '',
                gift_desc: btn.siblings('.movieDesc').text(),
                gift_url: btn.parent('.movieInfo').siblings('.movie-description').children('.movieReview').children('.review').attr('href'),
                image_url: btn.parent('.movieInfo').siblings('.movie-description').children('.movieImg').children('.movie-cover').attr('src'),
                UserId: user
            };
        } else { 
            gift = {
                gift: btn.siblings('.title').text(),
                author: '',
                gift_desc: '',
                gift_url: btn.siblings('.title').attr('href'),
                image_url: btn.parent('.ebayInfo').siblings('.ebayImg').children('.ebay-cover').attr('src'),
                UserId: user
            };
        }
        $.post("/api/gift", gift, function(newGift){
            console.log(newGift);
            btn.text("Gift saved!");
        });
    }

// READ DB - GET method

    // Get all users from the database
    function getUsers() {
        $.get("/api/users", function(users){
            if (users.length > 0) {
                allUsers = users; 
            } else {
                allUsers = [];
            }
        });
    }
    
    // Get all gifts for a specific user
    function getSavedGifts() {
        let username = $("input.username2").val().trim();
        console.log(username);
        let query = {
            url: "/api/gifts/" + username
        }
        $.get(query.url, function(data) {
            console.log(data);
            location.replace(query.url);
        });
    }
    
});
