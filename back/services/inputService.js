var userModel = require("../models/userModel");

module.exports = {
  lastname: data => {
    if (data == null) return { error: "missing parameter" };
    if (data.length < 2 || data.length > 20) return { error: "incorrect size" };
    else return { status: "valid" };
  },

  firstname: data => {
    if (data == null) return { error: "missing parameter" };
    if (data.length < 2 || data.length > 20) return { error: "incorrect size" };
    else return { status: "valid" };
  },

  username: async data => {
    if (data == null) return { error: "missing parameter" };
    if (data.length < 2 || data.length > 20) return { error: "incorrect size" };

    //Check db for already existing username
    var result = await userModel.findOne("username", data);
    if (result != "") return { error: "already exists" };
    else return { status: "valid" };
  },

  mail: async data => {
    if (data == null) return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "spaces are forbidden" };
    //Check pattern
    var mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;
    if (!mailPattern.test(data)) return { error: "doesn't match pattern" };
    //Check db for already existing mail
    var result = await userModel.findOne("mail", data);
    if (result != "") return { error: "already exists" };
    else return { status: "valid" };
  },

  password: data => {
    if (data == null) return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "spaces are forbidden" };
    //Check pattern
    var pwdPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    if (!pwdPattern.test(data)) return { error: "doesn't match pattern" };
    else return { status: "valid" };
  }
};
