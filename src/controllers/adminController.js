const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        const result = await pool.query(`
            SELECT * FROM admin_users 
            WHERE username = $1;
        `, [username]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const [profileCount, projectsCount, skillsCount, messagesCount] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM profile'),
            pool.query('SELECT COUNT(*) FROM projects'),
            pool.query('SELECT COUNT(*) FROM skills'),
            pool.query('SELECT COUNT(*) FROM contact_messages')
        ]);
        
        res.json({
            stats: {
                profile: parseInt(profileCount.rows[0].count),
                projects: parseInt(projectsCount.rows[0].count),
                skills: parseInt(skillsCount.rows[0].count),
                messages: parseInt(messagesCount.rows[0].count)
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getRecentMessages = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM contact_messages 
            ORDER BY created_at DESC 
            LIMIT 10;
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching recent messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password are required' });
        }
        
        // Get current user
        const userResult = await pool.query(`
            SELECT * FROM admin_users 
            WHERE id = $1;
        `, [req.user.id]);
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const user = userResult.rows[0];
        
        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        
        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        
        // Update password
        await pool.query(`
            UPDATE admin_users 
            SET password_hash = $1 
            WHERE id = $2;
        `, [newPasswordHash, req.user.id]);
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    login,
    getDashboardStats,
    getRecentMessages,
    changePassword
}; 