import repoBadges from "https://ryanthedev.vercel.app/scripts/arrays.js"; // Import the 'repoBadges' array

function badgeSearch(req, res) {
  try {
    const searchTerm = req.query.q;

    // Ensure that 'repoBadges' is an array and then filter it
    if (!Array.isArray(repoBadges)) {
      throw new Error("Repo badges data is not an array.");
    }

    const filteredBadge = repoBadges.filter((badge) =>
      badge.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Ensure that CORS is enabled
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(filteredBadge);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({
      message:
        "Please provide the 'q' query paramaters for searching the badges!",
    });
  }
}

export default badgeSearch;
