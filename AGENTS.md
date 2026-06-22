<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:code-rules -->
# Code Rules

- No .tsx file shall exceed 350 lines. If a file would exceed this limit, split it into smaller component files.
- Use Next.js `<Image>` with `fill` and `sizes` props instead of `<img>` tags for lazy loading and optimization.
- Components should be single-responsibility; extract reusable UI into dedicated component files.
<!-- END:code-rules -->
