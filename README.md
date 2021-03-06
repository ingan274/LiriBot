# Liri Bot
### Welcome to Liri: A command-line Language Interpretation and Recognition Interface!

## What can LIRI do?
LIRI can...
<li> 🎵 Search Spotify for any song title </li>
<li> 🤘🏼 Find Concerts of your favorite artist or bands </li>
<li> 🎥 Search OMDB (the Open Movie Database) for any movie title</li> 
<li> ❓ Surprise you with one of the above!  </li> 
So a better question would be, what can't LIRI do?

### Great! So how do I use LIRI? <br>
LIRI is a command-line application built using Node.js, so you can run it in your terminal. 
#### With basicliri.js:
Type one of the following commands exactly as specified below to see it in action.
<li>🤘🏼 node basicliri.js concert-this 'Artist/Band Name' </li> 
<li>🎵 node basicliri.js spotify-this-song 'Song Title' </li> 
<li>🎥 node basicliri.js movie-this 'Movie Title' </li> 
<li>❓ node basicliri.js do-what-it-says </li> 

###### NOTE: the search terms (Artist/Band Name, Song Title, or Movie Title) do NOT need to be between "quotations."

![Liri 1.0 Demo](demo/basicDemo.gif)

<br>

### Not User friendly?? I made it easier, with LIRI 2.0! <br>
Type below command (and there is only ONE!)
#### With liribot.js:
<li>🤘🏼🎵🎥❓ node liribot.js </li> 
<li>You will be prompted to see what you would like to search! (so much easier, right?)</li> 

![Liri 2.0 Demo](demo/liriDemo.gif)

### Programming notes
Please obtain API keys or IDs by
 <li> emailing support@bandsintown.com for an API ID for BandsInTown </li>
 <li> going to http://www.omdbapi.com/ for an API key for OMDB </li>
 <li> going to https://developer.spotify.com/dashboard/applications for an API Client ID and Secret for Spotify </li>
<br><br>
Happy LIRI-ing!

##### Week 10 assigment for the June 2019 cohort of UCLA Boot Camp. Built using JavaScript, Node.

