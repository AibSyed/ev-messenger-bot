console.log("EV-Messenger-Bot is running...")

require('dotenv').config()
const helper = require('./helper.js');
const TwitterLite = require('twitter-lite');

//declare auth vars and user lists from env
const TWITTER_ACCESS_TOKEN_SECRET = process.env['TWITTER_ACCESS_TOKEN_SECRET'];
const TWITTER_ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN'];
const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'];
const TWITTER_API_KEY = process.env['TWITTER_API_KEY'];
const TWITTER_BEARER_TOKEN = process.env['TWITTER_BEARER_TOKEN'];
const FIRST_USER_LIST = process.env['FIRST_USER_LIST'];
const SECOND_USER_LIST = process.env['SECOND_USER_LIST'];
const THIRD_USER_LIST = process.env['THIRD_USER_LIST'];
const FOURTH_USER_LIST = process.env['FOURTH_USER_LIST'];
const FIFTH_USER_LIST = process.env['FIFTH_USER_LIST'];
const SIXTH_USER_LIST = process.env['SIXTH_USER_LIST'];
const SEVENTH_USER_LIST = process.env['SEVENTH_USER_LIST'];
const EIGHTH_USER_LIST = process.env['EIGHTH_USER_LIST'];
const NINTH_USER_LIST = process.env['NINTH_USER_LIST'];

// an authenticated client for this app
const app = new TwitterLite({
    version: '2',
    extension: false,
    bearer_token: TWITTER_BEARER_TOKEN,
});

// an authenticated client for the bot user
const user = new TwitterLite({
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET,
});

let userListsOne = [
    FIRST_USER_LIST,
    SIXTH_USER_LIST,
    EIGHTH_USER_LIST
];

let userListsTwo = [
    SECOND_USER_LIST,
    SEVENTH_USER_LIST,
    FOURTH_USER_LIST
];

let userListsThree = [
    NINTH_USER_LIST,
    THIRD_USER_LIST,
    FIFTH_USER_LIST
]

//pick random userlist based on mode value and return result
function pickRandomUserList() {
    console.log("Picking random user list")
    let userList
    let mode = Math.random();
    let randomUserListOne = userListsOne[Math.floor(userListsOne.length * Math.random())];
    let randomUserListTwo = userListsTwo[Math.floor(userListsTwo.length * Math.random())];
    let randomUserListThree = userListsThree[Math.floor(userListsThree.length * Math.random())];

    if (mode > 0 && mode < 0.3) {
        userList = randomUserListOne;
        console.log(userList + " is the winner")
    }
    else if (mode > 0.3 && mode < 0.6) {
        userList = randomUserListTwo;
        console.log(userList + " is the winner")
    }
    else {
        userList = randomUserListThree
        console.log(userList + " is the winner")
    }
    return userList
}

async function main() {
    console.log("Main script has started")

    //IIFE (Immediately Invoked Function Expression to get chosen user list)
    let userList = (pickRandomUserList());
    let reducedHours = 1;

    const fullQuery =
        '(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    yesterday.setHours(yesterday.getHours() - reducedHours);


    let params = {
        start_time: yesterday.toISOString(),
        max_results: 15,
        'tweet.fields': 'public_metrics',
        expansions: 'author_id',
        'user.fields': 'id,username',
        query: fullQuery,
    };

    const { meta, data, includes } = await app.get(
        'tweets/search/recent',
        params
    );
    if (meta.result_count > 0) {
        const { bestTweetId, bestTweetUser } = helper.getBestTweet(data);
        if (Math.random() > 0.2) {
            quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
        } else {
            retweetBestTweet(bestTweetId);
        }
    }
}

async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
    console.log("Running Quote Best Tweet Function")
    const username = helper.getUsernameFromId(includes.users, bestTweetUser);
    if (username != undefined) {
        const status = helper.getStatus(bestTweetId, username);
        console.log(status);
        try {
            const { data } = await user.post('statuses/update', { status: status });
        } catch (err) {
            console.log(err);
        }
    }
}

async function retweetBestTweet(id) {
    console.log("Running Best Tweet Function")
    try {
        console.log(id);

        const { data } = await user.post('statuses/retweet/' + id);
    } catch (err) {
        console.log(err);
    }
}

//run every 15 minutes
setInterval(main, 1800000);
