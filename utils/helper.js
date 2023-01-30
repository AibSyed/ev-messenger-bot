// import utilities from the file picker.js
const picker = require('./picker.js');

const getBestTweet = function (data) {
	console.log('Calculating best tweet...');
	// Initialize variables to track the best tweet
	let bestTweet = { id: 0, author_id: '', score: 0 };

	// Loop through the tweets and calculate the score for each one
	for (let i = 0; i < data.length; i++) {
		let tweet = data[i];
		let score = 0;
		const metrics = tweet.public_metrics;
		score =
			metrics.like_count * 2 +
			metrics.retweet_count * 1.5 +
			metrics.quote_count * 1.5 +
			metrics.reply_count;
		// Check if this tweet has a higher score than the current best tweet
		if (score > bestTweet.score) {
			// If so, update the best tweet variables
			bestTweet = { id: tweet.id, author_id: tweet.author_id, score };
		}
	}
	console.log(
		`The best tweet is: Id: ${bestTweet.id}, Author: ${bestTweet.author_id}, with a Score of: ${bestTweet.score}`
	);
	// Return an object with the best tweet's ID, user, and score
	return {
		bestTweetId: bestTweet.id,
		bestTweetUser: bestTweet.author_id,
		bestTweetPoints: bestTweet.score,
	};
};

// function that creates a "from" clause for a Twitter query
const getFromClauses = function (userList) {
	console.log('Creating "from" clause...');
	let fromClause = '';
	// split the user list into an array
	const users = userList.split(',');
	if (!userList) {
		return fromClause;
	} else if (users.length === 1) {
		return 'from:' + users[0];
	}
	// loop through the users and add them to the from clause
	fromClause = users.map((user) => 'from:' + user).join(' OR ');
	console.log('"From" clause:', fromClause);
	// return the final from clause
	return fromClause;
};

// function that creates a tweet status string
const getStatus = function (tweetId, user) {
	console.log('Creating tweet status...');
	// return a string that includes a random comment and a link to the tweet
	return (
		picker.pickRandomComment(user) +
		'\nhttps://twitter.com/' +
		user +
		'/status/' +
		tweetId
	);
};

// function that gets a username from a user ID
const getUsernameFromId = function (users, id) {
	console.log('Getting username from user ID...');
	// loop through the users and check the id
	for (const user in users) {
		obj = users[user];
		if (obj.id === id) {
			// return the username if the id matches
			return obj.username;
		}
	}
};

// export the functions for use in other modules
exports.getFromClauses = getFromClauses;
exports.getBestTweet = getBestTweet;
exports.getStatus = getStatus;
exports.getUsernameFromId = getUsernameFromId;
