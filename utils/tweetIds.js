const tweetIds = [];
const limit = 20; // Maximum limit for tweetIds array

const addTweetId = (id) => {
	// Check if the tweetIds array has reached the maximum limit
	if (tweetIds.length === limit) {
		console.log(
			`There are now ${tweetIds.length} tweet ids stored. Tweet storage limit has been reached. Emptying storage.`
		);
		// Clearing the tweetIds array if limit is reached
		tweetIds.length = 0;
		console.log(
			`Storage reset. There are now ${tweetIds.length} tweet ids stored. `
		);
	}
	tweetIds.push(id); // Adding new id to the tweetIds array
	console.log(`There are currently ${tweetIds.length} tweet ids stored.`);
};

const hasTweetId = (id) => {
	// Check if the given id is present in the tweetIds array
	// If tweetId is present return true else false
	return tweetIds.includes(id);
};

exports.addTweetId = addTweetId;
exports.hasTweetId = hasTweetId;
