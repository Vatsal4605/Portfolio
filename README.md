# Dynamic Portfolio Website

A modern, dynamic portfolio website built with Node.js, Express, and PostgreSQL. Features a clean, responsive design with an admin panel for easy content management.

## 🚀 Features

- **Dynamic Content**: All content is loaded from a PostgreSQL database
- **Admin Panel**: Secure admin interface for managing portfolio content
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Updates**: Changes reflect immediately without rebuilding
- **Contact Form**: Functional contact form with database storage
- **JWT Authentication**: Secure admin authentication
- **Clean Architecture**: Well-organized, maintainable codebase

## 📁 Project Structure

```
Portfolio/
├── src/                          # Source code
│   ├── config/                   # Configuration files
│   │   └── database.js          # Database connection
│   ├── controllers/             # Route controllers
│   │   ├── adminController.js   # Admin operations
│   │   ├── contactController.js # Contact form handling
│   │   ├── profileController.js # Profile management
│   │   ├── projectController.js # Project CRUD operations
│   │   └── skillController.js   # Skills management
│   ├── database/                # Database setup
│   │   ├── db.js               # Database connection (legacy)
│   │   └── init.js             # Database initialization
│   ├── middleware/              # Express middleware
│   │   └── auth.js             # JWT authentication
│   ├── routes/                  # API routes
│   │   ├── admin.js            # Admin routes
│   │   ├── contact.js          # Contact routes
│   │   ├── profile.js          # Profile routes
│   │   ├── projects.js         # Project routes
│   │   └── skills.js           # Skill routes
│   └── utils/                   # Utility functions
│       └── validation.js       # Input validation
├── public/                      # Static files
│   ├── assets/                  # Assets directory
│   │   ├── css/                # Stylesheets
│   │   │   └── styles.css      # Main stylesheet
│   │   ├── js/                 # JavaScript files
│   │   │   └── script.js       # Frontend logic
│   │   └── images/             # Image assets
│   └── index.html              # Main HTML file
├── config.env                   # Environment variables
├── package.json                 # Dependencies and scripts
├── server.js                    # Main server file
├── setup.js                     # Setup script
└── README.md                    # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Create environment file**
   Create a `config.env` file in the root directory:
   ```env
   DB_USER=postgres
   DB_PASSWORD=0000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=portfolio_db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3000
   ```

3. **Run the setup script**
   ```bash
   npm run setup
   ```
   This will:
   - Install dependencies
   - Initialize the database
   - Set up default content

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access your portfolio**
   - Portfolio: http://localhost:3000
   - Admin Panel: Click the gear icon (⚙️) in the bottom-right corner

## 🔧 Configuration

### Database Setup

The setup script will automatically:
- Create the database if it doesn't exist
- Create all necessary tables
- Insert default content for Vatsal Garg

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

⚠️ **Important**: Change these credentials after first login for security!

### Customizing Content

1. **Profile Information**: Update in `src/database/init.js`
2. **Projects**: Add/remove projects in the admin panel
3. **Skills**: Manage skills through the admin panel
4. **Styling**: Modify `public/assets/css/styles.css`

## 📚 API Endpoints

### Public Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/contact` - Submit contact message

### Protected Endpoints (Admin Only)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/messages/recent` - Get recent messages
- `PUT /api/admin/change-password` - Change admin password
- `PUT /api/profile` - Update profile
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/skills` - Add skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/contact` - Get all messages
- `DELETE /api/contact/:id` - Delete message

## 🎨 Customization

### Adding New Features

1. **New API Endpoint**:
   - Create controller in `src/controllers/`
   - Create route in `src/routes/`
   - Add to `server.js`

2. **New Frontend Feature**:
   - Add HTML in `public/index.html`
   - Add styles in `public/assets/css/styles.css`
   - Add logic in `public/assets/js/script.js`

3. **Database Changes**:
   - Update schema in `src/database/init.js`
   - Add migration scripts if needed

### Styling

The project uses a modern CSS architecture with:
- CSS Custom Properties for theming
- Flexbox and Grid for layouts
- Mobile-first responsive design
- Smooth animations and transitions

## 🔒 Security

- JWT-based authentication for admin access
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Production Setup

1. **Environment Variables**:
   - Use strong JWT secret
   - Configure production database
   - Set appropriate CORS origins

2. **Database**:
   - Use production PostgreSQL instance
   - Set up proper backups
   - Configure connection pooling

3. **Server**:
   - Use PM2 or similar process manager
   - Set up reverse proxy (nginx)
   - Configure SSL certificates

### Deployment Options

- **Heroku**: Easy deployment with PostgreSQL addon
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2 with RDS
- **Vercel**: Frontend deployment with API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Vatsal Garg**
- BCA in AI/ML at UPES Dehradun
- Location: Lucknow, Uttar Pradesh
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- PostgreSQL community
- Express.js team 