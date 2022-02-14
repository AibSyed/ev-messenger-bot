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
const TENTH_USER_LIST = process.env['TENTH_USER_LIST'];

//an authenticated client for this app
const app = new TwitterLite({
    version: '2',
    extension: false,
    bearer_token: TWITTER_BEARER_TOKEN,
});

//an authenticated client for the bot user
const user = new TwitterLite({
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET,
});

let userGroup1 = [
    FIRST_USER_LIST,
    SIXTH_USER_LIST
];

let userGroup2 = [
    SECOND_USER_LIST,
    SEVENTH_USER_LIST
];

let userGroup3 = [
    NINTH_USER_LIST,
    FIFTH_USER_LIST
];

let userGroup4 = [
    EIGHTH_USER_LIST,
    FOURTH_USER_LIST
];

let userGroup5 = [
    THIRD_USER_LIST,
    TENTH_USER_LIST
];

//pick random userlist based on mode value and return result
function pickRandomUserList() {
    console.log("Running function to grab random user list")
    let userList
    let mode = Math.random();
    let randomUserList1 = userGroup1[Math.floor(userGroup1.length * Math.random())];
    let randomUserList2 = userGroup2[Math.floor(userGroup2.length * Math.random())];
    let randomUserList3 = userGroup3[Math.floor(userGroup3.length * Math.random())];
    let randomUserList4 = userGroup4[Math.floor(userGroup4.length * Math.random())];
    let randomUserList5 = userGroup5[Math.floor(userGroup5.length * Math.random())];

    if (mode > 0 && mode < 0.2) {
        userList = randomUserList1;
        console.log('Picking random user list from group 1')
    }
    else if (mode > 0.2 && mode < 0.4) {
        userList = randomUserList2;
        console.log('Picking random user list from group 2')
    }
    else if (mode > 0.4 && mode < 0.6) {
        userList = randomUserList3;
        console.log('Picking random user list from group 3')
    }
    else if (mode > 0.6 && mode < 0.8) {
        userList = randomUserList4;
        console.log('Picking random user list from group 4')
    }
    else {
        userList = randomUserList5
        console.log('Picking random user list from group 5')
    }
    console.log(userList + ' is the winner.')
    return userList
}

async function botScript() {
    console.log('Bot script has started')

    //IIFE (Immediately Invoked Function Expression to get chosen user list)
    let userList = (pickRandomUserList());

    const fullQuery =
        '(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

    let pastTenMinutes = new Date();
    let reducedMinutes = 10;
    pastTenMinutes.setDate(pastTenMinutes.getDate());
    pastTenMinutes.setMinutes(pastTenMinutes.getMinutes() - reducedMinutes);

    let params = {
        start_time: pastTenMinutes.toISOString(),
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
        console.log('Found results that match criteria, determining whether to quote tweet, or retweet')
        if (Math.random() > 0.1) {
            quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
        } else {
            retweetBestTweet(bestTweetId);
        }
    }
    else {
        console.log('No matching results to display at this time, running bot script again until matching results are found.')
        botScript();
    }
}

async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
    console.log("Running Quote Best Tweet Function")
    const username = helper.getUsernameFromId(includes.users, bestTweetUser);
    if (username != undefined) {
        const status = helper.getStatus(bestTweetId, username);
        console.log(status);
        console.log(bestTweetId)
        try {
            const { data } = await user.post('statuses/update', { status: status });
        } catch (err) {
            console.log(err);
        }
    }
}

async function retweetBestTweet(id) {
    console.log("Running Best Retweet Function")
    try {
        const { data } = await user.post('statuses/retweet/' + id);
    } catch (err) {
        console.log(err);
    }
}

//run every 5 minutes
setInterval(botScript, 300000);
