const userModel = require("../models/userModel");
const pictureModel = require("../models/pictureModel");
const tagModel = require("../models/tagModel");
const likeModel = require("../models/likeModel");


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
    }
}