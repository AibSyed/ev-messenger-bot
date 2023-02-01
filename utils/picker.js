//dependencies
require('dotenv').config();

// import utilities from the file comments.js
const tweetComments = require('./comments.js');

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

// Array to store selected comments from pickRandomComment function
let selectedComments = [];

// Array of comments to be used
const comments = tweetComments;

// Function to pick a random comment from the list of comments
const pickRandomComment = function () {
	console.log('Running function to pick random comment for status.');
	// Check if all comments have been used
	if (comments.length === 0) {
		console.log('All comments have been used. Resetting...');

		// Reset the comments array by pushing all values from the selectedComments array back into it
		comments.push(...selectedComments);

		// Empty the selectedComments array
		selectedComments = [];
	}

	// Select a random comment from the comments array
	let randomIndex = Math.floor(Math.random() * comments.length);
	let selectedComment = comments[randomIndex];

	// Remove the selected comment from the comments array
	comments.splice(randomIndex, 1);

	// Add the selected comment to the selected comments array
	selectedComments.push(selectedComment);

	// Log the selected comment
	console.log(`Comment selected: ${selectedComment}`);

	// Log the number of comments remaining in the comments array
	console.log(`Comments left: ${comments.length}`);

	// Log the number of comments in the selected comments array
	console.log(`Selected comments: ${selectedComments.length}`);

	// Return the selected comment
	return selectedComment;
};

//exports
exports.pickRandomUserList = pickRandomUserList;
exports.pickRandomComment = pickRandomComment;
