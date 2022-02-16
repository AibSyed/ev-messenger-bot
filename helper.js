const getBestTweet = function (data) {
    let bestTweetId = 0, bestTweetPoints = 0, bestTweetUser = ''
    data.forEach((tweet) => {
        const metrics = tweet.public_metrics
        let currentTweetPoints = metrics.like_count + metrics.retweet_count * 5 + metrics.quote_count * 2 + metrics.reply_count * 2
        if (currentTweetPoints > bestTweetPoints) {
            bestTweetPoints = currentTweetPoints
            bestTweetId = tweet.id
            bestTweetUser = tweet.author_id
        }
    })

    return { bestTweetId: bestTweetId, bestTweetUser: bestTweetUser }
}

const getFromClauses = function (userList) {
    let fromClause = ""
    const users = userList.split(",")
    for (const user in users) {
        fromClause += 'OR ' + 'from:' + users[user] + ' '
    }
    fromClause = fromClause.substring(3)
    return fromClause
}

const getStatus = function (tweetId, user) {
    let comments = [
        user + ' shared the following post...',
        'The latest update from ' + user + ':',
        'Check out ' + user + "'s latest post! ⚡",
        "Here's the latest from " + user + ':',
        user,
        'A new post from ' + user + ':',
        'What do you think about this post from ' + user + '?',
        "Here's what " + user + " has been up to:",
        'What are your thoughts on this post from ' + user + '?',
        'Another EV update from ' + user + '!',
        "If you haven't aleady, give " + user + ' a follow for more great posts!',
    ];
    let randomComment = comments[Math.floor(comments.length * Math.random())];
    return randomComment + "\nhttps://twitter.com/" + user + "/status/" + tweetId
}

const getUsernameFromId = function (users, id) {
    for (const user in users) {
        obj = users[user]
        if (obj.id === id) {
            return obj.username;
        }
    }
}

exports.getFromClauses = getFromClauses
exports.getBestTweet = getBestTweet
exports.getStatus = getStatus
exports.getUsernameFromId = getUsernameFromId