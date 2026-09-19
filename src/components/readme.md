# Component Standards

## File naming

- The directory, main component file, CSS module, and stories file all share the same base name, matching the directory.
- No `kad-` prefix on filenames.

```
components/
  button/
    button.tsx
    button.module.css
    button.stories.tsx
```

## Exported component names

React components are exported in `KAD`-prefixed PascalCase.

```tsx
// button/button.tsx
export default function KADButton(...) { ... }

// avatar/avatar.tsx
export default function KADAvatar(...) { ... }
```

## CSS modules

CSS classes are defined at the root of the module file (no nesting at the selector level) and prefixed with `kad-`.

```css
/* button/button.module.css */
.kad-button {
  ...
}
```

Because `vite.config.ts` sets `localsConvention: 'camelCaseOnly'`, the kebab-case class name is accessed in camelCase in TSX:

```tsx
import styles from './button.module.css';

<button className={styles.kadButton} />
```
