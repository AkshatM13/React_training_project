<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React Training Project - Copilot Instructions

## Project Overview
This is a React training project built with Vite, featuring Bootstrap for styling and SCSS for custom styles. The project demonstrates fundamental React concepts including state management, props, conditional rendering, and routing.

## Key Technologies
- React 18 with Vite
- React Router for navigation
- Bootstrap 5 for styling
- SCSS for custom styles
- Bootstrap Icons for iconography

## Project Structure
```
src/
├── components/          # Reusable React components
│   ├── Component1.jsx   # Toggle functionality demo
│   ├── Component2.jsx   # Background color changer
│   ├── Component3.jsx   # Product catalog
│   ├── Navbar.jsx       # Navigation component
│   └── ProductCard.jsx  # Individual product display
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── Products.jsx     # Products listing page
│   ├── Wishlist.jsx     # Wishlist management
│   └── Cart.jsx         # Shopping cart
└── styles/
    └── main.scss        # Custom SCSS styles
```

## Coding Guidelines
1. Use functional components with hooks
2. Follow React best practices for state management
3. Use props for component communication (no Context API in this beginner project)
4. Implement responsive design with Bootstrap classes
5. Use React Router for navigation between pages
6. Maintain clean, readable code with proper commenting

## Features Implemented
- Toggle show/hide functionality
- Dynamic background color changing
- Product catalog with filtering and sorting
- Shopping cart functionality
- Wishlist management
- Responsive navigation with Bootstrap

## State Management
- Use useState for local component state
- Pass state and handlers through props
- Maintain cart and wishlist state in App.jsx
- No external state management libraries used (beginner-friendly approach)

When helping with this project, focus on React fundamentals, Bootstrap integration, and maintaining the beginner-friendly approach without over-engineering solutions.
