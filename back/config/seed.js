const request = require('request');
const userModel = require('../models/userModel');
const pictureModel = require("../models/pictureModel");
const tagModel = require("../models/tagModel");
const randomInt = require('random-int');
const NodeGeocoder = require('node-geocoder');
const moment = require('moment');

module.exports = {
    getUserSeed: async() => {
        var options = {
            provider: 'google',
            apiKey: "AIzaSyCrQGnPtopWTSK9joyPAxlEGcl535KlQQQ",
            httpAdapter: 'https', 
            formatter: null 
          };
        var geocoder = NodeGeocoder(options);

        await request('https://randomuser.me/api/?results=1000&nat=fr&inc=gender,name,location,email,login,dob', function(err, resp, body) {
        body = JSON.parse(body);
        body.results.forEach(async element => {
            var randomSexuality = randomInt(1, 3);
            var randomPopScore = randomInt(50, 999);
            var bio = "This a sample of a bio =)";
            var uid = await userModel.createFromSeed([
                element.name.last.charAt(0).toUpperCase()+element.name.last.substring(1),
                element.name.first.charAt(0).toUpperCase()+element.name.first.substring(1),
                element.login.username,
                element.gender == 'male' ? 'man' : 'woman',
                randomSexuality,
                element.email,
                bio,
                element.dob.date.substr(0, 10),
                'Toto1234',
                element.location.city.charAt(0).toUpperCase()+element.location.city.substring(1),
                randomPopScore,
                1,
                moment().format().substr(0, 10)
            ])
            geocoder.geocode(element.location.city.charAt(0).toUpperCase()+element.location.city.substring(1))
                .then(res => {
                    userModel.updateData(uid, {
                        geo_lat: res[0].latitude,
                        geo_long: res[0].longitude
                    });
                });
            await request(`https://source.unsplash.com/random/640x480?${element.gender}`, async (err, resp, body) => {
                url = resp.request.uri.href;
                await pictureModel.createOne([uid, url, 0, 1]);
                await userModel.updateOne(uid, "profile_pictures_url", url);

                var tags = [];
                var randomTag;
                for (var i=0;i<8;i++) {
                    randomTag = randomInt(1, 16);
                    if (!tags.includes(randomTag)) {
                        tags.push(randomTag);
                        await tagModel.addOne(uid, randomTag);
                    }
                };
                });
            });
        })
        console.log("Database has been populated!");
    }
}