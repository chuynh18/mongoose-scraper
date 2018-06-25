Scraper
=======

Basic info
----------

Hello, this project scrapes headlines and links off the nytimes.com website.  It can be viewed [here](https://nyskyscraper.herokuapp.com/).

It's fairly straightforward to use.  Pick a section of the New York Times from the dropdown menu, then click the "scrape" button.  You'll then see the current headlines that appear on that specific section of the NYT.

You can also save an article by clicking an article's associated save button.  This saves the article title and URL into a MongoDB instance.  You can also add notes of your own.

To view saved articles, simply click "Saved articles".

Development comments
--------------------

Don't really have too much to say.  Once again, on the front-end side of things, I chose not to use Bootstrap or JQuery.  This keeps the site a bit slimmer and faster.

I didn't really have any website in mind to scrape, so I just stuck with the NYT.  I knew that by choosing the NYT, I had to add a little bit of extra functionality, so I added a dropdown menu so the user can scrape a specific section.

You'll notice the dropdown menu defaults to the home page.  However, when you choose to scrape a specific section of the NYT, the dropdown menu shows the correct section.  This is not behavior I got "for free"; I had to write a little bit of JavaScript to achieve that.  I pull out the URL from the window object, then do a linear search through the dropdown menu to select the correct one.

I handle POSTing from the browser through XMLHttpRequest, and I handle GETs simply by writing a new value to window.location.href.