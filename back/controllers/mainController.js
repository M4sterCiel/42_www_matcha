const userModel = require("../models/userModel");
const pictureModel = require("../models/pictureModel");
const tagModel = require("../models/tagModel");
const suggestionService = require("../services/suggestionService");

module.exports = {
    getList: async (req, res, next) => {

        var list = await userModel.getList();
        var idList = [];
        list.forEach(element => {
            idList.push(element.id);
        });
        var tags = [];
        await idList.forEach(async element => {
            var result = await tagModel.getAllUserTags(element);
            tags.push({
                id: element,
                tags: result
            });
        });
        var allTags = await tagModel.findAllTags();
        var pictures = await pictureModel.getPicturesList(idList);
        return res.status(200).json({ list, pictures, tags, allTags });
    },

    getSuggestions: async (req, res, next) => {
        var user =  await userModel.findOne('id', req.params.uid);
        var gender = user[0].gender;
        var orientation = user[0].sexual_orientation;
        var range = suggestionService.getDistanceCoord(user[0].geo_lat, user[0].geo_long, 100);
        var list;

        switch (orientation) {
            case 'hetero':
                list = await userModel.getSuggestions(
                    gender == "man" ? 2 : 1,
                    gender == "man" ? 2 : 1,
                    1, 3, range, user[0].id
                );
                break;
            case 'homo':
                list = await userModel.getSuggestions(
                    gender == "man" ? 1 : 2,
                    gender == "man" ? 1 : 2,
                    1, 2, range, user[0].id
                );
                break;
            case 'bi':
                list = await userModel.getSuggestionsIfBi(
                    gender == "man" ? 1 : 2,
                    gender == "man" ? 2 : 1,
                    range, user[0].id
                );
                break;
        }        
        
        list = await suggestionService.getScoredList(list, user[0]);
        var idList = [];
        await list.forEach(element => {
            idList.push(element.id);
        });

        var tags = [];
        for (var i=0;i<idList.length;i++) {
            var result = await tagModel.getAllUserTags(idList[i]);
            await tags.push({
                id: idList[i],
                tags: result
            });
        }
        var allTags = await tagModel.findAllTags();
        return res.status(200).json({ list, tags, allTags });
    }
}