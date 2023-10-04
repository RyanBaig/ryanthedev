import repoBadges from "../../scripts/arrays.js"; // Import the 'repoBadges' array

module.exports = (req, res) => {
  try {
    const searchTerm = req.query.q;

    // Ensure that 'repoBadges' is an array and then filter it
    if (!Array.isArray(repoBadges)) {
      throw new Error("Repo badges data is not an array.");
    }

    const filteredBadge = repoBadges.filter((badge) =>
      badge.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json(filteredBadge);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
