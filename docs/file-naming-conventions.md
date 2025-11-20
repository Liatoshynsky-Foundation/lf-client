# File Naming Conventions

This document defines the file and folder naming conventions used in the project.  
The goal is to maintain **consistency**, **predictability**, and **readability** across all modules.

---

## Components

- Each component must be named in **PascalCase**.
- The component file, its test, and style file must share the same base name.

**Example:**

```
/shared/components/backdrop-component/
├── BackdropComponent.tsx
├── BackdropComponent.test.tsx
└── BackdropComponent.styles.ts
```

---

## Component Styles

- Style files for components use the suffix `.styles.ts`.
- Always keep styles in the same folder as the component they belong to.

**Example:**

```
ButtonComponent.tsx
ButtonComponent.styles.ts
```

---

## Test Files

- Test file names must match the file being tested and end with `.test.ts` or `.test.tsx`.
- All test files should be placed **next to the file under test**.

**Example:**

```
BackdropComponent.tsx
BackdropComponent.test.tsx
```

---

## Folder Names

- All folder names use **kebab-case** (lowercase words separated by hyphens).
- Folder names should describe the **purpose** or **logical group** of files.

**Examples:**

```
backdrop-component
contact-link
design-system
download-button
```

---

## Other Files (Utilities, Constants, Configs)

- Files such as utilities, constants, services, and configuration files use **kebab-case**.
- Avoid uppercase letters or underscores.

**Examples:**

```
fetch-data.ts
form-validation.ts
app-config.ts
main-constants.ts
```

---

## Summary

| Type                            | Convention                 | Example                          |
| ------------------------------- | -------------------------- | -------------------------------- |
| Component files                 | PascalCase                 | `BackdropComponent.tsx`          |
| Component styles                | PascalCase + `.styles.ts`  | `BackdropComponent.styles.ts`    |
| Test files                      | PascalCase + `.test.ts(x)` | `BackdropComponent.test.tsx`     |
| Folders                         | kebab-case                 | `backdrop-component`             |
| Utilities / Constants / Configs | kebab-case                 | `fetch-data.ts`, `app-config.ts` |

---

✅ **Key Principles**

- Keep related files together in the same folder.
- Use **PascalCase** only for React components and their related files.
- Use **kebab-case** for everything else.
- Never mix naming styles within the same folder.
