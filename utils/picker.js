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

//pick random user list based on mode value and return result
const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	let mode = Math.random();
	let userList;
	if (mode >= 0 && mode < 0.1) {
		userList = userList01;
		console.log('Picking random user from user list 1.');
	} else if (mode >= 0.1 && mode < 0.2) {
		userList = userList02;
		console.log('Picking random user from user list 2.');
	} else if (mode >= 0.2 && mode < 0.3) {
		userList = userList03;
		console.log('Picking random user from user list 3.');
	} else if (mode >= 0.3 && mode < 0.4) {
		userList = userList04;
		console.log('Picking random user from user list 4.');
	} else if (mode >= 0.4 && mode < 0.5) {
		userList = userList05;
		console.log('Picking random user from user list 5.');
	} else if (mode >= 0.5 && mode < 0.6) {
		userList = userList06;
		console.log('Picking random user from user list 6.');
	} else if (mode >= 0.6 && mode < 0.7) {
		userList = userList07;
		console.log('Picking random user from user list 7.');
	} else if (mode >= 0.7 && mode < 0.8) {
		userList = userList08;
		console.log('Picking random user from user list 8.');
	} else if (mode >= 0.8 && mode < 0.9) {
		userList = userList09;
		console.log('Picking random user from user list 9.');
	} else if (mode >= 0.9 && mode < 1) {
		userList = userList10;
		console.log('Picking random user from user list 10.');
	} else {
		userList = userList01;
		console.log('Picking random user list from group 1.');
	}
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
