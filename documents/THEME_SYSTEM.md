# Theme System Documentation

## Overview

This project now includes a comprehensive theme system that provides consistent theming across all components with support for both light and dark themes.

## Features

- **Light Theme (Default)**: Clean, bright interface with high contrast
- **Dark Theme**: Dark interface with reduced eye strain
- **System Preference Detection**: Automatically detects user's system theme preference
- **Persistent Storage**: Remembers user's theme choice across sessions
- **Smooth Transitions**: Animated theme switching with CSS transitions
- **CSS Custom Properties**: All colors defined as CSS variables for easy customization

## Theme Provider

The `ThemeProvider` component wraps the entire application and provides theme context to all child components.

### Usage

```tsx
import { ThemeProvider } from './components';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Hook

Use the `useTheme` hook to access theme functionality in any component:

```tsx
import { useTheme } from './components';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Theme Toggle Component

The `ThemeToggle` component provides a user-friendly way to switch between themes.

### Features

- **Icon Animation**: Smooth rotation animation on hover
- **Accessibility**: Proper ARIA labels and keyboard support
- **Visual Feedback**: Hover and focus states with theme-aware colors

### Usage

```tsx
import { ThemeToggle } from './components';

function Navigation() {
  return (
    <nav>
      <ThemeToggle />
    </nav>
  );
}
```

## Color System

### Primary Colors

The primary color palette is based on `#156082` (blue) with 10 shades:

- `--color-primary-50` to `--color-primary-900`
- Used for buttons, links, and interactive elements

### Neutral Colors

- `--color-neutral-50` to `--color-neutral-900`
- Used for backgrounds, borders, and text

### Semantic Colors

- **Success**: Green (`#059669`) for positive actions
- **Error**: Red (`#dc2626`) for errors and destructive actions
- **Warning**: Yellow (`#f59e0b`) for warnings

### Background Colors

- `--color-bg-primary`: Main background
- `--color-bg-secondary`: Secondary background
- `--color-bg-tertiary`: Tertiary background
- `--color-bg-elevated`: Elevated surfaces (cards, modals)
- `--color-bg-overlay`: Overlay backgrounds

### Surface Colors

- `--color-surface-primary`: Primary surface
- `--color-surface-secondary`: Secondary surface
- `--color-surface-tertiary`: Tertiary surface
- `--color-surface-elevated`: Elevated surfaces
- `--color-surface-outlined`: Outlined surfaces

### Text Colors

- `--color-text-primary`: Primary text
- `--color-text-secondary`: Secondary text
- `--color-text-tertiary`: Tertiary text
- `--color-text-quaternary`: Quaternary text
- `--color-text-inverse`: Inverse text (on dark backgrounds)
- `--color-text-disabled`: Disabled text

### Border Colors

- `--color-border-primary`: Primary borders
- `--color-border-secondary`: Secondary borders
- `--color-border-tertiary`: Tertiary borders
- `--color-border-focus`: Focus state borders
- `--color-border-error`: Error state borders
- `--color-border-success`: Success state borders

### Interactive Colors

- `--color-interactive-primary`: Primary interactive elements
- `--color-interactive-primary-hover`: Primary hover state
- `--color-interactive-primary-active`: Primary active state
- `--color-interactive-secondary`: Secondary interactive elements
- `--color-interactive-secondary-hover`: Secondary hover state
- `--color-interactive-secondary-active`: Secondary active state

## Component Updates

All components have been updated to use theme variables:

### Button Component

- Primary buttons use `--color-interactive-primary`
- Secondary buttons use `--color-interactive-secondary`
- Hover and active states use theme-aware colors

### Text Component

- Primary text uses `--color-text-primary`
- Secondary text uses `--color-text-secondary`
- All color variants now use theme variables

### Input Component

- Background uses `--color-surface-primary`
- Borders use `--color-border-secondary`
- Focus state uses `--color-border-focus`

### Card Component

- Background uses `--color-surface-primary`
- Outlined variant uses `--color-border-primary`

### Header Component

- All color variants use theme variables
- Consistent with Text component theming

### Footer Component

- Background uses `--color-bg-secondary`
- Borders use `--color-border-primary`
- Text colors use theme variables

## CSS Custom Properties

The theme system uses CSS custom properties (CSS variables) for all colors. This allows for:

- **Easy Customization**: Change colors by modifying CSS variables
- **Runtime Updates**: Theme switching without page reload
- **Consistent Values**: All components reference the same color definitions

## Theme Switching

### Automatic Detection

1. **Local Storage**: Checks for previously saved theme preference
2. **System Preference**: Falls back to system theme if no saved preference
3. **Default**: Uses light theme as final fallback

### Manual Switching

Users can manually switch themes using the theme toggle button in the navigation.

### Persistence

Theme choice is automatically saved to localStorage and restored on page reload.

## Responsive Design

The theme system works seamlessly with the existing responsive design system:

- **Mobile**: Theme toggle positioned in navigation
- **Desktop**: Same theme toggle with enhanced hover effects
- **All Screen Sizes**: Consistent theming across breakpoints

## Browser Support

- **Modern Browsers**: Full support for CSS custom properties
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Theme functionality enhances the experience

## Customization

### Adding New Themes

To add a new theme (e.g., "high contrast"):

1. Add new theme data attributes in `theme.css`
2. Define color variables for the new theme
3. Update the `ThemeProvider` to support the new theme

### Modifying Colors

To modify existing colors:

1. Update the color values in `theme.css`
2. All components will automatically use the new colors
3. No component code changes required

### Adding New Color Variables

To add new color variables:

1. Define them in the `:root` selector
2. Add corresponding dark theme values
3. Use them in component CSS files

## Best Practices

1. **Always use theme variables**: Never hardcode colors in components
2. **Test both themes**: Ensure components look good in light and dark modes
3. **Consider contrast**: Ensure text remains readable in both themes
4. **Use semantic colors**: Use success/error colors for their intended purposes
5. **Maintain consistency**: Use the same color variables across similar elements

## Troubleshooting

### Theme Not Switching

- Check that `ThemeProvider` wraps the entire app
- Verify `useTheme` hook is used correctly
- Check browser console for errors

### Colors Not Updating

- Ensure CSS variables are properly defined
- Check that `data-theme` attribute is set on document root
- Verify component CSS uses theme variables

### Performance Issues

- Theme switching uses CSS variables for optimal performance
- No JavaScript re-renders required for color changes
- Smooth transitions are CSS-based

## Future Enhancements

- **Theme Presets**: Additional theme variations (e.g., "sepia", "high contrast")
- **Custom Themes**: User-defined color schemes
- **Animation Options**: Configurable transition durations
- **Accessibility**: Enhanced contrast ratios and color-blind friendly options
