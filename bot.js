console.log('Bot is active...');

//import dependencies
require('dotenv').config();
const TwitterLite = require('twitter-lite');

//Import utilities
const helper = require('./utils/helper.js');
const picker = require('./utils/picker.js');
const tweetIdStorage = require('./utils/tweetIdStorage.js');

//Declare twitter auth vars from env
const TWITTER_ACCESS_TOKEN_SECRET = process.env['TWITTER_ACCESS_TOKEN_SECRET'];
const TWITTER_ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN'];
const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'];
const TWITTER_API_KEY = process.env['TWITTER_API_KEY'];
const TWITTER_BEARER_TOKEN = process.env['TWITTER_BEARER_TOKEN'];

//Declare authenticated client for app
const app = new TwitterLite({
    version: '2',
    extension: false,
    bearer_token: TWITTER_BEARER_TOKEN,
});

//Declare authenticated client for bot user
const user = new TwitterLite({
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET,
});

async function botScript() {
    // Bot script has started
    console.log('Bot script has started.');

    // Pick a random user list from picker
    let userList = picker.pickRandomUserList();

    // Create a full query string with helper.getFromClauses and remove reply and retweet tweets from the result
    const fullQuery = '(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

    // Set the current date and reduce the minutes by 60
    let currentDate = new Date();
    let reducedMinutes = 60;
    currentDate.setMinutes(currentDate.getMinutes() - reducedMinutes);

    // Get the search start time as ISO string
    let searchStartTime = currentDate.toISOString();

    // Set the parameters for the API call with tweet fields, expansions, user fields, query and time
    let params = {
        start_time: searchStartTime,
        max_results: 15,
        'tweet.fields': 'public_metrics',
        expansions: 'author_id',
        'user.fields': 'id,username',
        query: fullQuery,
    };

    // Log the parameters being used for the API call
    console.log('Making API call with parameters: ', params);

    // Initialize the meta variable
    let meta = null;

    // Try making the API call and catch any errors
    try {
        const { meta: responseMeta, data, includes } = await app.get('tweets/search/recent', params);
        console.log('API call result : ', responseMeta.result_count);
        meta = responseMeta;
    } catch (err) {
        console.log(err);
    }

    // Log the result count from the API call
    console.log('API call result : ', meta.result_count);

    // If the result count is greater than 0
    if (meta.result_count > 0) {

        // Get the best tweet with helper.getBestTweet
        const { bestTweetId, bestTweetUser, bestTweetPoints } =
            helper.getBestTweet(data);

        // Check if the tweet has already been posted
        if (tweetIdStorage.hasTweetId(bestTweetId)) {
            console.log(
                `Tweet with ID ${bestTweetId} has already been posted. Skipping...`
            );
            return;
        }

        // Log the best tweet information
        console.log(
            `Found ${meta.result_count} results that match criteria, determining best tweet with Id: ${bestTweetId}, Author: ${bestTweetUser} and Score: ${bestTweetPoints}`
        );

        // If a random number is greater than 0.1, quote tweet the best tweet
        if (Math.random() > 0.1) {
            console.log(
                `Tweet with ID ${bestTweetId} has been selected for a quote tweet.`
            );
            quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
        } else {
            // Otherwise, retweet the best tweet
            console.log(
                `Tweet with ID ${bestTweetId} has been selected for a retweet.`
            );
            retweetBestTweet(bestTweetId);
        }

        // Add the tweet id to the storage
        tweetIdStorage.addTweetId(bestTweetId);
    } else {
        // If there are no results from the API call, log a message to indicate no results were found
        console.log('No results to display at this time.');
    }
}



//Function for quoting the best tweet
async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
    console.log('Running Quote Best Tweet function.');
    console.log(`Best tweet id: ${bestTweetId}`);

    //Get the username of the best tweet user
    const username = helper.getUsernameFromId(includes.users, bestTweetUser);

    //If the username is defined, create the status for the quote tweet
    if (username != undefined) {
        const status = helper.getStatus(bestTweetId, username);
        console.log(`Tweeting the following status for ${username}: ${status}`);
        try {
            const { data } = await user.post('statuses/update', { status: status });
            console.log('Quote tweet successful');
        } catch (err) {
            console.log(`Error occurred while trying to quote tweet: ${err.message}`);
        }
    }
}

//Function for retweeting the best tweet
async function retweetBestTweet(id) {
    console.log('Running Retweet Best Tweet function.');
    console.log(`Best retweet id: ${id}`);
    try {
        const { data } = await user.post(`statuses/retweet/${id}`);
        console.log(`Retweeted tweet with ID: ${id}`);
    } catch (err) {
        console.log(`Error occurred while trying to retweet tweet with ID: ${id}`);
        console.log(`Error message: ${err.message}`);
    }
}

//Run every 2.5 minutes
setInterval(botScript, 150000);
