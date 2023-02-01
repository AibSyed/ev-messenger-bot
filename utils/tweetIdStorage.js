const tweetIds = [];
const limit = 100; // Maximum limit for tweetIds array
const maxStored = 10; // Maximum number of tweet IDs to keep when emptied

const addTweetId = (id) => {
	// Check if the tweetIds array has reached the maximum limit
	if (tweetIds.length === limit) {
		console.log(
			`Tweet storage limit reached. Keeping the last ${maxStored} tweet IDs and resetting the storage.`
		);

		// Keep the last 10 items in the array
		tweetIds.splice(0, tweetIds.length - maxStored);

		// Log the number of tweet IDs stored after the storage reset
		console.log(
			`Storage reset complete. ${tweetIds.length} tweet IDs now stored.`
		);
	}

	// Add the new tweet ID to the end of the tweetIds array
	tweetIds.push(id);

	// Log the number of tweet IDs stored after adding the new ID
	console.log(`Tweet ID ${id} added. ${tweetIds.length} tweet ids now stored.`);
};

const hasTweetId = (id) => {
	// Check if the given id is present in the tweetIds array
	// If tweetId is present return true else false
	return tweetIds.includes(id);
};

exports.addTweetId = addTweetId;
exports.hasTweetId = hasTweetId;

// Add tweet IDs to the tweetIds array
for (let i = 1; i <= 105; i++) {
	addTweetId(i);
}

// Check if a tweet ID is present in the tweetIds array
console.log(hasTweetId(5)); // Output: true
console.log(hasTweetId(105)); // Output: true
console.log(hasTweetId(106)); // Output: false
