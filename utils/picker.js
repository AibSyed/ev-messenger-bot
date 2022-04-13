//dependencies
require('dotenv').config();

//declare user list from .env
const mainUserList = process.env['USER_LIST'];

//pick random user list based on mode value and return result
const pickRandomUserList = function () {
	console.log('Running function to pick random user list.');
	let userList;
	userList = mainUserList;
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
