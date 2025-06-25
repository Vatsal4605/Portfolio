const pool = require('../config/database');
const { isValidEmail } = require('../utils/validation');

const submitMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const result = await pool.query(`
            INSERT INTO contact_messages (name, email, message)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, email, message]);
        
        res.status(201).json({
            message: 'Message sent successfully!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error submitting contact message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM contact_messages 
            ORDER BY created_at DESC;
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT * FROM contact_messages 
            WHERE id = $1;
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching contact message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(`
            DELETE FROM contact_messages 
            WHERE id = $1 
            RETURNING *;
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    submitMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
}; 