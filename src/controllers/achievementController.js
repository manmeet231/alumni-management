const db = require('../db/database');

const getAchievements = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM achievements WHERE user_id = $1",
            [req.session.user.user_id]
        );
        const achievements = result.rows.reverse();
        res.render("achievements.ejs", { achievements });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).send('Error fetching achievements');
    }
};

const addAchievement = async (req, res) => {
    try {
        const { name, org, description, month, year } = req.body;
        const user_id = req.session.user.user_id;

        await db.query(
            "INSERT INTO achievements (user_id, name, org, description, month, year) VALUES ($1, $2, $3, $4, $5, $6)",
            [user_id, name, org, description, month, year]
        );
        res.redirect("/achievements");
    } catch (error) {
        console.error('Error adding achievement:', error);
        res.status(500).send('Error adding achievement');
    }
};

module.exports = {
    getAchievements,
    addAchievement
}; 