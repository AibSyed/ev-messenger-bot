require('dotenv').config()
const helper = require('./helper.js');
const TwitterLite = require('twitter-lite');

const TWITTER_ACCESS_TOKEN_SECRET = process.env['TWITTER_ACCESS_TOKEN_SECRET'];
const TWITTER_ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN'];
const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'];
const TWITTER_API_KEY = process.env['TWITTER_API_KEY'];
const TWITTER_BEARER_TOKEN = process.env['TWITTER_BEARER_TOKEN'];
const USER_LIST = process.env['USER_LIST'];
const SECOND_USER_LIST = process.env['SECOND_USER_LIST'];

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

async function main() {
    let mode = Math.random();
    let userList = USER_LIST;
    let reducedHours = 1;
    if (mode > 0.5) {
        reducedHours = 1;
        userList = SECOND_USER_LIST;
    }

    const fullQuery =
        '(' + helper.getFromClauses(userList) + ') -is:reply -is:retweet';

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    yesterday.setHours(yesterday.getHours() - reducedHours);


    let params = {
        start_time: yesterday.toISOString(),
        max_results: 10,
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
        if (Math.random() > 0.6) {
            quoteTweetBestTweet(bestTweetId, bestTweetUser, includes);
        } else {
            retweetBestTweet(bestTweetId);
        }
    }
}

async function quoteTweetBestTweet(bestTweetId, bestTweetUser, includes) {
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
    try {
        console.log(id);

        const { data } = await user.post('statuses/retweet/' + id);
    } catch (err) {
        console.log(err);
    }
}

main();

//run every 30 minutes
setInterval(main, 1800000)

