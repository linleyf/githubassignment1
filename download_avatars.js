var request = require('request');
var fs = require("fs");


function getRepoContributors(repoOwner, repoName, callback) {

	var endPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/" + "contributors?access_token=49f34a34d7297c0923b3179ffdecde20f1d39b19";
	var options = {
		url: endPoint,
		headers: {'User-Agent':'request'},
		json: true
	};



  request(options, function (error, response, body) {
  	if (error) {
    	throw error;
  	}
    if (!error && response.statusCode == 200) {
   		console.log(body);
  	} 

	  var dir = "./avatars/"; // make a new directory for the avatars?
    fs.stat(dir, function(error, stats) { // error handling to check if directory already exists, if not, it creates the directory
      if (error || !stats.isDirectory()) {
        fs.mkdir(dir, function(error) {
          if(error) {
            console.log("Alright, using " + dir);
          }
        });
      }
    });
  
  body.forEach(function(element, index, body){
		var fileName = dir + element.login + ".jpg";
  	callback(element.avatar_url, fileName);
  });
	
	});
}

getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {
 console.log("Errors:", err);
 console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  var fileContent = request(url, function(error, response, body) {
    if (error) {
      throw error;
    }
  });

//piping (refer to streaming section)

fileContent.pipe(fs.createWriteStream(filePath));

}

var reName = process.argv[2];
var reOwner = process.argv[3];
getRepoContributors(reName, reOwner, downloadImageByURL);
  





  



