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
];

const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	console.log(`Total number of user lists: ${userLists.length}`);
	//Select a random index from 0 to the number of user lists
	const randomIndex = Math.floor(Math.random() * userLists.length);
	console.log(`Random index selected: ${randomIndex}`);
	//Get user list based on the selected random index
	const userList = userLists[randomIndex];
	console.log(`Picking random user from user list ${randomIndex + 1}.`);
	console.log(`Winning user list has the following names: ${userList}`);
	return userList;
};

// pick random comment
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
		'Boom, another EV post 💥',
		'I am the most electrifying man in Tweet entertainment!⚡⚡⚡- Make sure you check out this post from ' +
			user +
			'.',
		'Can I interest you in the following tweet from ' + user + '?',
		"If you're not getting at least some of your EV news from me, you're simply not doing it right... Here's another post, courtesy of " +
			user +
			'.',
		"Here's another post for my followers. - For those that don't follow me, what are you waiting for?",
		"I've got the plug 🔌. Check out this post from " + user,
		'Looks like ' +
			user +
			' just got struck by my lightning bolt of knowledge with their latest post ⚡⚡⚡!',
		'I must have whispered some secrets of the EV industry in ' +
			user +
			"'s ear, because their latest post is 🔥",
		'Check out this enlightening post from ' +
			user +
			" on the EV market, it's like they were struck by my lightning of knowledge. ☁️⚡",
		"I can't stop thinking about this post from " +
			user +
			', they must have been blessed by my infinite wisdom.  ☁️⚡',
		"If you're not following " +
			user +
			' yet, I must not have deemed you worthy of their EV insights.',
		'Just stumbled upon a post from ' + user + ' that I approve of.',
		'This post from ' +
			user +
			' on the latest EV developments is like a gift from me.',
		"I'm loving the unique perspective on the EV industry in this post from " +
			user +
			'.',
		'Looking for some inspiration on the latest EV developments? Check out this post from ' +
			user +
			'.',
		"I've been following " +
			user +
			' for a while now and they never disappoint!',
		'I always keep an eye out for interesting posts on the EV market and this one from ' +
			user +
			' caught my attention.',
		"If you're interested in the latest EV developments, this post from " +
			user +
			' is worth a look.',
		'This post from ' +
			user +
			' on the EV market caught my attention and I think it might be of interest to you as well.',
		'I came across this post from ' +
			user +
			" and I think it's worth sharing. Check it out!",
		"I've been following the EV market for a while now, and this post from " +
			user +
			' is 👌',
		"As an EV enthusiast, I couldn't resist sharing this post from " +
			user +
			'.',
		'This post from ' + user + ' caught my attention.',
		'As someone who has a keen interest in the EV industry, I thought this post from ' +
			user +
			' is worth sharing.',
	];
	//select random comments based on length of comments array
	let randomComment = comments[Math.floor(comments.length * Math.random())];

	return randomComment;
};

//exports
exports.pickRandomUserList = pickRandomUserList;
exports.pickRandomComment = pickRandomComment;
