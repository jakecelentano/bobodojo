# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Previewing the Production Build
```bash
npm run preview
```

## High-Level Architecture

This is a Vue 3 + Vite application for creating and browsing Yu-Gi-Oh Rush Duel style trading cards with Supabase as the backend database. The design follows standard trading card dimensions (2.5" x 3.5") with print-ready layouts optimized for both web display and physical printing.

### Core Components Structure

- **App.vue**: Main application container with tabs for creating and browsing cards
  - Uses CardEntryForm for card creation
  - Uses CardRenderer for card display
  - Handles card CRUD operations and filtering/searching
  - Connects to Supabase for data persistence

- **CardEntryForm.vue**: Form component for creating new cards
  - Supports Monster, Spell, and Trap card types
  - Conditional field display based on card type
  - Uploads images to Supabase storage
  - Handles legendary card styling option

- **CardRenderer.vue**: Main card rendering component
  - Delegates to different layout components based on card type
  - Supports small, medium, and large sizes
  - Handles legendary card styling

### Card Component Architecture

```
CardRenderer.vue
├── CardFrame.vue (handles frame styling/borders)
├── CardImage.vue (image display)
├── CardText.vue (text content)
├── MonsterCardLayout.vue (Monster-specific layout)
│   ├── MonsterCardHeader.vue
│   ├── MonsterCardFooter.vue
│   └── StarLevel.vue (star display)
├── SpellCardLayout.vue (Spell-specific layout)
│   ├── SpellTrapHeader.vue
│   └── SpellTrapFooter.vue
└── TrapCardLayout.vue (Trap-specific layout)
    ├── SpellTrapHeader.vue
    └── SpellTrapFooter.vue
```

### Styling Architecture

- Global styles in `src/style.css`
- CSS variables for theming in `src/styles/variables.css`
- Tailwind CSS v4 configured via `@tailwindcss/vite` plugin
- Component-specific styles within each component
- Print-ready card designs following standard trading card dimensions (2.5" x 3.5")

### Database Schema

The `cards` table in Supabase includes:
- Basic fields: `id`, `name`, `card_type`, `isLegendary`
- Monster-specific: `attribute`, `level`, `monster_type`, `card_subtype`, `atk`, `def`
- Text content: `description`, `effect_text`
- Media: `image_url`, `card_code`
- Metadata: `created_by`, `created_at`, `updated_at`

### Key Design Considerations

1. **Conditional Rendering**: Card layout changes based on `card_type` (Monster/Spell/Trap)
2. **Responsive Design**: Cards scale appropriately for different display contexts
3. **Print Optimization**: Cards follow standard trading card print specifications:
   - Final card size: 2.5" x 3.5"
   - Bleed area: 0.125" per side (full bleed: 2.75" x 3.75")
   - Safety area: 2.25" x 3.25"
   - Print resolution: 300 DPI
4. **Image Handling**: 
   - Web: Optimized images (JPEG/WebP) at 72-96 DPI
   - Print: High-resolution versions at 300 DPI
5. **Legendary Cards**: Special gold border styling for cards marked as legendary
6. **Typography Hierarchy**:
   - Card name: 12-18pt
   - Stats (ATK/DEF): 9-11pt
   - Card type/attribute: 9-11pt
   - Effect text: 7.5-10pt
   - Description: 7-9pt
   - Card code: 6-8pt
7. **Color Management**: RGB for web display, CMYK considerations for print

### Environment Setup

The project expects a `src/supabase.js` file with Supabase configuration (not included in version control).

## Important Development Notes

- The project uses Vue 3's Composition API with `<script setup>` syntax
- Vite aliases `@` to the `src` directory
- Vue Devtools plugin is enabled for development

## Testing Strategy

The project uses Vitest for unit testing with Vue Test Utils:

```bash
npm test                # Run all tests
npm test:ui            # Run tests with UI
npm test:coverage      # Run tests with coverage report
```

Test structure:
- Unit tests: `src/tests/unit/`
- Test utilities: `src/tests/utils/`
- Mock data: `src/tests/utils/cardMocks.js`

Tests use `@vue/test-utils` for component testing and follow test-driven development practices.