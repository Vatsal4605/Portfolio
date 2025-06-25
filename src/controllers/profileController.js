const pool = require('../config/database');
const { validateProfileData } = require('../utils/validation');

const getProfile = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM profile ORDER BY id DESC LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            name, title, bio, email, phone, location,
            profile_image, github_url, linkedin_url, twitter_url, instagram_url
        } = req.body;

        // Validate input
        const errors = validateProfileData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await pool.query(`
            UPDATE profile 
            SET name = $1, title = $2, bio = $3, email = $4, phone = $5, location = $6,
                profile_image = $7, github_url = $8, linkedin_url = $9, twitter_url = $10, instagram_url = $11,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = (SELECT id FROM profile ORDER BY id DESC LIMIT 1)
            RETURNING *;
        `, [name, title, bio, email, phone, location, profile_image, github_url, linkedin_url, twitter_url, instagram_url]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getProfile,
    updateProfile
}; 