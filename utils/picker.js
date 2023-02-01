//dependencies
require('dotenv').config();

//declare user lists from .env
const userList01 = process.env['USER_LIST_01'];
const userList02 = process.env['USER_LIST_02'];
const userList03 = process.env['USER_LIST_03'];
const userList04 = process.env['USER_LIST_04'];
const userList05 = process.env['USER_LIST_05'];
const userList06 = process.env['USER_LIST_06'];
const userList07 = process.env['USER_LIST_07'];
const userList08 = process.env['USER_LIST_08'];
const userList09 = process.env['USER_LIST_09'];
const userList10 = process.env['USER_LIST_10'];
const userList11 = process.env['USER_LIST_11'];
const userList12 = process.env['USER_LIST_12'];
const userList13 = process.env['USER_LIST_13'];

// Create an array of user lists
const userLists = [
	userList01,
	userList02,
	userList03,
	userList04,
	userList05,
	userList06,
	userList07,
	userList08,
	userList09,
	userList10,
	userList11,
	userList12,
	userList13,
];

// Function to pick a random user list from the list of users
const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	console.log(`Total number of user lists: ${userLists.length}`);

	// Select a random index from 0 to the number of user lists
	const randomIndex = Math.floor(Math.random() * userLists.length);
	console.log(`Random index selected: ${randomIndex}.`);

	// Get user list based on the selected random index
	const userList = userLists[randomIndex];
	console.log(`Selected user list has the following names: ${userList}`);

	return userList;
};

// array to store selected comments from pickRandomComment function
let selectedComments = [];

// limit of comments
const commentLimit = 10;

// function to pick a random comment from the list of comments
const pickRandomComment = function (user) {
	console.log('Running function to pick random comment for status.');
	// set array of comments
	let comments = [
		user + ' shared the following post...',
		'The latest update from ' + user + ':',
		'Check out ' + user + "'s latest post! ⚡",
		"Here's the latest from " + user + ':',
		user,
		'A new post from ' + user + ':',
		'What do you think about this post from ' + user + '?',
		"Here's what " + user + ' has been up to:',
		'What are your thoughts on this post from ' + user + '?',
		'Another EV update from ' + user + '!',
		"If you haven't already, give " + user + ' a follow for more great posts!',
		'Another great post from ' + user,
		'Boom, another EV post from ' + user + ' 💥',
		"If you're not getting at least some of your EV news from me, you're simply not doing it right... Here's another post, courtesy of " +
			user +
			'.',
		"Here's another post for my followers. - For those that don't follow me, what are you waiting for?",
		"I've got the plug 🔌. Check out this post from " + user,
		'Just stumbled upon a great post from ' + user + ', check it out!',
		'Looking for some inspiration on the latest EV developments? Give ' +
			user +
			'a follow! Here is their latest post:',
		'I always keep an eye out for interesting posts on the EV market and this one from ' +
			user +
			' caught my attention:',
		"If you're interested in the latest EV developments, this post from " +
			user +
			' is worth a look.',
		'I came across this post from ' +
			user +
			" and I think it's worth sharing. Check it out!",
		'This post from ' + user + ' is 👌',
		"As an EV enthusiast, I couldn't resist sharing this post from " +
			user +
			'.',
		'This post from ' +
			user +
			' caught my attention. Take a look and give them a like/follow!',
		'I thought this post from ' + user + ' was worth sharing, enjoy!',
		"See what's new from " + user + ':',
		user + ' a great post to share, give it a like and give them a follow!',
		'What do you think about ' + user + "'s latest post?",
		"What's your opinion on " + user + "'s latest post?",
		'Stay updated with another post from ' + user + '!',
		"Don't miss out, give " + user + ' a follow for more amazing posts!',
		'More great content from ' + user,
		user + ' just posted another electrifying update!⚡⚡⚡',
		"If you're not following " + user + ", you're missing out!",
		'Check out this post from ' + user + ' and stay updated!',
		'Informative post from ' + user,
		'I just found this amazing post from ' + user + '. Check it out!',
		user + ' with a great post. Like and follow!',
		"I'm loving the insights in this post from " + user,
		'Find inspiration with this post from ' + user,
		"I'm always on the lookout for interesting EV posts and this one from " +
			user +
			' is a must-see.',
		'I just stumbled upon this post from ' +
			user +
			' and thought it was worth sharing.',
		"Don't miss this post from " + user + '!',
		'Take a look at this post from ' + user + ' on the latest EV developments.',
		"Don't miss out on the latest thunderous insights from " + user + ' ⚡⚡⚡',
		"You don't want to be left in the dark on the latest EV developments. Follow " +
			user +
			' for some thunderous updates ⚡⚡⚡',
		user +
			' is the ultimate EV oracle. Their latest post will enlighten you 🔮',
		'Get ready to be struck by lightning with the latest post from ' +
			user +
			' ⚡',
		"It's time for some electrifying news from " + user + '. Follow them now!',
		'Get ready to feel the power of the EV gods with ' +
			user +
			"'s latest post 💪⚡",
		'The EV industry is never dull with ' +
			user +
			' on the scene. Check out their latest post!',
		'As the EV god, I bestow upon you the latest post from ' +
			user +
			'. Read and be enlightened, give them a follow! 💡',
		'The EV industry is about to get a shock with this latest post from ' +
			user +
			' ⚡',
		"As an EV god, I'm always on the lookout for the best EV insights. Check out this latest post from " +
			user +
			'!',
		"I've got the power, and so does " +
			user +
			'. Check out their latest post on the latest EV developments 💥',
	];
	//select random comments based on length of comments array
	let randomComment = comments[Math.floor(comments.length * Math.random())];
	// check if selectedComment length is equal to the limit
	if (selectedComments.length === commentLimit) {
		console.log(
			`Limit of ${commentLimit} comments reached, resetting selected comments`
		);
		selectedComments = []; // reset the array
	}
	// check if the randomly selected comment is already in the array
	if (selectedComments.includes(randomComment)) {
		console.log(`Comment already selected, picking new comment`);
		return pickRandomComment(user); // recursively call the function to select a new comment
	}
	// add the comment to the selectedComments array
	selectedComments.push(randomComment);
	console.log(`Number of comments stored: ${selectedComments.length}`);
	return randomComment;
};

//exports
exports.pickRandomUserList = pickRandomUserList;
exports.pickRandomComment = pickRandomComment;
