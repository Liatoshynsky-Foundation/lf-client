# Data Test ID Naming Convention

This document defines the rules for naming `data-testid` attributes across the project.  
It ensures consistency, readability, and predictability in testing.

---

## Purpose

`data-testid` attributes are used to:

- Identify key static and interactive elements within UI components.
- Provide stable selectors for tests.

We follow a [SUIT CSS](https://suitcss.github.io/)-inspired pattern:

`ComponentName-descendantName--modifierName`

---

## Naming Rules

### 1. Root Component

Each component must have a unique root container with a `data-testid` that matches the component name.

`data-testid="ComponentName"`

**Example:**

```tsx
<div data-testid="ProductCard">...</div>
```

### 2. Descendant Elements

Use the following pattern for descendants:

`ComponentName-descendantName`

The descendant name describes the semantic role or functional purpose, not visual appearance.

**Example:**

```tsx
<img src="path/to/image.jpg" alt="Product image" data-testid="ProductCard-image" />
<h3 data-testid="ProductCard-title">Product Name</h3>
<span data-testid="ProductCard-price">1200 ₴</span>
<button data-testid="ProductCard-addToCartButton">Add to Cart</button>
```

### 3. Modifiers / States

Use a double dash (--) to indicate a specific state, variation, or contextual modifier.

`ComponentName-descendantName--modifierName`

**Example:**

```tsx
<button data-testid="ProductCard-addToCartButton--disabled" disabled>
  Add to Cart
</button>
```

### 4. Static vs Dynamic Elements

- Include data-testid for:
  - Page titles and section headers
  - Buttons and links
  - Form inputs and interactive fields
  - Important static containers or wrappers
- Do **NOT** assign data-testid inside dynamic iterations (.map(), .forEach()).

### Naming Style Guidelines

| Rule                                      | Description                         | Example                                            |
| ----------------------------------------- | ----------------------------------- | -------------------------------------------------- |
| Use **PascalCase** for the component name | Matches React component naming      | `ProductCard`, `ContactsInfo`                      |
| Use **camelCase** for descendant names    | Keeps names readable and consistent | `ProductCard-addToCartButton`                      |
| Use **lowercase modifiers**               | For states and variations           | `ProductCard-addToCartButton--disabled`            |
| Be **semantic, not visual**               | Focus on purpose, not style         | ✅ `ProductCard-price` / ❌ `ProductCard-rightBox` |

---

## Complete Example

```tsx
<div data-testid="ProductCard">
  <div>
    <img src="path/to/image.jpg" alt="Product image" data-testid="ProductCard-image" />
  </div>
  <div>
    <h3 data-testid="ProductCard-title">Product Name</h3>
    <div>
      <span data-testid="ProductCard-price">1200 ₴</span>
    </div>
  </div>
  <div>
    <button data-testid="ProductCard-addToCartButton">Add to Cart</button>
  </div>
</div>
```
