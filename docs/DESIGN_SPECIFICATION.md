# 🎨 Design Specification - User Profile Page

## Design Philosophy

**Modern Glassmorphism** with smooth animations and mobile-first responsive design.

---

## Color System

### Primary Colors
```
Primary:        #6366f1  (RGB: 99, 102, 241)   - Main brand color (Indigo)
Primary Dark:   #4f46e5  (RGB: 79, 70, 229)    - Hover state
Primary Light:  #818CF8  (RGB: 129, 140, 248)  - Disabled state
```

### Status Colors
```
Success:        #10b981  (RGB: 16, 185, 129)   - Verified badge
Danger:         #ef4444  (RGB: 239, 68, 68)    - Delete action
Warning:        #f59e0b  (RGB: 245, 158, 11)   - Alerts
```

### Neutral Colors
```
Text Primary:   #1f2937  (RGB: 31, 41, 55)     - Headings, main text
Text Secondary: #6b7280  (RGB: 107, 114, 128)  - Secondary text, labels
Gray-300:       #d1d5db  (RGB: 209, 213, 219)  - Borders
Gray-100:       #f3f4f6  (RGB: 243, 244, 246)  - Light backgrounds
```

### Backgrounds
```
Body:           Linear gradient (135deg)
                From: #667eea (102, 126, 234)
                To:   #764ba2 (118, 75, 162)

Card:           rgba(255, 255, 255, 0.8)      - Glassmorphism
Card Border:    rgba(255, 255, 255, 0.4)
Overlay:        rgba(0, 0, 0, 0.6)            - Modal overlay
```

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", 
             "Segoe UI Emoji", "Segoe UI Symbol";
```

### Font Sizes & Weights
```
Display:        32px | Weight: 700 | Line-height: 1.2   (Profile name)
Heading 1:      24px | Weight: 700 | Line-height: 1.3   (Section titles)
Heading 2:      22px | Weight: 700 | Line-height: 1.3   (Modal titles)
Body Large:     16px | Weight: 600 | Line-height: 1.5   (Detail values)
Body Regular:   14px | Weight: 400 | Line-height: 1.6   (Body text)
Label:          12px | Weight: 600 | Line-height: 1.4   (Form labels)
Caption:        12px | Weight: 500 | Line-height: 1.4   (Captions)
```

### Text Hierarchy
```
Headings (h1, h2):  700 weight, primary color
Body Text:          400-600 weight, secondary color
Labels:             600 weight, uppercase, secondary color
Links:              600 weight, primary color, underline on hover
```

---

## Spacing System

### Base Unit: 4px

```
xs:      4px   (0.25rem)
sm:      8px   (0.5rem)
md:      12px  (0.75rem)
lg:      16px  (1rem)
xl:      20px  (1.25rem)
2xl:     24px  (1.5rem)
3xl:     30px  (1.875rem)
4xl:     40px  (2.5rem)
```

### Common Spacing
```
Card padding:        30px (lg * 2 = 2rem)
Section gap:         25px (xl + sm = 1.56rem)
Button padding:      12px 24px (md 2xl = 0.75rem 1.5rem)
Field spacing:       8px between label & input
Modal margin:        20px (lg * 1.25)
```

---

## Shadows

### Shadow Levels
```
Shadow None:    None
Shadow SM:      0 1px 2px 0 rgba(0, 0, 0, 0.05)
Shadow MD:      0 4px 6px -1px rgba(0, 0, 0, 0.1)
Shadow LG:      0 10px 15px -3px rgba(0, 0, 0, 0.1)
Shadow XL:      0 20px 25px -5px rgba(0, 0, 0, 0.1)
Shadow 2XL:     0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Usage
```
Cards:              Shadow XL
Buttons:            Shadow MD / XL on hover
Modals:             Shadow 2XL
Inputs:             Shadow SM / MD on focus
Hover states:       Shadow LG
```

---

## Border Radius

```
None:           0px
XS:             4px  (Small buttons, inputs)
SM:             6px  (Badges, small elements)
MD:             8px  (Input fields, small cards)
LG:             12px (Form cards, sections)
XL:             15px (Larger components)
Full:           9999px (Circular avatars, pills)
```

### Application
```
Avatar:         radius-full (50% / 9999px)
Cards:          radius-lg to radius-xl (12px-15px)
Buttons:        radius-md to radius-lg (8px-12px)
Inputs:         radius-md (8px)
Modal:          radius-xl (15px)
Modals/Details: radius-xl (15px)
```

---

## Glassmorphism Design

### Card Style
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 15px;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Benefits
- Modern, elegant appearance
- Depth perception
- Smooth integration with background
- Professional look

### Implementation
- Use rgba colors for transparency
- Apply backdrop-filter: blur()
- Subtle borders for definition
- Appropriate shadows

---

## Animations

### Timing Functions
```
ease:           cubic-bezier(0.25, 0.46, 0.45, 0.94) - Default
ease-in:        cubic-bezier(0.42, 0, 1, 1)           - Start slow
ease-out:       cubic-bezier(0, 0, 0.58, 1)          - End slow
ease-in-out:    cubic-bezier(0.42, 0, 0.58, 1)       - Both ends slow
linear:         linear                                 - Constant speed
```

### Duration Guidelines
```
Fast:           0.15s - 0.3s   (Button clicks, hover)
Normal:         0.3s - 0.6s    (Component animations)
Slow:           0.8s - 1.5s    (Page transitions)
Very Slow:      2s+            (Skeleton shimmer)
```

### Animation Types

#### Page Load (Staggered)
```
Header:         opacity 0→1, scale 0.9→1 (0.6s, delay 0.1s)
Details Card:   opacity 0→1, y 20→0 (0.6s, delay 0.2s)
Buttons:        opacity 0→1, y 20→0 (0.6s, delay 0.3s)
```

#### Hover Effects
```
Cards:          translateY -2px, shadow increase (0.3s)
Buttons:        scale 1→1.05 (0.3s)
Links:          color fade, underline (0.3s)
```

#### Modal
```
Overlay:        opacity 0→1 (0.3s)
Content:        scale 0.8→1, opacity 0→1 (0.3s)
Close:          Reverse animation (0.2s)
```

#### Button Interaction
```
Hover:          scale 1→1.05 (0.1s)
Click:          scale 1→0.95 (0.1s)
Release:        scale 0.95→1 (0.1s)
```

#### Skeleton Loader
```
Animation:      Shimmer left to right (2s loop)
Curve:          linear
Direction:      ←→ repeating
```

---

## Component Specifications

### Profile Header
```
Layout:         Flex (horizontal on desktop, vertical on mobile)
Gap:            30px (desktop) / 15px (mobile)
Padding:        40px (desktop) / 30px (tablet) / 20px (mobile)
Border Radius:  20px
Background:     Glassmorphism
Height:         Auto
Alignment:      Center items
```

### Avatar
```
Size (Desktop):      140px
Size (Tablet):       110px
Size (Mobile):       90px
Shape:              Circle (border-radius: 50%)
Border:             4px solid primary color
Background:         Fallback color
Hover:              scale 1.05
```

### Verified Badge
```
Size:           45px diameter
Position:       Absolute bottom-right
Background:     Success green (#10b981)
Icon:           White ✓
Shadow:         box-shadow XL
Animation:      Scale in (0.5s)
```

### Detail Items (Grid)
```
Desktop Grid:   repeat(auto-fit, minmax(280px, 1fr))
Tablet Grid:    repeat(2, 1fr)
Mobile Grid:    1fr (single column)
Gap:            25px
Padding:        20px per item
Border:         1px solid primary-light
Hover:          Background color increase, translateY -2px
```

### Buttons
```
Padding:        14px 32px (desktop) / 12px 24px (mobile)
Border Radius:  12px
Font Size:      16px (desktop) / 14px (mobile)
Font Weight:    600
Cursor:         pointer
Min Width:      140px
Display:        Flex (center content with gap)

Primary Button:
  Background:   Linear gradient (primary → primary-dark)
  Color:        White
  Hover:        Shadow increase, scale 1.05
  Active:       Scale 0.95

Danger Button:
  Background:   Linear gradient (danger → dark-red)
  Color:        White
  Hover:        Shadow increase
  Active:       Scale 0.95
```

### Form Inputs
```
Padding:        12px 16px
Border:         2px solid border-color
Border Radius:  10px
Font Size:      14px
Background:     rgba(255, 255, 255, 0.8)
Transition:     0.3s ease all

Focus State:
  Border Color: Primary color
  Background:   White
  Shadow:       0 0 0 3px rgba(primary, 0.1)

Error State:
  Border Color: Danger color
  Background:   rgba(danger, 0.05)
  Shadow:       0 0 0 3px rgba(danger, 0.1)
```

### Modal
```
Position:       Fixed, centered
Overlay:        rgba(0, 0, 0, 0.6) with blur
Content Width:  500px (desktop) / 100% (mobile)
Max Height:     90vh
Border Radius:  20px (desktop) / 20px 20px 0 0 (mobile)
Background:     Glassmorphism
Padding:        40px (desktop) / 20px (mobile)
Animate:        Scale 0.8→1, opacity 0→1 (0.3s)
```

### Skeleton Loader
```
Background:     Linear shimmer gradient
Animation:      2s loop, linear timing
Item Heights:   Match real content
Spacing:        Match real content
Border Radius:  Match real content
```

---

## Responsive Breakpoints

### Desktop (≥ 1024px)
```
Profile Header:      Horizontal flex
Avatar:              140px
Grid Columns:        3
Font Sizes:          Full size
Padding:             40px
Spacing:             30px
```

### Tablet (768px - 1023px)
```
Profile Header:      Horizontal flex
Avatar:              110px
Grid Columns:        2
Font Sizes:          Slightly reduced
Padding:             30px
Spacing:             25px
```

### Mobile (≤ 767px)
```
Profile Header:      Vertical stack (centered)
Avatar:              90px
Grid Columns:        1
Font Sizes:          14-18px
Padding:             20px
Spacing:             15px
Modals:              Bottom sheet style
Buttons:             Full width
```

### Small Mobile (≤ 480px)
```
Avatar:              70px
Font Sizes:          12-16px
Padding:             15px
Spacing:             12px
Buttons:             Height 48px min
Icon Size:           18px
```

---

## Accessibility (a11y)

### Color Contrast
```
Text on Light:      WCAG AAA (contrast 7:1+)
Text on Dark:       WCAG AAA (contrast 7:1+)
Icons:              Match text color for readability
Links:              Underlined or colored
Status:             Not color-only (uses icons/text)
```

### Interactive Elements
```
Button Min Size:    48px × 48px (touch targets)
Link Min Size:      48px × 48px
Focus Visible:      2px outline, primary color
Focus Style:        Clear, visible indication
Tab Order:          Logical, top-to-bottom
```

### Semantic HTML
```
Headings:           h1, h2, h3 hierarchy
Labels:             Associated with inputs
Buttons:            <button> elements
Links:              <a> with href
Images:             alt text provided
Forms:              Proper structure, fieldsets
```

### ARIA Labels
```
Icon buttons:       aria-label="Action"
Status indicators:  aria-label="Verified"
Modals:             role="dialog", aria-modal="true"
Loading:            aria-busy="true"
Errors:             aria-describedby="error"
```

---

## Motion Guidelines

### Page Load
```css
Sequence:
  1. Body background appears (0s)
  2. Card appears with backdrop blur (0.1s)
  3. Header scales in + fades (0.6s @ 0.1s delay)
  4. Details card slides up + fades (0.6s @ 0.2s delay)
  5. Buttons slide up + fade (0.6s @ 0.3s delay)
  
Total Duration: ~1.5s
Feel: Smooth, professional
```

### User Interaction
```css
Hover:              0.2-0.3s ease (smooth)
Click:              0.1s ease (quick feedback)
Form Submit:        0.3s ease (loading state)
Modal Open/Close:   0.3s ease (snap)
Loading:            2s linear loop (shimmer)
```

---

## Dark Mode (Future)

### Planned Colors
```
Background:         #1a1a1a
Card:               #2d2d2d
Text Primary:       #f5f5f5
Text Secondary:     #b0b0b0
Border:             #404040
Primary:            #7c3aed (adjusted for contrast)
```

---

## File Organization

```
Profile.css (350 lines)
├── Root Variables
├── Container & Wrapper
├── Profile Header
├── Profile Image
├── Verified Badge
├── Details Card
├── Grid & Items
├── Action Buttons
├── Animations
├── Mobile Responsive
└── Utilities

UpdateProfileForm.css (150 lines)
├── Modal Overlay
├── Modal Content
├── Form Groups
├── Inputs & Validation
├── Error Messages
├── Action Buttons
└── Mobile Responsive

DeleteConfirmationModal.css (140 lines)
├── Modal Overlay
├── Modal Content
├── Icons & Messages
├── Action Buttons
├── Animations
└── Mobile Responsive

ProfileSkeleton.css (80 lines)
├── Skeleton Animations
├── Placeholder Shapes
├── Grid Layout
└── Mobile Responsive
```

---

## Performance Considerations

### CSS
- ✅ Hardware-accelerated animations (transform, opacity)
- ✅ Minimal repaints (backdrop-filter performance)
- ✅ Efficient selectors
- ✅ Minimal media queries

### Images
- ✅ SVG for icons (scalable)
- ✅ Compressed avatars
- ✅ Lazy loading support
- ✅ Responsive images

### Animations
- ✅ 60 FPS target
- ✅ GPU-accelerated properties only
- ✅ Proper easing functions
- ✅ Duration within guidelines

---

## Testing Checklist

- [ ] Colors meet WCAG contrast requirements
- [ ] Fonts render correctly at all sizes
- [ ] Spacing is consistent across components
- [ ] Shadows create proper depth
- [ ] Animations run smoothly (60 FPS)
- [ ] Responsive at all breakpoints
- [ ] Touch targets are 48px minimum
- [ ] Focus states are visible
- [ ] Form validation styling works
- [ ] Icons scale properly
- [ ] Modal animations are smooth
- [ ] Loading states are clear

---

This design specification ensures consistency, accessibility, and professional appearance across the entire Profile page.
