const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


// #install.packages("jsonlite")
// library(jsonlite)
// #install.packages("httpuv")
// library(httpuv)
// #install.packages("httr")
// library(httr)

oauth_endpoints("github")

myapp <- oauth_app(appname = "pdf_generator",
                   key = "ea36a7216dc0c1d3f4b9",
                   secret = "7f41ecf3e74589301fb4de74a1763d1f376218fe")

github_token <- oauth2.0_token(oauth_endpoints("github"), myapp)

gtoken <- config(token = github_token)
req <- GET("https://api.github.com/users/{username}/repos", gtoken)

// stop_for_status(req)

// json1 = content(req)

// gitDF = jsonlite::fromJSON(jsonlite::toJSON(json1))

// gitDF[gitDF$full_name == "jtleek/datasharing", "created_at"]




inquirer
    .prompt({
        message: "Enter your GitHub username:",
        name: "username"
    })
    .then(function ({
        username
    }) {
        const queryUrl = `https://api.github.com/users/${username}/`;

        axios.get(queryUrl).then(function (res) {
           
         //# of Public Repos
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

        // User Avatar 
            const avatar = res.data.map(function (repo) {
                return repo.owner.avatar_url;
            })

        // User Bio
            const userBio = res.data.map(function(repo) {
                return repo.bio;
            })



        //# of Follwers
            const followersCount = res.data.map(function(repo) {
                return repo.followers;
            })

            const followersCountStr = followersCount.join("\n");


        //# of Github Stars
            const watchersCount = res.data.map(function (repo) {
                return repo.watchers;
            });

            const watchersCountStr = watchersCount.join("\n");

        //# of users following

            //   fs.writeFile("repos.txt", repoNamesStr, function(err) {
            //     if (err) {
            //       throw err;
            //     }
            console.log(` ${userBio}`)
            console.log(` ${followersCount.length} Followers`);
            console.log(` ${watchersCount.length} Stars`);
            console.log(` ${repoNames.length} Public repos`);
        });
    });