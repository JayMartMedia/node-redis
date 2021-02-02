# Node Redis

## Purpose
The purpose of the code in this repo is to reduce the ammount of requests made to an api by caching the response in a redis store. 

This code makes a request to the GitHub users api and extracts and caches the amount of public repos that a user has in the key value pair: `username:number_of_repos`. This can reduce the amount of requests made to an api which can prevent getting throttled/rate-limited due to making too many requests. It can also speed up the process be eliminating the network time to load data from the third-party api.

## Business use case
For any system that needs to make a lot of requests, this redis caching method can reduce the amount of requests made to the external api which can reduce network loading times and prevent throttling/rate-limiting.

## Tools used
+ [Node.js](https://nodejs.org/en/) - Environment for running the code
+ [redis](https://redis.io/) - Data store for caching the result of each request
+ [Express](https://expressjs.com/) - Used to serve the api response

## Credit
Some of this code comes from [Brad Traversy's](https://github.com/bradtraversy) video on [caching with redis](https://www.youtube.com/watch?v=oaJq1mQ3dFI)
