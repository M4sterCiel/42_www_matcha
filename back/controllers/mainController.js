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
        var list;

        switch (orientation) {
            case 'hetero':
                list = await userModel.getSuggestions(
                    gender == "man" ? 2 : 1,
                    gender == "man" ? 2 : 1,
                    1, 3, user.id
                );
                break;
            case 'homo':
                list = await userModel.getSuggestions(
                    gender == "man" ? 1 : 2,
                    gender == "man" ? 1 : 2,
                    1, 2, user.id
                );
                break;
            case 'bi':
                list = await userModel.getSuggestionsIfBi(
                    gender == "man" ? 1 : 2,
                    gender == "man" ? 2 : 1,
                    user.id
                );
                break;
        }
        list = await suggestionService.getScoredList(list, user[0]);
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
    }
}