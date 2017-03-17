const Artist = require('../models/artist');

module.exports = () => {
  const minQuery = Artist
    .find({})
    .sort({ yearsActive: 1 })
    .limit(1)
    .then(artists => artists[0].yearsActive);
  const maxQuery = Artist
    .find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then(artists => artists[0].yearsActive);
  return Promise.all([ minQuery, maxQuery ])
    .then((result) => {
      return { min: result[0], max: result[1] }
    });
};
