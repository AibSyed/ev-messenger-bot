console.log('Bot is running...');

//import dependencies
require('dotenv').config();
const TwitterLite = require('twitter-lite');

//Import utilities
const helper = require('./utils/helper.js');
const picker = require('./utils/picker.js');
const tweetIds = require('./utils/tweetIds.js');

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

//Main script
async function botScript() {
	console.log('Bot script has started.');
	//Get a list of chosen users by invoking the pickRandomUserList function from picker.js
	let userList = picker.pickRandomUserList();

	//Build the query string using the chosen user list and excluding replies and retweets
	const fullQuery =
		'(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

	//Create a new Date object
	let currentDate = new Date();

	//Reduce the minutes by 6
	let reducedMinutes = 600;

	//Subtract the reduced minutes from the current time
	currentDate.setMinutes(currentDate.getMinutes() - reducedMinutes);

	//Convert the Date object to ISO String format
	let searchStartTime = currentDate.toISOString();

	//Set the parameters for the Twitter API call
	let params = {
		//Pass the ISO String representation of the date object
		start_time: searchStartTime,
		//Set the maximum number of results to be returned
		max_results: 50,
		//Select the specific tweet fields to be returned
		'tweet.fields': 'public_metrics',
		//Expand the author_id field to get additional information
		expansions: 'author_id',
		//Select the specific user fields to be returned
		'user.fields': 'id,username',
		//Pass the full query string
		query: fullQuery,
	};

	//Make the API call and destructure the response
	const { meta, data, includes } = await app.get(
		'tweets/search/recent',
		params
	);

	//Check if there are any matching results
	if (meta.result_count > 0) {
		//Get the best tweet and user from the results
		const { bestTweetId, bestTweetUser } = helper.getBestTweet(data);
		console.log(
			'Found results that match criteria, determining whether to quote tweet, or retweet.'
		);

		//Check if the tweet has already been posted
		if (tweetIds.hasTweetId(bestTweetId)) {
			console.log(
				`Tweet with ID ${bestTweetId} has already been posted. Skipping...`
			);
			return;
		}
		//Determine if the bot will quote tweet or retweet the best tweet
		if (Math.random() > 0.1) {
			quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
		} else {
			retweetBestTweet(bestTweetId);
		}
		//Add the tweet ID to the list of posted tweets
		tweetIds.addTweetId(bestTweetId);
	} else {
		console.log('No matching results to display at this time.');
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
		} catch (err) {
			console.log(err);
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
		tweetIds.tweetIds.addTweetId(id);
		//Log any error that may occur
	} catch (err) {
		console.log(`Error occurred while trying to retweet tweet with ID: ${id}`);
		console.log(err);
	}
}

//Run every 2.5 minutes
setInterval(botScript, 150000);
