# AI Web Application

A modern React TypeScript application with a comprehensive design system, consistent spacing, and reusable components.

## 🚀 Features

- **React 18** with TypeScript
- **Comprehensive Design System** with consistent spacing, typography, and styling
- **Reusable Components** following modern design patterns
- **Responsive Design** with mobile-first approach
- **Modern CSS** with CSS custom properties and utility classes
- **Component-Based Architecture** with organized folder structure

## 📁 Project Structure

```
ai-web/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button/          # Component folders
│   │   ├── Input/           # Each component has its own folder
│   │   ├── Card/            # With index.tsx and index.css
│   │   ├── Footer/          # Following naming convention
│   │   └── index.ts         # Barrel exports
│   ├── screens/             # Page-level components
│   │   ├── authentication/  # Functional grouping
│   │   │   ├── Login.tsx    # Login screen
│   │   │   ├── Register.tsx # Register screen
│   │   │   └── index.ts     # Barrel exports
│   │   ├── home/            # Home screen grouping
│   │   │   ├── HomeScreen.tsx
│   │   │   └── index.ts
│   │   └── index.ts         # Main screen exports
│   ├── styles/              # Global design systems
│   │   ├── spacing.css      # Spacing system
│   │   └── design-system.css # Complete design system
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # App entry point
│   └── index.css            # Global styles
├── .cursor/                  # Cursor rules for development
├── documents/                # Project documentation
└── README.md                 # This file
```

## 🎨 Design System

The application uses a comprehensive design system built on a **4px base unit** with:

- **Consistent Spacing**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px scale
- **Typography Scale**: 12px to 48px with consistent weights and line heights
- **Border System**: Consistent border radius and width variables
- **Shadow System**: Multiple shadow levels for depth and focus states
- **Transition System**: Consistent animation timing and easing
- **Responsive Breakpoints**: Mobile-first design with design system variables

## 🧩 Available Components

- **Text**: Versatile text component with multiple variants
- **Header**: Specialized component for page and section headers
- **Button**: Flexible button with multiple variants and states
- **Input**: Form input with validation states and icons
- **Card**: Container component for grouping related content
- **Link**: Consistent link styling across the application
- **Container**: Layout container for consistent spacing
- **Footer**: Application footer with organized sections

## 📚 Documentation

Comprehensive documentation is available in the `documents/` folder:

- **[Component Usage Guide](documents/COMPONENT_USAGE.md)** - Complete guide for using all components
- **[Spacing System](documents/SPACING_SYSTEM.md)** - Comprehensive spacing system documentation
- **[Implementation Status](documents/SPACING_IMPLEMENTATION_STATUS.md)** - Current implementation status
- **[Project Structure](documents/PROJECT_STRUCTURE.md)** - Detailed project organization guide

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Development Rules

The project includes comprehensive Cursor rules for consistent development:

- **Design System Rules** - Always applied for design consistency
- **Component Development Rules** - Applied to component and screen files
- **Project Structure Rules** - Always applied for project organization
- **CSS Styling Rules** - Applied to all CSS files

## 🎯 Key Principles

1. **Design System First**: Always use design system variables instead of hardcoded values
2. **Component Reusability**: Build components that can be used across the application
3. **Consistent Spacing**: Use the established spacing system for all layouts
4. **Mobile-First**: Implement responsive design with mobile-first approach
5. **Accessibility**: Ensure all components meet accessibility standards
6. **Performance**: Optimize for performance with efficient CSS and React patterns

## 🔧 Customization

### Adding New Components

1. Create component folder in `src/components/ComponentName/`
2. Include `index.tsx` and `index.css` files
3. Use design system variables for styling
4. Add to barrel exports in `src/components/index.ts`
5. Follow established component patterns

### Adding New Screens

1. Create screen in appropriate functional group in `src/screens/`
2. Include screen component and CSS file
3. Add to routing in `App.tsx`
4. Update barrel exports
5. Follow established screen patterns

### Modifying Design System

1. Update variables in `src/styles/design-system.css`
2. Update spacing in `src/styles/spacing.css`
3. Test across all components and screens
4. Update documentation in `documents/` folder
5. Update Cursor rules if necessary

## 📱 Responsive Design

The application uses a mobile-first responsive design approach:

- **Mobile**: Base styles with design system variables
- **Tablet**: Enhanced styles for medium screens
- **Desktop**: Full-featured layouts for large screens
- **Breakpoints**: 640px, 768px, 1024px, 1280px, 1536px

## 🎨 Styling Approach

- **CSS Variables**: Global design system variables
- **Utility Classes**: Rapid development with utility classes
- **Component Styles**: Scoped styles in component folders
- **BEM Methodology**: Consistent CSS class naming
- **No Inline Styles**: All styling in separate CSS files

## 🚀 Performance Features

- **CSS Variables**: Optimized by modern browsers
- **Efficient Selectors**: Minimal CSS specificity conflicts
- **Component Memoization**: React.memo for expensive components
- **Lazy Loading**: Code splitting for better performance
- **Optimized Builds**: Production-ready builds with optimization

## 🤝 Contributing

1. Follow the established project structure
2. Use design system variables for all styling
3. Follow component development patterns
4. Ensure responsive design implementation
5. Test across different screen sizes
6. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

---

For detailed information about components, spacing, and implementation, please refer to the documentation in the `documents/` folder.
