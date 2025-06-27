# Image Prompt Gallery

A modern, responsive web application for displaying AI-generated images with their creation prompts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🖼️ **Pinterest-style Masonry Layout**: Responsive grid layout that adapts to different screen sizes
- 🎨 **Modern UI/UX**: Beautiful, polished interface with smooth animations and hover effects
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Interactive Modals**: Click on any image to view its creation prompt in a detailed modal
- 📋 **Copy to Clipboard**: One-click prompt copying functionality
- 🌙 **Dark Mode Support**: Automatic dark/light mode based on system preferences
- ⚡ **Fast Performance**: Optimized with Next.js and efficient image loading
- 🎯 **Accessibility**: Keyboard navigation and screen reader support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd imagepromptgallery
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Browse Images**: Scroll through the gallery to see all available images
2. **View Prompts**: Click on any image to open a modal with the creation prompt
3. **Copy Prompts**: Use the "Copy Prompt" button to copy the prompt to your clipboard
4. **Close Modal**: Click outside the modal, press ESC, or use the close button

## Project Structure

```
app/
├── components/
│   ├── ImageGallery.tsx    # Main gallery component with masonry layout
│   └── PromptModal.tsx     # Modal component for displaying prompts
├── types/
│   └── index.ts           # TypeScript type definitions
├── globals.css            # Global styles and custom utilities
├── layout.tsx             # Root layout component
└── page.tsx               # Main page component
```


## Data Structure

The application uses a simple data structure for images:

```typescript
interface GalleryImage {
  id: number;
  imageUrl: string;
  prompt: string;
  alt: string;
}
```

## Customization

### Adding New Images

To add new images to the gallery, update the `galleryData` array in `app/page.tsx`:

```typescript
const galleryData = [
  {
    id: 13,
    imageUrl: 'https://your-image-url.com/image.jpg',
    prompt: 'Your AI generation prompt here...',
    alt: 'Description of the image'
  },
  // ... more images
];
```

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind classes in the components
2. Adding custom CSS in `app/globals.css`
3. Updating the color scheme in the Tailwind configuration

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features and hooks

## Performance Features

- **Image Optimization**: Next.js Image component for optimized loading
- **Responsive Images**: Automatic sizing based on viewport
- **Lazy Loading**: Images load as they come into view
- **Code Splitting**: Automatic code splitting for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.
