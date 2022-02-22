//dependencies
require('dotenv').config();

//declare user lists from .env
const FIRST_USER_LIST = process.env['FIRST_USER_LIST'];
const SECOND_USER_LIST = process.env['SECOND_USER_LIST'];
const THIRD_USER_LIST = process.env['THIRD_USER_LIST'];
const FOURTH_USER_LIST = process.env['FOURTH_USER_LIST'];
const FIFTH_USER_LIST = process.env['FIFTH_USER_LIST'];
const SIXTH_USER_LIST = process.env['SIXTH_USER_LIST'];
const SEVENTH_USER_LIST = process.env['SEVENTH_USER_LIST'];
const EIGHTH_USER_LIST = process.env['EIGHTH_USER_LIST'];
const NINTH_USER_LIST = process.env['NINTH_USER_LIST'];
const TENTH_USER_LIST = process.env['TENTH_USER_LIST'];

//declare user group arrays
let userGroup1 = [FIRST_USER_LIST, SIXTH_USER_LIST];
let userGroup2 = [SECOND_USER_LIST, SEVENTH_USER_LIST];
let userGroup3 = [NINTH_USER_LIST, FIFTH_USER_LIST];
let userGroup4 = [EIGHTH_USER_LIST, FOURTH_USER_LIST];
let userGroup5 = [THIRD_USER_LIST, TENTH_USER_LIST];

//randomize user list selection from user group arrays
let randomUserList1 = userGroup1[Math.floor(userGroup1.length * Math.random())];
let randomUserList2 = userGroup2[Math.floor(userGroup2.length * Math.random())];
let randomUserList3 = userGroup3[Math.floor(userGroup3.length * Math.random())];
let randomUserList4 = userGroup4[Math.floor(userGroup4.length * Math.random())];
let randomUserList5 = userGroup5[Math.floor(userGroup5.length * Math.random())];

//pick random user list based on mode value and return result
const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	let mode = Math.random();
	let userList;
	if (mode > 0 && mode <= 0.2) {
		userList = randomUserList1;
		console.log('Picking random user list from group 1.');
	} else if (mode > 0.2 && mode <= 0.4) {
		userList = randomUserList2;
		console.log('Picking random user list from group 2.');
	} else if (mode > 0.4 && mode <= 0.6) {
		userList = randomUserList3;
		console.log('Picking random user list from group 3.');
	} else if (mode > 0.6 && mode <= 0.8) {
		userList = randomUserList4;
		console.log('Picking random user list from group 4.');
	} else {
		userList = randomUserList5;
		console.log('Picking random user list from group 5.');
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
