const pool = require('../config/database');
const { validateProjectData } = require('../utils/validation');

const getAllProjects = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, 
                   ARRAY_AGG(pt.technology) as technologies
            FROM projects p
            LEFT JOIN project_technologies pt ON p.id = pt.project_id
            GROUP BY p.id
            ORDER BY p.created_at DESC;
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT p.*, 
                   ARRAY_AGG(pt.technology) as technologies
            FROM projects p
            LEFT JOIN project_technologies pt ON p.id = pt.project_id
            WHERE p.id = $1
            GROUP BY p.id;
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description, image_url, live_url, github_url, technologies } = req.body;
        
        // Validate input
        const errors = validateProjectData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const result = await pool.query(`
            INSERT INTO projects (title, description, image_url, live_url, github_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, description, image_url, live_url, github_url]);
        
        const projectId = result.rows[0].id;
        
        // Add technologies
        if (technologies && technologies.length > 0) {
            for (const tech of technologies) {
                await pool.query(`
                    INSERT INTO project_technologies (project_id, technology)
                    VALUES ($1, $2);
                `, [projectId, tech]);
            }
        }
        
        // Fetch the complete project with technologies
        const completeProject = await pool.query(`
            SELECT p.*, 
                   ARRAY_AGG(pt.technology) as technologies
            FROM projects p
            LEFT JOIN project_technologies pt ON p.id = pt.project_id
            WHERE p.id = $1
            GROUP BY p.id;
        `, [projectId]);
        
        res.status(201).json(completeProject.rows[0]);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image_url, live_url, github_url, technologies } = req.body;
        
        // Validate input
        const errors = validateProjectData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        await pool.query(`
            UPDATE projects 
            SET title = $1, description = $2, image_url = $3, live_url = $4, github_url = $5, updated_at = CURRENT_TIMESTAMP
            WHERE id = $6;
        `, [title, description, image_url, live_url, github_url, id]);
        
        // Remove existing technologies
        await pool.query('DELETE FROM project_technologies WHERE project_id = $1', [id]);
        
        // Add new technologies
        if (technologies && technologies.length > 0) {
            for (const tech of technologies) {
                await pool.query(`
                    INSERT INTO project_technologies (project_id, technology)
                    VALUES ($1, $2);
                `, [id, tech]);
            }
        }
        
        // Fetch updated project
        const result = await pool.query(`
            SELECT p.*, 
                   ARRAY_AGG(pt.technology) as technologies
            FROM projects p
            LEFT JOIN project_technologies pt ON p.id = pt.project_id
            WHERE p.id = $1
            GROUP BY p.id;
        `, [id]);
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete project (technologies will be deleted due to CASCADE)
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}; 