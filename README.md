# KLRN Corporate Support microsite (front-end)  

This is the front-end of a microsite targeting sponsors interested in connecting with KLRN viewers through on-air messaging, event sponsorships or other marketing channels.  

`npm start` launches scaffolding, in a Windows environment, using an npm workflow and Boostrap 4. Dependencies include JQuery and Popper.js. 

`npm run build` concatenates and compresses the CSS and JavaScript files and copies all assets into a dist folder.    

### Plugins 

This site uses several JavaScript plugins to load YouTube playlists, animate navigation scrolling and add parallax effects.

- **animate-scrolling.js** - Animates scrolling for anchor links that have a scroll class added
- **in-view.js** - Checks to see when an element is in viewport, which is used to stop and start carousels and highlight links 
- **parallax.js** - Scrolls background images at variable speeds 
- **youtube-playlist-loader.js** - Dynamically loads an array of YouTube playlists
- **youtube-playlist-parser.js** - Parses a YouTube playlist, loading videos into a carousel and creating video objects to manage plays, pauses and event tracking

### References

- https://getbootstrap.com/
- https://jquery.com/
- https://popper.js.org/
- https://developers.google.com/youtube/