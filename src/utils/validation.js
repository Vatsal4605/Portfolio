const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateProjectData = (data) => {
    const errors = [];
    
    if (!data.title || data.title.trim().length === 0) {
        errors.push('Project title is required');
    }
    
    if (!data.description || data.description.trim().length === 0) {
        errors.push('Project description is required');
    }
    
    return errors;
};

const validateProfileData = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length === 0) {
        errors.push('Name is required');
    }
    
    if (!data.title || data.title.trim().length === 0) {
        errors.push('Title is required');
    }
    
    if (!data.bio || data.bio.trim().length === 0) {
        errors.push('Bio is required');
    }
    
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    return errors;
};

module.exports = {
    isValidEmail,
    validateProjectData,
    validateProfileData
}; 