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
	// Return an empty string if the input is not a string or if it's an empty string.
	if (!userList || typeof userList !== 'string') {
		console.log('Input is invalid or empty. Returning an empty string.');
		return '';
	}

	// Split the user list into an array
	const users = userList.split(',');

	// Return the single username without the 'from:' prefix if there's only one user.
	if (users.length === 1) {
		console.log(`Returning single username: ${users[0]}`);
		return users[0];
	}

	// Loop through the users and add them to the from clause
	const fromClause = users.map((user) => 'from:' + user).join(' OR ');
	console.log(`Returning from clause: ${fromClause}`);

	// Return the final from clause
	return fromClause;
};

// function that creates a tweet status string
const getStatus = function (tweetId, user) {
	// Return a string that includes a random comment and a link to the tweet
	const status = `${picker.pickRandomComment(user)}
https://twitter.com/${user}/status/${tweetId}`;
	console.log(`Returning tweet status: ${status}`);
	return status;
};

// function that gets a username from a user ID
const getUsernameFromId = function (users, id) {
	// Use the Array.prototype.find() method to find the user with the matching id
	const user = users.find((obj) => obj.id === id);

	// Return the username if a match is found, otherwise return undefined
	if (user) {
		console.log(`Username found: ${user.username}`);
		return user.username;
	} else {
		console.log(`No username found for id: ${id}`);
		return undefined;
	}
};

// export the functions for use in other modules
exports.getFromClauses = getFromClauses;
exports.getBestTweet = getBestTweet;
exports.getStatus = getStatus;
exports.getUsernameFromId = getUsernameFromId;
