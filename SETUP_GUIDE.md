# Setup Guide for Vatsal Garg's Portfolio Website

## Quick Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Step 1: Database Setup

1. **Install PostgreSQL** (if not already installed)
   - Download from: https://www.postgresql.org/download/
   - During installation, note down the password you set for the `postgres` user

2. **Create Database**
   ```bash
   # Open PostgreSQL command prompt
   psql -U postgres
   
   # Create the database
   CREATE DATABASE portfolio_db;
   
   # Exit PostgreSQL
   \q
   ```

### Step 2: Environment Configuration

1. **Verify config.env file exists** (should already be created)
   ```env
   DB_USER=postgres
   DB_PASSWORD=0000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=portfolio_db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3000
   ```

2. **Update the password** in `config.env` if your PostgreSQL password is different from `0000`

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Initialize Database

```bash
npm run init-db
```

This will:
- Create all necessary tables
- Insert Vatsal Garg's profile information
- Add AI/ML focused skills
- Create sample projects
- Set up admin user

### Step 5: Start the Application

```bash
npm run dev
```

### Step 6: Access the Website

- **Portfolio**: http://localhost:3000
- **Admin Panel**: Click the gear icon (⚙️) in the bottom-right corner
- **Admin Login**: 
  - Username: `admin`
  - Password: `admin123`

## Vatsal Garg's Portfolio Features

### Personal Information
- **Name**: Vatsal Garg
- **Location**: Lucknow, Uttar Pradesh
- **Education**: BCA in AI/ML at UPES Dehradun
- **Focus**: AI/ML Engineering

### Skills Categories
- **Programming**: Python, Java, C++, JavaScript
- **AI/ML**: Machine Learning, Deep Learning, Neural Networks, TensorFlow, PyTorch, Scikit-learn, Computer Vision, NLP
- **Web Development**: HTML5, CSS3, React, Node.js
- **Database**: MySQL, MongoDB, PostgreSQL
- **Tools**: Git, GitHub, VS Code, Jupyter Notebook, Google Colab

### Sample Projects
1. **AI Chatbot Assistant** - NLP-powered chatbot
2. **Machine Learning Model for Image Classification** - CNN-based image classifier
3. **Data Analysis Dashboard** - Interactive data visualization
4. **Coming Soon - AI Project** - Placeholder for future projects

### Contact Information
- **Email**: vatsal.garg@email.com
- **GitHub**: https://github.com/Vatsal4605
- **LinkedIn**: https://www.linkedin.com/in/vatsalgarg4605

## Admin Panel Features

### Available Actions
- **Edit Profile**: Update personal information, bio, and social links
- **Manage Projects**: Add, edit, or delete projects
- **Manage Skills**: Add, edit, or delete skills
- **View Messages**: Read and manage contact form submissions
- **Change Password**: Update admin password

### Security Note
⚠️ **Important**: Change the default admin password (`admin123`) after first login for security.

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Verify credentials in `config.env`
3. Check if database `portfolio_db` exists
4. Ensure port 5432 is not blocked

### Port Issues
- If port 3000 is in use, change `PORT` in `config.env`
- Or kill the process using port 3000

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Customization

### Updating Personal Information
1. Use the admin panel to update profile information
2. Or directly edit the database using PostgreSQL commands
3. Or modify the `database/init.js` file and re-run initialization

### Adding New Projects
1. Use the admin panel (when fully implemented)
2. Or add directly to the database
3. Or modify the default projects in `public/script.js`

### Styling Changes
- Edit `public/styles.css` for visual changes
- The site uses CSS variables for easy theming
- Dark mode is supported

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
DB_USER=your_production_user
DB_PASSWORD=your_secure_password
DB_HOST=your_production_host
DB_PORT=5432
DB_NAME=portfolio_db
JWT_SECRET=your_very_secure_jwt_secret
PORT=3000
```

### Security Checklist
- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper database backups
- [ ] Configure firewall rules
- [ ] Use environment variables for sensitive data

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Check the console for error messages
4. Ensure PostgreSQL is running and accessible

## File Structure

```
Portfolio/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── script.js          # Frontend JavaScript
├── routes/                # API routes
│   ├── profile.js         # Profile management
│   ├── projects.js        # Project management
│   ├── skills.js          # Skills management
│   ├── contact.js         # Contact form handling
│   └── admin.js           # Admin authentication
├── database/              # Database files
│   ├── db.js             # Database connection
│   └── init.js           # Database initialization
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
├── config.env            # Environment variables
├── setup.js              # Setup script
├── create-db.sql         # Database creation script
└── README.md             # Main documentation
``` 