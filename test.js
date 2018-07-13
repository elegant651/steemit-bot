const fs = require('fs');
const key = JSON.parse(fs.readFileSync('./.key', 'utf8'));

const steem = require('steem');

const tag = "kr"
// const query = { tag, limit: 1};
// steem.api.getDiscussionsByCreated(query, (err, res) => {
//   if (err) {
    
//   } else {
//     res.forEach(post => {
//       const voters = post.active_votes.map(vote => vote.voter);
//       const isVoted = voters.includes("willpark");
      
//       if (!isVoted) {
        
//       } 
//     });
//   }
// });

const tag = "kr";
app.getDiscussionsByTag(tag).then((post) => {
    console.log(JSON.stringify(post));
    app.comment(tag, post).then((post) => {     
        app.vote(post, 1000).then((post) => {
            let msg = `${tag}의 자동 보팅이 완료되었습니다! `;
            const url = "https://steemit.com/"+post.url;
            msg += post.title +"\n URL: "+url;                          

            console.log(msg);
        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
});         


// app.getDiscussionsByTag(tag).then((post) => {
//     console.log(JSON.stringify(post));

    // app.comment(tag, post).then((post) => {
    //     app.vote(post, 150).then((post) => {

    //         let msg = `${tag}의 자동 보팅이 완료되었습니다!`;                            

    //         res.json({ 'speech': msg, 'displayText': msg });
    //     });
    // }).catch((err) => {
    //     console.error(err);
    // });
// }).catch((err) => {
//     console.error(err);
// }); 


// steem.api.getAccounts(['ned', 'dan'], (err, response) => {
// 	console.log(err, response);
// });

// const query = {"tag": "kr", "limit": 2};
// steem.api.getDiscussionsByCreated(query, function(err, result) {
//     if(err){
//         console.log("err:" + err)        
//     }
//     else{        
//         console.log(result)
//     }
// });

// steem.api.getDiscussionsByTrending(query, function(err, result) {
//   console.log(err, result);
// });

// steem.api.getDiscussionsByVotes(query, function(err, result) {
//   console.log(err, result);
// });

// steem.api.getDiscussionsByHot(query, function(err, result) {
//   console.log(err, result);
// });

// steem.api.getDiscussionsByFeed(query, function(err, result) {
//   console.log(err, result);
// });


// steem.api.getActiveVotes("willpark", "4dk839", function (err, response) {
//     console.log(err, response); // 결과 값 전제 보기
//     var msg = "total # of voter : " + response.length; // response.length : voting한 사람 수
//     console.log(msg);
//     for (var i = 0; i < response.length; i++) {
//         console.log(response[i].voter, response[i].rshares); // rshares 값을 이용하여 $ amount를 구한다.
//     }
// });


// const title = "";
// const body = "안녕하세요. 업보팅 하고 갑니다.";
const post = {
    author: "kilu83",
    permlink: "cosint-iota-trinity-android-ver"
}
// const metadata = { tags: ["test"] }
// steem.broadcast.comment(
//     key.postKey,
//     post.author,
//     post.permlink,
//     key.creator,
//     steem.formatter.commentPermlink(post.author, post.permlink),
//     title,
//     body,
//     metadata,
//     function(err, result) {
//       console.log(err, result);
//     }
// );

// const weight = 1025;
// steem.broadcast.vote(
//     key.postKey,
//     key.creator,
//     post.author,
//     post.permlink,
//     weight,
//     (err, res) => {
//         console.log(err, res);
//     }
// );


/*
steem.api.getTrendingTags('', 100, function (err, result) {
    var arr = [];
    
    // tag 앞에 kr 문자가 포함되는 태그만 선별
    result.forEach(function (tagData) {
        // if (tagData.name.substring(0, 2) == 'kr')
            arr.push({name: tagData.name, total_payouts: tagData.total_payouts});
    });

    // total_payouts 내림 차순으로 정렬
    arr.sort(function (a, b) {
        return b.total_payouts.split(' ')[0] - a.total_payouts.split(' ')[0];
    });
    console.log('getTrendingTags 로 검색되는 kr 태그 총 개수: ' + arr.length);

    console.log('kr 태그 보상 순위');
    var rank = 0;
    arr.forEach((tagData) => {
        console.log(++rank, tagData);
    });
});
*/


// steem.api.getContentAsync(post.author, post.permlink)
//   .then(function(post) {
//     steem.api.getContentRepliesAsync(post.author, post.permlink)
//       .then(function(replies) {
//         console.log(JSON.stringify(replies, null, 2));
//       });
//   });


