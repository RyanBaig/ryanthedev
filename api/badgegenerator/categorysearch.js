import repoBadges from "./arrays.js"; // Import the 'repoBadges' array

function categorySearch(req, res) {
  try {
    const searchTerm = req.query.q;

    // Ensure that 'repoBadges' is an array and then filter it
    if (!Array.isArray(repoBadges)) {
      throw new Error("Repo badges data is not an array.");
    }

    const filteredCategory = repoBadges.filter((badge) =>
      badge.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Ensure that CORS is enabled
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(filteredCategory);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({
      message:
        "Please provide the 'q' query paramaters for searching the badges' categories!",
    });
  }
}

export default categorySearch;
