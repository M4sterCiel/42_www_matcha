var notifModel = require("../models/notifModel");

module.exports = {
    alreadyVisited: async (user_id, target_id) => {
        var result = await notifModel.alreadyExists('visit', user_id, target_id);
        return (result.length > 0 ? true : false);
    }
}