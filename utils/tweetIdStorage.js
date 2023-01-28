const tweetIds = [];
const limit = 100; // Maximum limit for tweetIds array

const addTweetId = (id) => {
	// Check if the tweetIds array has reached the maximum limit
	if (tweetIds.length === limit) {
		console.log(`Tweet storage limit reached, emptying storage.`);
		tweetIds = [];
		console.log(
			`Storage reset. There are now ${tweetIds.length} tweet ids stored. `
		);
	}
	tweetIds.push(id); // Adding new id to the tweetIds array
	console.log(`Tweet ID ${id} added. ${tweetIds.length} IDs stored.`);
};

const hasTweetId = (id) => {
	// Check if the given id is present in the tweetIds array
	// If tweetId is present return true else false
	return tweetIds.includes(id);
};

exports.addTweetId = addTweetId;
exports.hasTweetId = hasTweetId;
