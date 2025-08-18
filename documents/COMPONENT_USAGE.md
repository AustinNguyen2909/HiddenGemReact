# Component Usage Guide

This document provides comprehensive examples and usage patterns for all reusable components in the application.

## Available Components

### 1. Text Component
A versatile text component that can render as different HTML elements with consistent styling.

```tsx
import { Text } from '../components';

// Basic usage
<Text>Regular paragraph text</Text>

// As different HTML elements
<Text variant="h1" size="3xl" weight="bold" color="primary">
  Main Heading
</Text>

<Text variant="h2" size="2xl" weight="semibold" align="center">
  Section Title
</Text>

// With click handler
<Text variant="span" size="sm" color="muted" onClick={handleClick}>
  Clickable text
</Text>
```

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
- `weight`: 'normal' | 'medium' | 'semibold' | 'bold'
- `color`: 'primary' | 'secondary' | 'accent' | 'muted' | 'white' | 'black'
- `align`: 'left' | 'center' | 'right'
- `onClick`: Optional click handler

### 2. Header Component
Specialized component for page and section headers.

```tsx
import { Header } from '../components';

// Page header
<Header level="h1" size="xl" align="center" color="black">
  Welcome to Our App
</Header>

// Section header
<Header level="h2" size="lg" align="left" color="primary">
  Product Categories
</Header>

// Small header
<Header level="h3" size="md" color="secondary">
  Recent Items
</Header>
```

**Props:**
- `level`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `align`: 'left' | 'center' | 'right'
- `color`: 'primary' | 'secondary' | 'accent' | 'white' | 'black'

### 3. Button Component
Flexible button component with multiple variants and states.

```tsx
import { Button } from '../components';

// Primary button
<Button variant="primary" size="md" fullWidth>
  Continue
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Cancel
</Button>

// Outline button
<Button variant="outline" size="sm">
  Learn More
</Button>

// With icon
<Button variant="primary" icon="→" iconPosition="right">
  Next
</Button>

// Submit button
<Button type="submit" variant="primary" fullWidth>
  Submit Form
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `type`: 'button' | 'submit' | 'reset'
- `fullWidth`: boolean
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'
- `disabled`: boolean

### 4. Input Component
Form input component with validation states and icons.

```tsx
import { Input } from '../components';

// Basic input
<Input
  type="email"
  placeholder="Enter your email"
  fullWidth
/>

// With validation
<Input
  type="password"
  placeholder="Enter password"
  error="Password is required"
  fullWidth
/>

// With icons
<Input
  type="text"
  placeholder="Search..."
  leftIcon="🔍"
  rightIcon="✕"
  onRightIconClick={clearSearch}
  fullWidth
/>

// With success state
<Input
  type="email"
  placeholder="Email"
  success={true}
  fullWidth
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search'
- `placeholder`: string
- `value`: string | number
- `onChange`: function
- `error`: string
- `success`: boolean
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `onRightIconClick`: function

### 5. Card Component
Container component for grouping related content.

```tsx
import { Card } from '../components';

// Basic card
<Card>
  <Text>Card content here</Text>
</Card>

// Elevated card with hover effect
<Card variant="elevated" shadow="lg" hover>
  <Text variant="h3">Product Title</Text>
  <Text>Product description</Text>
</Card>

// Outlined card
<Card variant="outlined" padding="lg">
  <Text>Large padding card</Text>
</Card>

// Clickable card
<Card variant="elevated" hover onClick={handleCardClick}>
  <Text>Click me!</Text>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'flat'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `shadow`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean
- `onClick`: function

### 6. Link Component
Consistent link styling across the application.

```tsx
import { Link } from '../components';

// Basic link
<Link href="/about">About Us</Link>

// Primary link
<Link href="/products" variant="primary" size="lg">
  View Products
</Link>

// External link
<Link href="https://example.com" external>
  External Resource
</Link>

// With underline
<Link href="/help" variant="secondary" underline>
  Help & Support
</Link>

// Clickable link (no href)
<Link onClick={handleClick} variant="muted">
  Click me
</Link>
```

**Props:**
- `href`: string
- `variant`: 'default' | 'primary' | 'secondary' | 'muted'
- `size`: 'sm' | 'md' | 'lg'
- `underline`: boolean
- `external`: boolean
- `onClick`: function

### 7. Container Component
Layout container for consistent spacing and width constraints.

```tsx
import { Container } from '../components';

// Standard container
<Container>
  <Text>Content here</Text>
</Container>

// Large container
<Container size="xl" padding="lg">
  <Text>Wide content with large padding</Text>
</Container>

// Small container
<Container size="sm" padding="sm">
  <Text>Compact content</Text>
</Container>

// Full width
<Container size="full" padding="none">
  <Text>Full width content</Text>
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `center`: boolean

## Component Composition Examples

### Form Layout
```tsx
<Container size="md" padding="lg">
  <Header level="h1" size="xl" align="center" color="black">
    User Registration
  </Header>
  
  <form onSubmit={handleSubmit}>
    <Input
      type="text"
      placeholder="Full Name"
      fullWidth
      required
    />
    
    <Input
      type="email"
      placeholder="Email Address"
      fullWidth
      required
    />
    
    <Input
      type="password"
      placeholder="Password"
      fullWidth
      required
    />
    
    <Button type="submit" variant="primary" fullWidth>
      Create Account
    </Button>
  </form>
  
  <Text align="center" size="sm" color="muted">
    Already have an account?{' '}
    <Link href="/login" variant="primary">
      Sign in
    </Link>
  </Text>
</Container>
```

### Product Grid
```tsx
<div className="products-grid">
  {products.map(product => (
    <Card key={product.id} variant="elevated" hover>
      <Header level="h3" size="md" color="black">
        {product.name}
      </Header>
      
      <Text variant="p" color="secondary" size="sm">
        {product.description}
      </Text>
      
      <Text variant="p" size="lg" weight="semibold" color="primary">
        ${product.price}
      </Text>
      
      <Button variant="primary" fullWidth>
        Add to Cart
      </Button>
    </Card>
  ))}
</div>
```

## Best Practices

### 1. Consistent Spacing
- Use the `Container` component for consistent page layouts
- Leverage component padding props instead of custom margins
- Use the `fullWidth` prop for components that should span their container

### 2. Typography Hierarchy
- Use `Header` for page and section titles
- Use `Text` with appropriate variants for body content
- Maintain consistent size and weight patterns

### 3. Interactive States
- Always include hover states for interactive elements
- Use the `hover` prop on cards for better UX
- Implement proper focus states for accessibility

### 4. Responsive Design
- Components automatically handle responsive behavior
- Use appropriate sizes for different screen contexts
- Test components across different viewport sizes

### 5. Accessibility
- Components include proper ARIA attributes
- Focus states are implemented for keyboard navigation
- Color contrast meets accessibility standards

## Migration Guide

When migrating existing screens to use these components:

1. **Replace HTML elements** with appropriate components
2. **Remove custom CSS** that's now handled by components
3. **Update imports** to include new component dependencies
4. **Test functionality** to ensure behavior is preserved
5. **Update styling** to use component props instead of custom classes

## Component Customization

All components support:
- `className` prop for additional custom styling
- Variant props for different visual styles
- Size props for consistent scaling
- Color props for theming

For advanced customization, extend the component CSS files or use the `className` prop to override specific styles.
