const tagModel = require("../models/tagModel");

module.exports = {
    getDistanceCoord: (latitude, longitude, rayon) => {
        var offSetLat = rayon / 111.110;
        var OneLongitudeDegree = 111.110 * Math.cos(latitude * Math.PI / 180);
        var offSetLong = rayon / OneLongitudeDegree;
        var MaxLatitude = latitude + offSetLat;
        var MinLatitude = latitude - offSetLat;
        var MaxLongitude = longitude + offSetLong;
        var MinLongitude = longitude - offSetLong;
        return ([MinLatitude, MaxLatitude, MinLongitude, MaxLongitude]);
    },

    getMutualTags: async (user_id, target_id) => {
        var user_tags = await tagModel.getAllUserTags(user_id);
        var target_tags = await tagModel.getAllUserTags(target_id);
        var tags = 0;

        for (var i=0;i<user_tags.length;i++) {
            for (var k=0;k<target_tags.length;k++) {
                if (user_tags[i].tag_id == target_tags[k].tag_id)
                    tags++;
            }
        }
        var count = 0;
        switch (tags) {
            case 0:
                break;
            case 1:
                count += 3;
                break;
            case 2:
                count += 5;
                break;
            case 3:
                count += 9;
                break;
            case 4:
                count += 12;
                break;
            case 5:
                count += 15;
                break;
            default:
                count +=20;
        }
        return count;
    },

    getDistanceScore: (lat1, long1, lat2, long2) => {
        var latitude1 = lat1 * Math.PI / 180;
        var latitude2 = lat2 * Math.PI / 180;
        var longitude1 = long1 * Math.PI / 180;
        var longitude2 = long2 * Math.PI / 180;
        var R = 6371;
    
        var d = R * Math.acos(Math.cos(latitude1) * Math.cos(latitude2) *
                Math.cos(longitude2 - longitude1) + Math.sin(latitude1) *
                         Math.sin(latitude2));
        if (d < 10)
            return 25;
        if (d < 25)
            return 20;
        if (d < 50)
            return 15;
        if (d < 100)
            return 10;
        if (d < 250)
            return 5;
        return 0;
    },

    getScoredList: async (listData, user) => {
        var score = listData.copyWithin(0);

        for (var i=0;i<listData.length;i++) {
            var count = 0;
            count += listData[i].sexual_orientation == user.sexual_orientation ? 40 : 25;
            count += await module.exports.getDistanceScore(user.geo_lat, user.geo_long, listData[i].geo_lat, listData[i].geo_long);
            count += await module.exports.getMutualTags(user.id, listData[i].id);
            if (listData[i].pop_score >= (user.pop_score-50) && listData[i].pop_score <= (user.pop_score+50))
                count += 15;
            else if (listData[i].pop_score >= (user.pop_score-100) && listData[i].pop_score <= (user.pop_score+100))
                count += 10;
            else if (listData[i].pop_score >= (user.pop_score-250) && listData[i].pop_score <= (user.pop_score+250))
                count += 5;
            score[i].pop_max = count;
            //console.log(count);
        };
        var tmp;
        var i = 0;
        while (i < score.length) {
          var k = 0;
          while (k < score.length) {
            if (score[i].pop_max > score[k].pop_max)
                {
                    tmp = score[i];
                    score[i] = score[k];
                    score[k] = tmp;
                }
                k++;
          }
          i++;
        }
        return (score/* .slice(0,12) */);
    }
}