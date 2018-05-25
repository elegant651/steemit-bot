const steem = require('steem');
// steem.api.getAccounts(['ned', 'dan'], (err, response) => {
// 	console.log(err, response);
// });

const query = {"tag": "kr", "limit": 2};
steem.api.getDiscussionsByCreated(query, function(err, result) {
    if(err){
        console.log("err:" + err)        
    }
    else{        
        console.log(result)
    }
});

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



