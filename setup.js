const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Dynamic Portfolio Website...\n');

// Check if config.env exists
if (!fs.existsSync('config.env')) {
    console.log('❌ config.env file not found!');
    console.log('Please create a config.env file with the following content:');
    console.log(`
DB_USER=postgres
DB_PASSWORD=0000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
    `);
    process.exit(1);
}

// Check if PostgreSQL is running
console.log('📊 Checking PostgreSQL connection...');
exec('psql --version', (error, stdout, stderr) => {
    if (error) {
        console.log('❌ PostgreSQL is not installed or not in PATH');
        console.log('Please install PostgreSQL and make sure it\'s running');
        process.exit(1);
    }
    
    console.log('✅ PostgreSQL is available');
    
    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    exec('npm install', (error, stdout, stderr) => {
        if (error) {
            console.log('❌ Error installing dependencies:', error.message);
            process.exit(1);
        }
        
        console.log('✅ Dependencies installed successfully');
        
        // Initialize database
        console.log('\n🗄️  Initializing database...');
        exec('node src/database/init.js', (error, stdout, stderr) => {
            if (error) {
                console.log('❌ Error initializing database:', error.message);
                console.log('Make sure PostgreSQL is running and the credentials in config.env are correct');
                process.exit(1);
            }
            
            console.log('✅ Database initialized successfully');
            
            console.log('\n🎉 Setup completed successfully!');
            console.log('\n📋 Next steps:');
            console.log('1. Start the server: npm run dev');
            console.log('2. Open http://localhost:3000 in your browser');
            console.log('3. Click the gear icon (⚙️) in the bottom-right corner to access admin panel');
            console.log('4. Login with username: admin, password: admin123');
            console.log('5. Change the admin password for security');
            console.log('\n🔧 Default admin credentials:');
            console.log('   Username: admin');
            console.log('   Password: admin123');
            console.log('\n⚠️  Remember to change these credentials after first login!');
        });
    });
}); 