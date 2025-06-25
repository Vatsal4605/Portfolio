// API Configuration
const API_BASE_URL = '/api';

// Global state
let portfolioData = {
    profile: null,
    projects: [],
    skills: [],
    isAdmin: false,
    adminToken: null
};

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const loadingScreen = document.getElementById('loadingScreen');
const adminPanelBtn = document.getElementById('adminPanelBtn');

// Initialize the application
async function initApp() {
    try {
        // Show loading screen
        showLoading();
        
        // Load all data
        await Promise.all([
            loadProfile(),
            loadProjects(),
            loadSkills()
        ]);
        
        // Render the content
        renderPortfolio();
        
        // Hide loading screen
        hideLoading();
        
        // Initialize UI components
        initUI();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Error loading portfolio data', 'error');
        hideLoading();
    }
}

// API Functions
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    if (portfolioData.adminToken) {
        config.headers.Authorization = `Bearer ${portfolioData.adminToken}`;
    }
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
}

async function loadProfile() {
    try {
        portfolioData.profile = await fetchAPI('/profile');
    } catch (error) {
        console.error('Error loading profile:', error);
        // Set default profile data for Vatsal Garg
        portfolioData.profile = {
            name: 'Vatsal Garg',
            title: 'An aspiring AI/ML engineer from UPES Dehradun',
            bio: 'I\'m Vatsal Garg, a passionate student from Lucknow, currently pursuing a BCA in AI/ML at UPES Dehradun. I enjoy playing video games and listening to music in my free time, and I\'m always eager to explore new technologies and improve my skills.',
            email: 'vatsal.garg@email.com',
            phone: '+91 (555) 123-4567',
            location: 'Lucknow, Uttar Pradesh',
            profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            github_url: 'https://github.com/Vatsal4605',
            linkedin_url: 'https://www.linkedin.com/in/vatsalgarg4605',
            twitter_url: '',
            instagram_url: ''
        };
    }
}

async function loadProjects() {
    try {
        portfolioData.projects = await fetchAPI('/projects');
    } catch (error) {
        console.error('Error loading projects:', error);
        // Set default projects for Vatsal Garg
        portfolioData.projects = [
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
    }
}

async function loadSkills() {
    try {
        portfolioData.skills = await fetchAPI('/skills');
    } catch (error) {
        console.error('Error loading skills:', error);
        // Set default skills for Vatsal Garg
        portfolioData.skills = [
            {
                category: 'Programming',
                skills: ['Python', 'Java', 'C++', 'JavaScript']
            },
            {
                category: 'AI/ML',
                skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'Natural Language Processing']
            },
            {
                category: 'Web Development',
                skills: ['HTML5', 'CSS3', 'React', 'Node.js']
            },
            {
                category: 'Database',
                skills: ['MySQL', 'MongoDB', 'PostgreSQL']
            },
            {
                category: 'Tools',
                skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab']
            }
        ];
    }
}

// Render Functions
function renderPortfolio() {
    renderProfile();
    renderProjects();
    renderSkills();
    renderContact();
    updatePageTitle();
}

function renderProfile() {
    if (!portfolioData.profile) return;
    
    const profile = portfolioData.profile;
    
    // Update hero section
    document.getElementById('heroName').textContent = profile.name;
    document.getElementById('heroTitle').textContent = profile.title;
    document.getElementById('heroDescription').textContent = profile.bio;
    document.getElementById('heroImage').src = profile.profile_image;
    document.getElementById('heroImage').alt = profile.name;
    
    // Update about section
    document.getElementById('aboutBio').textContent = profile.bio;
    document.getElementById('aboutImage').src = profile.profile_image;
    document.getElementById('aboutImage').alt = profile.name;
    
    // Update navigation logo
    document.getElementById('navLogo').textContent = profile.name.split(' ').map(n => n[0]).join('');
    
    // Update footer
    document.getElementById('footerName').textContent = profile.name;
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (portfolioData.projects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-projects">No projects available at the moment.</p>';
        return;
    }
    
    projectsGrid.innerHTML = portfolioData.projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image_url}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies ? project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('') : ''}
                </div>
                <div class="project-links">
                    ${project.live_url && project.live_url !== '#' ? `
                        <a href="${project.live_url}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                    ${project.github_url ? `
                        <a href="${project.github_url}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> Code
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (portfolioData.skills.length === 0) {
        skillsGrid.innerHTML = '<p class="no-skills">No skills available at the moment.</p>';
        return;
    }
    
    skillsGrid.innerHTML = portfolioData.skills.map(category => `
        <div class="skill-category">
            <h4>${category.category}</h4>
            <div class="skill-tags">
                ${category.skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

function renderContact() {
    if (!portfolioData.profile) return;
    
    const profile = portfolioData.profile;
    
    // Render contact details
    const contactDetails = document.getElementById('contactDetails');
    contactDetails.innerHTML = `
        ${profile.email ? `
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>${profile.email}</span>
            </div>
        ` : ''}
        ${profile.phone ? `
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>${profile.phone}</span>
            </div>
        ` : ''}
        ${profile.location ? `
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${profile.location}</span>
            </div>
        ` : ''}
    `;
    
    // Render social links
    const socialLinks = document.getElementById('socialLinks');
    socialLinks.innerHTML = `
        ${profile.github_url ? `
            <a href="${profile.github_url}" class="social-link" target="_blank">
                <i class="fab fa-github"></i>
            </a>
        ` : ''}
        ${profile.linkedin_url ? `
            <a href="${profile.linkedin_url}" class="social-link" target="_blank">
                <i class="fab fa-linkedin"></i>
            </a>
        ` : ''}
        ${profile.twitter_url ? `
            <a href="${profile.twitter_url}" class="social-link" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
        ` : ''}
        ${profile.instagram_url ? `
            <a href="${profile.instagram_url}" class="social-link" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
        ` : ''}
    `;
}

function updatePageTitle() {
    if (portfolioData.profile) {
        document.title = `${portfolioData.profile.name} - Portfolio`;
    }
}

// UI Functions
function showLoading() {
    loadingScreen.style.display = 'flex';
}

function hideLoading() {
    loadingScreen.style.display = 'none';
}

function initUI() {
    // Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);

    // Contact Form
    contactForm.addEventListener('submit', handleContactSubmit);

    // Admin Panel Button
    adminPanelBtn.addEventListener('click', showAdminLogin);

    // Initialize animations
    initAnimations();
}

// Theme Functions
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Contact Form Functions
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        await fetchAPI('/contact', {
            method: 'POST',
            body: JSON.stringify({ name, email, message })
        });
        
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Error sending message. Please try again.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Admin Functions
function showAdminLogin() {
    const username = prompt('Enter admin username:');
    if (!username) return;
    
    const password = prompt('Enter admin password:');
    if (!password) return;
    
    loginAdmin(username, password);
}

async function loginAdmin(username, password) {
    try {
        const response = await fetchAPI('/admin/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        portfolioData.adminToken = response.token;
        portfolioData.isAdmin = true;
        
        showNotification('Admin login successful!', 'success');
        showAdminPanel();
    } catch (error) {
        console.error('Admin login error:', error);
        showNotification('Invalid admin credentials', 'error');
    }
}

function showAdminPanel() {
    const panel = document.createElement('div');
    panel.className = 'admin-panel';
    panel.innerHTML = `
        <div class="admin-panel-content">
            <div class="admin-panel-header">
                <h2>Admin Panel</h2>
                <button class="close-btn" onclick="closeAdminPanel()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-panel-body">
                <div class="admin-section">
                    <h3>Quick Actions</h3>
                    <button onclick="editProfile()" class="admin-btn">Edit Profile</button>
                    <button onclick="addProject()" class="admin-btn">Add Project</button>
                    <button onclick="viewMessages()" class="admin-btn">View Messages</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
}

function closeAdminPanel() {
    const panel = document.querySelector('.admin-panel');
    if (panel) {
        panel.remove();
    }
}

function editProfile() {
    // Implementation for profile editing
    alert('Profile editing feature coming soon!');
}

function addProject() {
    // Implementation for adding projects
    alert('Project adding feature coming soon!');
}

function viewMessages() {
    // Implementation for viewing messages
    alert('Message viewing feature coming soon!');
}

// Animation Functions
function initAnimations() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Utility Functions
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 