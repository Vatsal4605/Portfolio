const pool = require('../config/database');

const getAllSkills = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT category, ARRAY_AGG(name) as skills
            FROM skills
            GROUP BY category
            ORDER BY category;
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSkillsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const result = await pool.query(`
            SELECT * FROM skills 
            WHERE category = $1 
            ORDER BY name;
        `, [category]);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching skills by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addSkill = async (req, res) => {
    try {
        const { category, name } = req.body;
        
        if (!category || !name) {
            return res.status(400).json({ error: 'Category and name are required' });
        }
        
        const result = await pool.query(`
            INSERT INTO skills (category, name)
            VALUES ($1, $2)
            RETURNING *;
        `, [category, name]);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, name } = req.body;
        
        if (!category || !name) {
            return res.status(400).json({ error: 'Category and name are required' });
        }
        
        const result = await pool.query(`
            UPDATE skills 
            SET category = $1, name = $2
            WHERE id = $3
            RETURNING *;
        `, [category, name, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllSkills,
    getSkillsByCategory,
    addSkill,
    updateSkill,
    deleteSkill
}; 