# Project Structure

This document outlines the refactored structure of the AI Web project.

## Overview

The project has been reorganized to follow a more modular and scalable architecture, separating screens from reusable components and organizing them by functionality. All styling has been moved from inline styles to separate CSS files for better maintainability.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── Footer/          # Footer component folder
│   │   ├── index.tsx    # Footer component (main file)
│   │   ├── index.css    # Footer component styles
│   │   └── ...          # Additional Footer-related files (if any)
│   └── index.ts         # Components exports
├── screens/             # Application screens organized by module
│   ├── authentication/  # Authentication-related screens
│   │   ├── Login.tsx    # Login screen
│   │   ├── Login.css    # Login screen styles
│   │   ├── Register.tsx # Registration screen
│   │   ├── Register.css # Registration screen styles
│   │   └── index.ts     # Authentication module exports
│   ├── home/            # Home-related screens
│   │   ├── HomeScreen.tsx # Main home screen (formerly ProductList)
│   │   ├── HomeScreen.css # Home screen styles
│   │   └── index.ts     # Home module exports
│   └── index.ts         # All screens exports
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## Module Organization

### Components (`src/components/`)
- **Footer/**: Footer component folder
  - `index.tsx`: Main Footer component file
  - `index.css`: Footer component styles
  - Additional Footer-related files can be added here

### Authentication Module (`src/screens/authentication/`)
- **Login.tsx**: User login screen
- **Login.css**: Login screen styles
- **Register.tsx**: User registration screen
- **Register.css**: Registration screen styles

### Home Module (`src/screens/home/`)
- **HomeScreen.tsx**: Main application home screen (renamed from ProductList)
- **HomeScreen.css**: Home screen styles

## Component Organization Pattern

### Folder Structure for Components
Each component follows this folder structure:
```
src/components/ComponentName/
├── index.tsx          # Main component file
├── index.css          # Component styles
├── ComponentName.tsx  # Alternative naming (if needed)
├── ComponentName.css  # Alternative naming (if needed)
├── types.ts           # TypeScript types/interfaces
├── utils.ts           # Component-specific utilities
└── README.md          # Component documentation
```

### Benefits of Component Folder Organization
1. **Scalability**: Easy to add multiple files per component
2. **Organization**: Related files are co-located
3. **Maintainability**: Clear structure for complex components
4. **Extensibility**: Easy to add tests, stories, or other files
5. **Import Simplicity**: Clean imports from component folders
6. **Team Collaboration**: Multiple developers can work on the same component

### Import Pattern
```typescript
// Import from components index
import { Footer } from './components';

// Direct import from component folder
import Footer from './components/Footer';
```

## Styling Approach

### CSS File Organization
- Each component and screen has its own dedicated CSS file
- CSS files are co-located with their corresponding components
- No inline styles are used - all styling is in CSS files
- CSS classes follow BEM-like naming conventions for consistency

### CSS File Naming Convention
- Component CSS: `ComponentName.css` (e.g., `Footer.css`)
- Screen CSS: `ScreenName.css` (e.g., `Login.css`, `HomeScreen.css`)

### Benefits of This Approach
1. **Separation of Concerns**: Styling is separated from component logic
2. **Maintainability**: Easier to modify styles without touching component code
3. **Reusability**: CSS classes can be reused across components
4. **Performance**: Better CSS optimization and caching
5. **Developer Experience**: Easier to debug and modify styles
6. **Scalability**: Consistent styling patterns across the application

## Benefits of This Structure

1. **Separation of Concerns**: Screens are separated from reusable components
2. **Modularity**: Related screens are grouped by functionality
3. **Scalability**: Easy to add new modules and screens
4. **Maintainability**: Clear organization makes code easier to navigate
5. **Reusability**: Components can be shared across different screens
6. **Styling**: Clean separation of styling from component logic

## Import Patterns

### Importing Screens
```typescript
import { Login, Register, HomeScreen } from './screens';
```

### Importing Components
```typescript
import { Footer } from './components';
```

### Importing from Specific Modules
```typescript
import { Login, Register } from './screens/authentication';
import { HomeScreen } from './screens/home';
```

## Adding New Screens

To add a new screen:

1. Create a new folder in `src/screens/` for the module (e.g., `src/screens/dashboard/`)
2. Add your screen component (e.g., `DashboardScreen.tsx`)
3. Create a CSS file for styling (e.g., `DashboardScreen.css`)
4. Create an `index.ts` file to export the screen
5. Update `src/screens/index.ts` to export from the new module
6. Add the route in `App.tsx`

## Adding New Components

To add a new reusable component:

1. Create a new folder in `src/components/` (e.g., `src/components/Button/`)
2. Create the main component file as `index.tsx` in the component folder
3. Create a CSS file as `index.css` in the component folder
4. Optionally add additional files like `types.ts`, `utils.ts`, or `README.md`
5. Update `src/components/index.ts` to export the new component
6. Import and use it in your screens

### Example Component Structure
```
src/components/Button/
├── index.tsx          # Button component
├── index.css          # Button styles
├── types.ts           # Button props interface
└── README.md          # Button documentation
```

### Example Component Export
```typescript
// src/components/Button/index.tsx
import React from 'react';
import './index.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

### Example Components Index Update
```typescript
// src/components/index.ts
export { default as Footer } from './Footer';
export { default as Button } from './Button';
```

## CSS Best Practices

### Class Naming
- Use descriptive, semantic class names
- Follow consistent naming patterns (e.g., `component-name`, `component-name--modifier`)
- Avoid generic names that could conflict

### Organization
- Group related styles together
- Use comments to separate logical sections
- Keep CSS files focused and not too large

### Responsiveness
- Use CSS Grid and Flexbox for layouts
- Implement mobile-first responsive design
- Use relative units (rem, em, %) when appropriate
