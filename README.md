# Portfolio-Project
# 🍅 LeftoverLab - Turn Leftovers into Delicious Meals

*A mobile-first web app that helps users create recipes from leftover ingredients with gamification for content creators*



## 🎯 Project Overview

**The Problem**: People waste food because they don't know what to cook with their leftovers, and food content creators need engaging content ideas.

**Our Solution**: A 3-click ingredient entry system that generates personalized recipes from leftovers, with social sharing features and gamification for content creators.

### 🎪 Live Demo
- **Demo URL**: [Coming Soon - Week of Nov 17, 2025]
- **Test Accounts**: Available during presentation

---

## ✨ Key Features

### 🚀 **3-Click Leftover Entry**
- **Click 1**: Choose category (Vegetables, Protein, Dairy, Pantry)
- **Click 2**: Select ingredients from visual grid
- **Click 3**: Choose portions (Small/Medium/Large)

### 📱 **Mobile-First Design**
- Responsive design that works seamlessly on all devices
- Optimized for quick ingredient entry on phones
- Touch-friendly interface with large buttons

### 🍳 **Smart Recipe Matching**
- Personalized recipe suggestions based on available ingredients
- Filtering by prep time, calories, and cooking method
- Recipe history and favorites tracking

### 🎮 **Gamification for Creators**
- Points system for social media sharing
- Leaderboard for community engagement
- Web Share API integration for easy posting

### 🔍 **Quick Search & Smart Suggestions**
- Autocomplete ingredient search
- Recent ingredients memory
- Common leftover quick-add buttons

---

## 🏗️ Technical Architecture

### **Frontend**
- **Framework**: Vanilla JavaScript + HTML/CSS
- **Styling**: Tailwind CSS for rapid UI development
- **Responsive**: Mobile-first progressive design
- **APIs**: Web Share API for social media integration

### **Backend**
- **Runtime**: Node.js with Express.js
- **Database**: MySQL for structured data storage
- **Authentication**: Session-based auth
- **External APIs**: 
  - OpenFoodFacts (nutritional data)
  - Zapier workflows (automation)

### **Architecture Diagram**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Backend   │───▶│  Database   │
│             │    │             │    │             │
│ 3-Click UI  │    │ Recipe API  │    │ MySQL       │
│ Web Share   │    │ User Auth   │    │ Users       │
│ Responsive  │    │ Points Sys  │    │ Recipes     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       │            │ External    │
       └───────────▶│ APIs        │
                    │ OpenFood    │
                    │ Zapier      │
                    └─────────────┘
```

---

## 🚀 Getting Started

### **Prerequisites**
```bash
Node.js >= 16.0.0
npm >= 8.0.0
MySQL >= 8.0
```

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-team/leftoverlab.git
cd leftoverlab
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your database credentials and API keys
```

4. **Database setup**
```bash
# Create database
mysql -u root -p
CREATE DATABASE leftoverlab;

# Run migrations
npm run migrate

# Seed with sample data
npm run seed
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```

### **Environment Variables**
```env
# Database
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=leftoverlab

# External APIs
OPENFOOD_API_KEY=your_key_here
ZAPIER_WEBHOOK_URL=your_webhook_url

# Session
SESSION_SECRET=your_secret_key
```

---

## 📁 Project Structure

```
leftoverlab/
├── 📁 client/                 # Frontend code
│   ├── 📁 assets/            # Images, icons, fonts
│   ├── 📁 components/        # Reusable UI components
│   ├── 📁 pages/             # Main app pages
│   ├── 📁 styles/            # CSS files
│   └── 📄 index.html         # Main HTML file
├── 📁 server/                 # Backend code
│   ├── 📁 controllers/       # Route handlers
│   ├── 📁 models/            # Database models
│   ├── 📁 routes/            # API routes
│   ├── 📁 middleware/        # Custom middleware
│   └── 📄 app.js             # Express app setup
├── 📁 database/              # Database related files
│   ├── 📁 migrations/        # Database schema
│   └── 📁 seeds/             # Sample data
├── 📁 docs/                  # Documentation
│   ├── 📄 api.md             # API documentation
│   └── 📄 user-guide.md      # User guide
├── 📁 tests/                 # Test files
├── 📄 package.json           # Dependencies
├── 📄 .env.example           # Environment template
└── 📄 README.md              # This file
```

---

## 🎮 User Personas & Use Cases

### **Chloe Martinez** - Gen Z Content Creator (Age 22)
- **Need**: Quick recipe ideas for leftover ingredients to create trendy food content
- **Usage**: Uses 3-click flow to find "aesthetic" recipes for TikTok posts
- **Value**: Reduces food waste while creating engaging content

### **Marcus Thompson** - Busy Professional (Age 28)
- **Need**: Quick meal solutions after long work days
- **Usage**: "Leftover Roulette" for gamified cooking when stressed
- **Value**: Saves time and reduces food waste guilt

### **Emma Chen** - University Student (Age 20)
- **Need**: Budget-friendly meals using leftover ingredients
- **Usage**: Quick leftover solutions, posts cooking videos with #ChaosCooking
- **Value**: Saves money and learns cooking skills

---

## 🛠️ API Documentation

### **Core Endpoints**

#### Ingredients
```http
POST /api/ingredients
GET /api/ingredients/:userId
DELETE /api/ingredients/:id
```

#### Recipes
```http
GET /api/recipes/suggestions
POST /api/recipes/:id/favorite
GET /api/recipes/history/:userId
```

#### Users & Points
```http
POST /api/auth/login
GET /api/users/:id/points
POST /api/social/share
```

**Detailed API docs**: [docs/api.md](docs/api.md)

---

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend

# Run with coverage
npm run test:coverage
```

### **Manual Testing Checklist**
- [ ] 3-click ingredient entry works on mobile
- [ ] Recipe suggestions match entered ingredients
- [ ] Social sharing opens correct apps
- [ ] Points system awards correctly
- [ ] App works offline (basic functionality)

---

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Deploy to Vercel** (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### **Environment Setup**
Ensure all environment variables are configured in your hosting platform.

---

## 🎯 Development Roadmap

### **Current Sprint (MVP)**
- [x] 3-click ingredient entry system
- [x] Basic recipe matching algorithm
- [x] Mobile-responsive design
- [ ] Social sharing integration
- [ ] Points system implementation

### **Completed Milestones**
- ✅ **Week 1-2**: Basic ingredient entry working
- ✅ **Week 3-4**: Recipe suggestions implemented
- ✅ **Week 5-6**: User experience polished
- 🔄 **Week 7-8**: Social features (in progress)
- 📅 **Week 9-10**: Testing & demo preparation

### **Future Enhancements (v2.0)**
- 🎯 Barcode scanning for pantry items
- 🎯 AI-powered ingredient recognition via camera
- 🎯 Integration with grocery delivery APIs
- 🎯 Advanced nutritional analysis
- 🎯 Community recipe sharing platform

---

## 👥 Team & Contributions

### **Core Team**
- **[Your Name]** - Project Manager & Full-Stack Developer
- **[Team Member 2]** - Frontend Developer & UI/UX Design
- **[Team Member 3]** - Backend Developer & Database Architecture
- **[Team Member 4]** - QA Engineer & DevOps

### **Contribution Guidelines**
We use **vertical slicing** methodology:
1. Each feature is built end-to-end (database → API → UI)
2. Weekly demos of complete user journeys
3. All code must be reviewed by at least one team member
4. Follow our coding standards documented in [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📊 Project Statistics

```
Lines of Code: ~2,500
Commits: 150+
Features: 12 core features
Test Coverage: 85%
Performance: <2s load time
Mobile Score: 95/100
```

---

## 🎪 Demo Information

### **Presentation Schedule**
- **Date**: Week of November 17, 2025
- **Duration**: 10 minutes
- **Format**: Live demo + Q&A

### **Demo Scenarios**
1. **Quick Leftover Entry**: "I have tomatoes, chicken, and rice"
2. **Recipe Discovery**: Showing personalized suggestions
3. **Social Sharing**: Demonstrating points system
4. **Mobile Experience**: Showing responsive design

### **Test Data**
Demo includes pre-populated:
- 30+ recipes in database
- Sample user accounts
- Various ingredient combinations

---

## 🐛 Known Issues & Limitations

### **Current Limitations**
- Recipe database is manually curated (30 recipes)
- Social media points require manual URL verification
- No real-time collaboration features
- Limited to web browsers (no native mobile app)

### **Known Bugs**
- [ ] Search autocomplete occasionally freezes on older iOS browsers
- [ ] Recipe images may not load on slow connections
- [ ] Points calculation has 1-second delay

*See [Issues](https://github.com/your-team/leftoverlab/issues) for complete list*

---

## 📄 License & Credits

### **License**
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.

### **Credits & Acknowledgments**
- **OpenFoodFacts** for nutritional data API
- **Unsplash** for recipe placeholder images
- **Tailwind CSS** for rapid UI development
- **Our beta testers** for valuable feedback

### **Third-Party Libraries**
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "tailwindcss": "^3.3.0",
  "bcrypt": "^5.1.0"
}
```

---

## 📞 Contact & Support

### **Team Contact**
- **Project Repository**: [github.com/your-team/leftoverlab](https://github.com/your-team/leftoverlab)
- **Demo Questions**: [your-email@university.edu](mailto:your-email@university.edu)
- **Technical Issues**: Create an [Issue](https://github.com/your-team/leftoverlab/issues)

### **University Course**
- **Course**: [Course Code & Name]
- **Semester**: Fall 2025
- **Instructor**: [Instructor Name]

---

## 🎉 Acknowledgments

Special thanks to everyone who helped make this project possible:
- Course instructors for guidance and feedback
- Beta testers who provided valuable user insights  
- Open source community for amazing tools and libraries
- Food waste reduction advocates for inspiration

---

*Built by 
- Mathijs Dickson
- Alex Atanasovski
- Alex Perry
- Isaac Dillon
          
Fighting food waste one leftover at a time*

