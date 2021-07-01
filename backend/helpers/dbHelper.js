const mongoose = require("mongoose");
const constants = require("../constants");

module.exports.formatMongoData = (data) => {
  //checks to see if it is an array or array of objects
  if (Array.isArray(data)) {
    let newDataList = [];

    //foreach loop: foreach value of the data passed
    for (value of data) {
      newDataList.push(value.toObject());
    }
    return newDataList;
  }
  return data.toObject();
};

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
};
