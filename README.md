# webBuilder
**Under construction**
## Installation

 1. Install this repo.
 2. Create a new folder and include a file `setupSite.js` with the following code:
 ```javascript
 var webBuilder = require('webBuilder');
 var site = webBuilder.Setup();
 ```
 3. Run the file and navigate in your browser to: `localhost:8080`
 4. To re-run your site: Include a file `startSite.js` with the following code:
 ```javascript
 var webBuilder = require('webBuilder');
 var site = new webBuilder.Site();
 ```
 ## Plugins
 
 Plugins can be used to add advanced features to your site
 
 ### Where to find Plugins?
 
 Look in the Plugin Branch of this repo.
 
 ### Write Plugins
 
