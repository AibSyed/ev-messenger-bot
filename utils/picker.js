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

//user list pool
const userListPool = [
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

//randomize user list selection from user list pool
let randomUserList =
	userListPool[Math.floor(userListPool.length * Math.random())];

//pick random user list based on mode value and return result
const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	let userList;
	userList = randomUserList;
	console.log('Winning user list has the following names: ' + userList);
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
		"If you haven't aleady, give " + user + ' a follow for more great posts!',
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
		"I've got the plug ⚡. Check out this post from " + user,
	];
	//select random comments based on length of comments array
	let randomComment = comments[Math.floor(comments.length * Math.random())];

	return randomComment;
};

//exports
exports.pickRandomUserList = pickRandomUserList;
exports.pickRandomComment = pickRandomComment;
