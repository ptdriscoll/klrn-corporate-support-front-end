# KLRN Corporate Support microsite (front-end)  

This is the front-end of a microsite targeting sponsors interested in connecting with KLRN viewers through on-air messaging, event sponsorships or other marketing channels.  

`npm start` launches scaffolding, in a Windows environment, using an npm workflow and Boostrap 4. Dependencies include JQuery and Popper.js. 

`npm run build` copies the src folder to the dist folder, and concatenates and compresses the CSS and JavaScript files.    

### Full site

- **GitHub:** https://github.com/ptdriscoll/klrn-corporate-support 

### Plugins 

This site uses several JavaScript plugins to load YouTube playlists, animate navigation scrolling and add parallax effects.

- **animate-scrolling:** Animates scrolling for anchor links that have a scroll class added
- **in-view:** Checks to see when an element is in viewport, which is used to stop and start carousels and highlight links 
- **parallax:** Scrolls background images at variable speeds 
- **youtube-playlist-loader:** Dynamically loads an array of YouTube playlists
- **youtube-playlist-parser:** Parses a YouTube playlist, loading videos into a carousel and creating video objects to manage plays, pauses and event tracking

### References

- https://getbootstrap.com/
- https://jquery.com/
- https://popper.js.org/
- https://developers.google.com/youtube/