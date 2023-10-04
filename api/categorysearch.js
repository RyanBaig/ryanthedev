// api/search.js

// Assuming you have the array repoBadges defined in arrays.js
const repoBadges = require("../scripts/arrays.js");

module.exports = (req, res) => {
  // Get the query parameter "q" from the request
  const searchTerm = req.query.q;

  if (searchTerm != null) {
    const filteredCategory = repoBadges.filter((badge) =>
      badge.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Return the filtered results as JSON
    res.json(filteredCategory);
  } else {
    // If no search term is provided, return an empty JSON array
    res.json([]);
  }
};
