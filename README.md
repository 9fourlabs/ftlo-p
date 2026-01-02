# Funeral Program Builder

A React web application for creating professional funeral programs. Users input loved one's information, upload photos, define the service timeline, then receive auto-filled editable templates they can customize and export.

## Features

- **Step-by-step wizard** for easy program creation
- **Photo upload** with drag & drop support
- **Customizable timeline** for order of service
- **Beautiful templates** with elegant typography
- **Live preview** of the final program
- **PDF export** for printing
- **Local storage** to preserve work across sessions

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **File Upload**: React Dropzone

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── steps/           # Wizard step components
│   │   ├── LovedOneStep.tsx
│   │   ├── FamilyStep.tsx
│   │   ├── ServiceStep.tsx
│   │   ├── PhotoUploadStep.tsx
│   │   ├── TimelineStep.tsx
│   │   ├── ObituaryStep.tsx
│   │   └── TemplateSelectStep.tsx
│   ├── templates/       # Program template components
│   │   └── ClassicEleganceTemplate.tsx
│   └── ui/             # Reusable UI components
├── store/              # Zustand state management
│   └── programStore.ts
├── pages/              # Main application pages
│   └── CreateProgram.tsx
└── lib/                # Utilities and helpers
```

## Wizard Steps

1. **Loved One Info** - Basic information (name, dates, places)
2. **Family Members** - Add children, siblings, spouse, parents
3. **Service Details** - Date, time, venue information
4. **Photo Upload** - Drag & drop photo uploads with preview
5. **Timeline** - Order of service with draggable events
6. **Obituary** - Life story and memorial text
7. **Template Selection** - Choose from available designs

## Design System

### Colors
- **Navy**: Primary brand color (`#1a2744`)
- **Cream**: Background and neutral (`#f8f6f1`)  
- **Gold**: Accent and highlights (`#c9a962`)
- **Rose**: Secondary accent (`#d4a5a5`)

### Typography
- **Display**: Cormorant Garamond (elegant serif for headers)
- **Body**: Source Sans 3 (readable sans-serif for content)

## Templates

### Classic Elegance
A traditional 4-page funeral program with:
- **Front Cover**: Photo, name, dates, service info on navy background
- **Page 2**: Obituary and family information  
- **Page 3**: Order of service timeline
- **Back Cover**: Photo collage and thank you message

## Future Enhancements

- [ ] Additional templates (Modern Grace, Celebration of Life)
- [ ] PDF export with high-quality rendering
- [ ] Express backend for photo storage
- [ ] User accounts and program saving
- [ ] Print ordering integration
- [ ] Mobile optimization
- [ ] Collaborative editing
- [ ] Payment processing

## Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run build && npm run preview  # Test production build locally
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern browsers with ES2020 support required for optimal experience.

## License

MIT License - feel free to use this project as a foundation for your own funeral program builder.
