const Artist = require('../models/artist');

module.exports = (_id) => {
  return Artist.findByIdAndRemove(_id)
};
