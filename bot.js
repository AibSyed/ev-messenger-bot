console.log('Bot is running...');

//import dependencies
require('dotenv').config();
const TwitterLite = require('twitter-lite');

//import utilities
const helper = require('./utils/helper.js');
const picker = require('./utils/picker.js');

//declare twitter auth vars from env
const TWITTER_ACCESS_TOKEN_SECRET = process.env['TWITTER_ACCESS_TOKEN_SECRET'];
const TWITTER_ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN'];
const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'];
const TWITTER_API_KEY = process.env['TWITTER_API_KEY'];
const TWITTER_BEARER_TOKEN = process.env['TWITTER_BEARER_TOKEN'];

//declare authenticated client for app
const app = new TwitterLite({
	version: '2',
	extension: false,
	bearer_token: TWITTER_BEARER_TOKEN,
});

//declare authenticated client for bot user
const user = new TwitterLite({
	access_token_key: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
	consumer_key: TWITTER_API_KEY,
	consumer_secret: TWITTER_API_SECRET,
});

//main script
async function botScript() {
	console.log('Bot script has started.');
	//IIFE (Immediately Invoked Function Expression to get chosen user list)
	let userList = picker.pickRandomUserList();

	const fullQuery =
		'(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

	let currentDate = new Date();
	let reducedMinutes = 2.5;
	currentDate.setDate(currentDate.getDate());
	currentDate.setMinutes(currentDate.getMinutes() - reducedMinutes);

	let params = {
		start_time: currentDate.toISOString(),
		max_results: 15,
		'tweet.fields': 'public_metrics',
		expansions: 'author_id',
		'user.fields': 'id,username',
		query: fullQuery,
	};

	const { meta, data, includes } = await app.get(
		'tweets/search/recent',
		params
	);
	if (meta.result_count > 0) {
		const { bestTweetId, bestTweetUser } = helper.getBestTweet(data);
		console.log(
			'Found results that match criteria, determining whether to quote tweet, or retweet.'
		);
		if (Math.random() > 0.1) {
			quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
		} else {
			retweetBestTweet(bestTweetId);
		}
	} else {
		console.log('No matching results to display at this time.');
	}
}

async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
	console.log('Running Quote Best Tweet Function.');
	console.log('Best tweet id: ' + bestTweetId);
	const username = helper.getUsernameFromId(includes.users, bestTweetUser);
	if (username != undefined) {
		const status = helper.getStatus(bestTweetId, username);
		console.log(
			'Tweeting the following status for ' + username + ': ' + status
		);
		try {
			const { data } = await user.post('statuses/update', { status: status });
		} catch (err) {
			console.log(err);
		}
	}
}

async function retweetBestTweet(id) {
	console.log('Running Best Retweet Function.');
	console.log('Best retweet id: ' + id);
	try {
		const { data } = await user.post('statuses/retweet/' + id);
	} catch (err) {
		console.log(err);
	}
}

//run every 1.5 minutes
setInterval(botScript, 90000);
