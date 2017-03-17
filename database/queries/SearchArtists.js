const Artist = require('../models/artist');

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist
    .find(buildQuery(criteria))
    .sort({ [sortProperty] : 1 })
    .skip(offset)
    .limit(limit)

  return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
  .then((results) => {
    return {
      all: results[0],
      count: results[1],
      offset: offset,
      limit: limit
    }
  });
};

const buildQuery = (criteria) => {
  const query = {};

  if(criteria.name) {
    query.$text = { $search: criteria.name }
  }

  if(criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }

  if(criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }

  return query;
};
