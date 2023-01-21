// import utilities from the file picker.js
const picker = require('./picker.js');

// function that calculates the best tweet from an array of tweets
const getBestTweet = function (data) {
	console.log('Calculating best tweet...');
	// initialize variables to track the best tweet
	let bestTweetId = 0,
		bestTweetPoints = 0,
		bestTweetUser = '';
	// loop through the tweets and calculate the points for each one
	data.forEach((tweet) => {
		const metrics = tweet.public_metrics;
		let currentTweetPoints =
			metrics.like_count * 0.75 +
			metrics.retweet_count * 0.75 +
			metrics.quote_count * 0.75 +
			metrics.reply_count * 0.75;
		// check if this tweet has more points than the current best tweet
		if (currentTweetPoints > bestTweetPoints) {
			// if so, update the best tweet variables
			bestTweetPoints = currentTweetPoints;
			bestTweetId = tweet.id;
			bestTweetUser = tweet.author_id;
		}
	});
	console.log('Best tweet:', bestTweetId, bestTweetUser);
	// return an object with the best tweet's ID and user
	return { bestTweetId: bestTweetId, bestTweetUser: bestTweetUser };
};

// function that creates a "from" clause for a Twitter query
const getFromClauses = function (userList) {
	console.log('Creating "from" clause...');
	let fromClause = '';
	// split the user list into an array
	const users = userList.split(',');
	// loop through the users and add them to the from clause
	for (const user in users) {
		fromClause += 'OR ' + 'from:' + users[user] + ' ';
	}
	// remove the first "OR" from the clause
	fromClause = fromClause.substring(3);
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
