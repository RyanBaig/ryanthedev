// Import necessary libraries if needed
// const axios = require('axios'); // Example import
const arrays = require('../../scripts/arrays.js');
exports.handler = async (event) => {
  try {
    // Get the query parameter "q" from the event object
    const searchTerm = event.queryStringParameters.q;

    if (searchTerm != null) {
      // Assuming you have the array repoBadges defined in arrays.js
      const filteredCategory = repoBadges.filter((badge) =>
        badge.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Return a clean JSON response
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredCategory),
      };
    } else {
      // If no search term is provided, return an empty JSON array
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      };
    }
  } catch (error) {
    // Handle any errors gracefully
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
