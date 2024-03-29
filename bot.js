console.log('Bot is active...');

// Import dependencies
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Import utilities
const helper = require('./utils/helper.js');
const picker = require('./utils/picker.js');
const tweetIdStorage = require('./utils/tweetIdStorage.js');

// Declare twitter auth vars from env
const TWITTER_ACCESS_TOKEN_SECRET = process.env['TWITTER_ACCESS_TOKEN_SECRET'];
const TWITTER_ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN'];
const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'];
const TWITTER_API_KEY = process.env['TWITTER_API_KEY'];

// Authenticate the Twitter Api Client
const client = new TwitterApi({
	appKey: TWITTER_API_KEY,
	appSecret: TWITTER_API_SECRET,
	accessToken: TWITTER_ACCESS_TOKEN,
	accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

// Main script
async function botScript() {
	console.log('Bot script has started.');
	let userList = picker.pickRandomUserList();
	const fullQuery =
		'(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

	let currentDate = new Date();
	let reducedMinutes = 60;
	currentDate.setMinutes(currentDate.getMinutes() - reducedMinutes);
	let searchStartTime = currentDate.toISOString();

	let params = {
		start_time: searchStartTime,
		max_results: 50,
		'tweet.fields': 'public_metrics',
		expansions: 'author_id',
		'user.fields': 'id,username',
		query: fullQuery,
	};

	console.log('Making API call with parameters: ', params);

	try {
		const {
			data: tweets,
			meta,
			includes,
		} = await client.v2.search(fullQuery, params);
		console.log('API call result : ', meta.result_count);

		if (meta.result_count > 0) {
			const { bestTweetId, bestTweetUser, bestTweetPoints } =
				helper.getBestTweet(tweets);

			if (tweetIdStorage.hasTweetId(bestTweetId)) {
				console.log(
					`Tweet with ID ${bestTweetId} has already been posted. Skipping...`
				);
				return;
			}

			console.log(
				`Found ${meta.result_count} results that match criteria, determining best tweet with Id: ${bestTweetId}, Author: ${bestTweetUser} and Score: ${bestTweetPoints}`
			);

			if (Math.random() > 0.1) {
				console.log(
					`Tweet with ID ${bestTweetId} has been selected for a quote tweet.`
				);
				await quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
			} else {
				console.log(
					`Tweet with ID ${bestTweetId} has been selected for a retweet.`
				);
				await retweetBestTweet(bestTweetId);
			}

			tweetIdStorage.addTweetId(bestTweetId);
		} else {
			console.log('No results to display at this time.');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

// Function for quoting the best tweet
async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
	console.log('Running Quote Best Tweet function.');
	console.log(`Best tweet id: ${bestTweetId}`);

	const username = helper.getUsernameFromId(includes.users, bestTweetUser);

	if (username != undefined) {
		const status = helper.getStatus(bestTweetId, username);
		console.log(`Tweeting the following status for ${username}: ${status}`);
		try {
			const { data } = await client.v1.tweet(status);
			console.log('Quote tweet successful');
		} catch (err) {
			console.log(`Error occurred while trying to quote tweet: ${err.message}`);
		}
	}
}

// Function for retweeting the best tweet
async function retweetBestTweet(id) {
	console.log('Running Retweet Best Tweet function.');
	console.log(`Best retweet id: ${id}`);
	try {
		const { data } = await client.v1.retweet(id);
		console.log(`Retweeted tweet with ID: ${id}`);
	} catch (err) {
		console.log(`Error occurred while trying to retweet tweet with ID: ${id}`);
		console.log(`Error message: ${err.message}`);
	}
}

// Run every 30 seconds
setInterval(botScript, 300000000);
