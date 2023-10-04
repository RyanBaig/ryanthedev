module.exports = (req, res) => {
    const searchTerm = req.query.q;

    const filteredCategory = arrays.repoBadges.filter((badge) =>
      badge.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json(filteredCategory);
}