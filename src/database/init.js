const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../../config.env') });
const pool = require('../config/database');

const initDatabase = async () => {
    try {
        // Create tables
        await pool.query(`
            CREATE TABLE IF NOT EXISTS profile (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                title VARCHAR(200) NOT NULL,
                bio TEXT NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                location VARCHAR(100),
                profile_image VARCHAR(500),
                github_url VARCHAR(200),
                linkedin_url VARCHAR(200),
                twitter_url VARCHAR(200),
                instagram_url VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                category VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                image_url VARCHAR(500),
                live_url VARCHAR(200),
                github_url VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS project_technologies (
                id SERIAL PRIMARY KEY,
                project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
                technology VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert Vatsal Garg's profile data
        await pool.query(`
            INSERT INTO profile (name, title, bio, email, phone, location, profile_image, github_url, linkedin_url, twitter_url, instagram_url)
            VALUES (
                'Vatsal Garg',
                'An aspiring AI/ML engineer from UPES Dehradun',
                'I''m Vatsal Garg, a passionate student from Lucknow, currently pursuing a BCA in AI/ML at UPES Dehradun. I enjoy playing video games and listening to music in my free time, and I''m always eager to explore new technologies and improve my skills.',
                'vatsal.garg@email.com',
                '+91 (555) 123-4567',
                'Lucknow, Uttar Pradesh',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                'https://github.com/Vatsal4605',
                'https://www.linkedin.com/in/vatsalgarg4605',
                '',
                ''
            ) ON CONFLICT DO NOTHING;
        `);

        // Insert AI/ML focused skills
        const skills = [
            ['Programming', 'Python'],
            ['Programming', 'Java'],
            ['Programming', 'C++'],
            ['Programming', 'JavaScript'],
            ['AI/ML', 'Machine Learning'],
            ['AI/ML', 'Deep Learning'],
            ['AI/ML', 'Neural Networks'],
            ['AI/ML', 'TensorFlow'],
            ['AI/ML', 'PyTorch'],
            ['AI/ML', 'Scikit-learn'],
            ['AI/ML', 'Computer Vision'],
            ['AI/ML', 'Natural Language Processing'],
            ['Web Development', 'HTML5'],
            ['Web Development', 'CSS3'],
            ['Web Development', 'React'],
            ['Web Development', 'Node.js'],
            ['Database', 'MySQL'],
            ['Database', 'MongoDB'],
            ['Database', 'PostgreSQL'],
            ['Tools', 'Git'],
            ['Tools', 'GitHub'],
            ['Tools', 'VS Code'],
            ['Tools', 'Jupyter Notebook'],
            ['Tools', 'Google Colab']
        ];

        for (const [category, name] of skills) {
            await pool.query(`
                INSERT INTO skills (category, name)
                VALUES ($1, $2) ON CONFLICT DO NOTHING;
            `, [category, name]);
        }

        // Insert placeholder projects for Vatsal
        const projects = [
            {
                title: 'AI Chatbot Assistant',
                description: 'An intelligent chatbot powered by natural language processing and machine learning algorithms. Features include context awareness, sentiment analysis, and multi-language support.',
                image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
                live_url: '#',
                github_url: 'https://github.com/Vatsal4605',
                technologies: ['Python', 'TensorFlow', 'NLP', 'Flask']
            },
            {
                title: 'Machine Learning Model for Image Classification',
                description: 'A deep learning model that can classify images into different categories using convolutional neural networks (CNN). Trained on a large dataset with high accuracy.',
                image_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
                live_url: '#',
                github_url: 'https://github.com/Vatsal4605',
                technologies: ['Python', 'PyTorch', 'CNN', 'Computer Vision']
            },
            {
                title: 'Data Analysis Dashboard',
                description: 'An interactive dashboard for visualizing and analyzing large datasets. Features include real-time data processing, interactive charts, and predictive analytics.',
                image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
                live_url: '#',
                github_url: 'https://github.com/Vatsal4605',
                technologies: ['Python', 'Pandas', 'Matplotlib', 'Streamlit']
            },
            {
                title: 'Coming Soon - AI Project',
                description: 'An exciting new AI project is in development. Stay tuned for updates on this innovative machine learning application.',
                image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
                live_url: '#',
                github_url: 'https://github.com/Vatsal4605',
                technologies: ['AI/ML', 'Coming Soon']
            }
        ];

        for (const project of projects) {
            const result = await pool.query(`
                INSERT INTO projects (title, description, image_url, live_url, github_url)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `, [project.title, project.description, project.image_url, project.live_url, project.github_url]);

            const projectId = result.rows[0].id;

            for (const tech of project.technologies) {
                await pool.query(`
                    INSERT INTO project_technologies (project_id, technology)
                    VALUES ($1, $2);
                `, [projectId, tech]);
            }
        }

        // Insert admin user (password: admin123)
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await pool.query(`
            INSERT INTO admin_users (username, password_hash, email)
            VALUES ('admin', $1, 'admin@portfolio.com') ON CONFLICT DO NOTHING;
        `, [hashedPassword]);

        console.log('Database initialized successfully with Vatsal Garg\'s information!');
        console.log('Admin credentials:');
        console.log('Username: admin');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await pool.end();
    }
};

// Run the initialization
initDatabase(); 