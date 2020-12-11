# WrappIt
## Overview
Ahh, the holidays, the time of year when you can't figure out what to buy your loved ones. With our app, WrappIt, we make it easy to find that perfect gift. Just select that special person's top 3 interests from our categories of gifts and we'll wrap up a list of gifts specific to those interests. No need to fret, just WrappIt and gift it!
## Description
The WrappIt App is for users who are having trouble finding that perfect gift.

## Wrappit Application Screen Shot
<img src="public/assets/WrappIt 01.png" alt="WrappIt App Main Page">

## Built With
* [UIkit](https://getuikit.com/) - Open Source CSS framework
* [New York Times - Books](https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VygNZrSBD3hbAKYqxo7V4fGEvJSq8aux) - API for New York Times Books List
* [New York Times - Movies](https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=Y&opening-date=2019-01-01;2020-09-01&api-key=xUVU76OUVbXKD94Ig4mUUmlvQJGAyTSQ) - API for New York Times Movies List
* [eBay - Home Decor](https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=homedecor&AvailableItemsOnly=true&MaxEntries=400) - eBay API for Home Decor.
* [eBay - Cooking](https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=cookbooks&AvailableItemsOnly=true&MaxEntries=100) - eBay API for Cooking, MakeUp, Video Games & Consoles.
* [eBay - Makeup](https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=makeup&AvailableItemsOnly=true&MaxEntries=100) - eBay API for MakeUp, Video Games & Consoles.
* [eBay - Video Games & Consoles](https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=SuzanneG-WrappIt-PRD-1f785c25d-fb2797a7&siteid=0&version=967&QueryKeywords=games&AvailableItemsOnly=true&MaxEntries=95) - eBay API for Video Games & Consoles.

## Contributors
* **Suzanne Givnish** - UI (JavaScript, HTML, CSS, jQuery) / views (handlebars)
* **Bohdan Pechenyak** - Database setup / models
* **Brandon Ryu** - Server / Controllers / config