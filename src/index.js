const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

// must have redis server running
const client = redis.createClient(REDIS_PORT);

const app = express();

// create the reponse
function setResponse(username, repos) {
    return `${username} has ${repos} public repos`;
}

// makes request to github for data
async function getRepos(req, res, next) {
    try {
        const { username } = req.params;

        // get response from github
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        // pull data from response
        const casedUsername = data.login;
        const repos = data.public_repos || 0;

        // if the username was not able to be pulled 
        // out of the data then the user does not exist
        if(!casedUsername){
            res.send("user not found")
        }else{
            // Set data to redis
            client.setex(casedUsername, 3600, repos);
            res.send(setResponse(casedUsername, repos));
        }
    } catch (error) {
        console.error(err);
        res.status(500);
    }
}

// caches response to reduce ammount of api calls
function cache(req, res, next) {
    const { username } = req.params;

    client.get(username, (err, data) => {
        if(err) throw err;
        
        try{
            if(data !== null) {
                res.send(setResponse(username, data));
            }else{
                next();
            }
         } catch (err) {
             console.error(err);
         }
    });
}

app.get('/repos/:username', cache, getRepos);

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
});