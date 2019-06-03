
exports.getUser = async function (query) {

    try {
        //var user = await User.find(query)
        var user = 'ralleman';
        return user;
    } catch (e) {
        throw Error('Error while Paginating Users')
    }
}
