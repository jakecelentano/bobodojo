# Test-Driven Card System Overhaul Plan

## Phase 1: Test Infrastructure Setup
- [ ] Set up Vitest for unit testing  
- [ ] Set up Playwright for E2E testing
- [ ] Create test utilities for card data mocking
- [ ] Establish visual regression testing baseline

## Phase 2: Component Architecture Tests & Implementation

### Core Layout Components

1. **CardFrame.vue Enhancements**
   - Tests:
     - [ ] Frame color changes based on attribute (LIGHT=yellow, DARK=purple, etc.)
     - [ ] Legendary gold border variant
     - [ ] Proper bleed area handling for print
   - Implementation:
     - [ ] Attribute-based color mapping system
     - [ ] Dynamic border styling with CSS variables
     - [ ] Print-safe gradient implementations

2. **CardImage.vue Overhaul**
   - Tests:
     - [ ] Responsive image sizing with thin bezels
     - [ ] Lazy loading for web performance
     - [ ] High-res image switching for print mode
   - Implementation:
     - [ ] Picture element with multiple sources
     - [ ] Print-resolution image handling
     - [ ] Dynamic aspect ratio management

3. **MonsterCardLayout.vue Redesign**
   - Tests:
     - [ ] Simplified level display (number in circle)
     - [ ] Prominent ATK/DEF boxes with colored backgrounds
     - [ ] Type/subtype header formatting
     - [ ] Legend tag positioning
   - Implementation:
     - [ ] New header layout structure
     - [ ] Stats display component
     - [ ] Flexible layout for optional elements

### Typography & Text Components

4. **CardText.vue Enhancement**
   - Tests:
     - [ ] Font size hierarchy compliance
     - [ ] Text truncation for overflow
     - [ ] Line height and spacing standards
   - Implementation:
     - [ ] CSS custom properties for type scales
     - [ ] Text clamping utilities
     - [ ] Print-specific font adjustments

## Phase 3: Print System Implementation

### Print-Specific Features

5. **Print Stylesheet Development**
   - Tests:
     - [ ] Correct physical dimensions (2.5" x 3.5")
     - [ ] Bleed area extension (0.125" per side)
     - [ ] Safety margin compliance
     - [ ] Color space considerations
   - Implementation:
     - [ ] @media print rules
     - [ ] Page size and margin settings
     - [ ] High-resolution image switching

6. **PDF Generation Module**
   - Tests:
     - [ ] Multi-card layout per page
     - [ ] Crop marks and bleed handling
     - [ ] Font embedding
   - Implementation:
     - [ ] Client-side PDF generation with jsPDF
     - [ ] Server-side option for CMYK conversion
     - [ ] Print preview functionality

## Phase 4: Design System & Consistency

### Visual Design Standards

7. **Design Token System**
   - Tests:
     - [ ] Color palette consistency
     - [ ] Typography scale validation
     - [ ] Spacing unit compliance
   - Implementation:
     - [ ] CSS custom properties
     - [ ] Tailwind config extension
     - [ ] Component property mapping

8. **Icon & Symbol Library**
   - Tests:
     - [ ] Attribute emblems rendering
     - [ ] Card type icons
     - [ ] Scalability for different sizes
   - Implementation:
     - [ ] SVG icon components
     - [ ] Dynamic coloring system
     - [ ] Print-safe vector graphics

## Phase 5: Performance & Optimization

### Web Performance

9. **Image Optimization Pipeline**
   - Tests:
     - [ ] Responsive image loading
     - [ ] Format selection (WebP/JPEG fallback)
     - [ ] Lazy loading implementation
   - Implementation:
     - [ ] Image CDN integration
     - [ ] Progressive enhancement
     - [ ] Cache optimization

### Print Performance

10. **Print Optimization**
    - Tests:
      - [ ] Print job size limits
      - [ ] Memory usage during generation
      - [ ] Cross-browser compatibility
    - Implementation:
      - [ ] Chunked PDF generation
      - [ ] Image compression strategies
      - [ ] Background print processing

## Phase 6: User Experience Enhancements

### Interactive Features

11. **Card Editor Improvements**
    - Tests:
      - [ ] Real-time preview updates
      - [ ] Field validation
      - [ ] Image upload/crop functionality
    - Implementation:
      - [ ] Live preview component
      - [ ] Form validation rules
      - [ ] Image manipulation tools

12. **Print Preview System**
    - Tests:
      - [ ] Accurate print representation
      - [ ] Multiple card layouts
      - [ ] Page break handling
    - Implementation:
      - [ ] Print preview modal
      - [ ] Layout options UI
      - [ ] Export settings panel

## Testing Strategy

### Unit Tests
- Component isolation with props/events
- Style computation verification
- Data transformation logic

### Integration Tests
- Component composition
- Print stylesheet application
- PDF generation workflow

### E2E Tests
- Full card creation flow
- Print preview functionality
- Export/download features

### Visual Regression Tests
- Card layout consistency
- Print output comparison
- Cross-browser rendering

## Implementation Schedule

**Week 1-2**: Test infrastructure and core layout components
**Week 3-4**: Typography system and text components
**Week 5-6**: Print system implementation
**Week 7-8**: Design system and visual standards
**Week 9-10**: Performance optimization
**Week 11-12**: User experience enhancements

## Success Metrics

1. **Visual Fidelity**: Cards match Rush Duel styling at 95%+ accuracy
2. **Print Quality**: 300 DPI output with correct dimensions
3. **Performance**: Sub-3 second card generation time
4. **Compatibility**: Works across major browsers and print services
5. **Maintainability**: 80%+ test coverage with clear documentation