# Karen - AI Image Generation Assistant

A modern web application that generates images using AI based on text descriptions. Built with React, Node.js, and powered by advanced AI models.

## 🌟 Features

- **Text-to-Image Generation**: Convert your imagination into visual art
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Feedback**: Loading animations and status notifications
- **Download Capability**: Save generated images instantly
- **Responsive Design**: Works seamlessly across all devices

## 🏗️ Project Structure

```
Karen/
├── Friday/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── assets/       # Static assets
│   │   │   └── App.jsx       # Main application component
│   │   └── public/          # Public assets
│   └── backend/           # Node.js backend server
│       ├── server.js      # Main server file
│       └── .env          # Environment variables
```

## 🛠️ Technology Stack

### Frontend
- **React**: Modern UI library for building user interfaces
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Hot Toast**: Beautiful toast notifications

### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Friday/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5001
   API_KEY=your_api_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Friday/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔍 How It Works

### Frontend Architecture

1. **Component Structure**
   - `App.jsx`: Main application component
   - `Hero.jsx`: Main landing section with image generation interface
   - `Navbar.jsx`: Navigation bar with links and version info
   - `LoadingAnimation.jsx`: Custom loading animation
   - `Footer.jsx`: Footer component with credits

2. **State Management**
   - Uses React's useState for local state management
   - Manages loading states, generated images, and user inputs

3. **API Integration**
   - Axios for making HTTP requests to the backend
   - Handles image generation requests and responses
   - Error handling with toast notifications

### Backend Architecture

1. **Server Setup**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const dotenv = require('dotenv');
   ```

2. **API Endpoints**
   - POST `/generate`: Handles image generation requests
   - Implements rate limiting and error handling
   - Processes text prompts and returns generated images

3. **Environment Configuration**
   - Uses dotenv for secure configuration
   - Manages API keys and server settings

## 🎨 UI Components

### Loading Animation
- Custom-designed loading animation with multiple layers
- Responsive design that works on all screen sizes
- Smooth transitions and animations using Framer Motion

### Hero Section
- Clean, modern interface for prompt input
- Real-time feedback during image generation
- Smooth transitions for generated images

### Navigation
- Responsive navbar with active links
- Version information display
- Social media and contact links

## 🔒 Security Features

- Environment variable protection
- CORS configuration
- Input validation
- Rate limiting
- Secure API key handling

## 🚀 Performance Optimizations

- Lazy loading of components
- Optimized image loading
- Efficient state management
- Smooth animations with Framer Motion

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- Adaptive components
- Touch-friendly interfaces

## 🔄 API Integration

### Image Generation Flow
1. User enters text prompt
2. Frontend sends request to backend
3. Backend processes request with AI model
4. Generated image returned to frontend
5. Image displayed with download option

## 🛡️ Error Handling

- Frontend validation
- Backend error responses
- User-friendly error messages
- Graceful fallbacks

## 🔍 Testing

- Component testing
- API endpoint testing
- Error scenario handling
- Performance testing

## 📦 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure CORS settings
3. Set up proper error handling
4. Configure rate limiting

### Frontend Deployment
1. Build the application
2. Configure environment variables
3. Set up proper routing
4. Configure CORS settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Ritik Meena - Initial work

## 🙏 Acknowledgments

- OpenAI for the AI model
- React team for the amazing framework
- All contributors and supporters 