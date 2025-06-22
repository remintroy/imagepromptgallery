'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageGallery } from './components/ImageGallery';
import { PromptModal } from '@/app/components/PromptModal';

// Sample data for the gallery
const galleryData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    prompt: 'A serene mountain landscape at sunset with golden light filtering through clouds, digital art style, highly detailed, 4k resolution',
    alt: 'Mountain landscape at sunset'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop',
    prompt: 'A futuristic cityscape with neon lights and flying cars, cyberpunk aesthetic, cinematic lighting, ultra-detailed',
    alt: 'Futuristic cityscape'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    prompt: 'A magical forest with glowing mushrooms and fairy lights, fantasy art style, ethereal atmosphere, mystical',
    alt: 'Magical forest'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=450&fit=crop',
    prompt: 'A steampunk airship floating above Victorian-era buildings, brass and copper details, steam-powered machinery',
    alt: 'Steampunk airship'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=550&fit=crop',
    prompt: 'An underwater palace made of coral and pearls, mermaid kingdom, bioluminescent creatures, ocean depths',
    alt: 'Underwater palace'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=650&fit=crop',
    prompt: 'A space station orbiting Earth, astronauts floating in zero gravity, stars and nebulas in background',
    alt: 'Space station'
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=480&fit=crop',
    prompt: 'A medieval castle on a floating island, waterfalls cascading into the void, fantasy architecture',
    alt: 'Floating castle'
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=580&fit=crop',
    prompt: 'A robot artist painting a masterpiece, oil on canvas, renaissance style, mechanical precision',
    alt: 'Robot artist'
  },
  {
    id: 9,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=520&fit=crop',
    prompt: 'A crystal cave with rainbow-colored stalactites, magical crystals glowing, underground wonder',
    alt: 'Crystal cave'
  },
  {
    id: 10,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
    prompt: 'A time-traveling Victorian explorer in a modern city, steam-powered time machine, anachronistic elements',
    alt: 'Time traveler'
  },
  {
    id: 11,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=540&fit=crop',
    prompt: 'A dragon made of flowers and leaves, nature spirit, organic textures, spring awakening',
    alt: 'Flower dragon'
  },
  {
    id: 12,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=490&fit=crop',
    prompt: 'A library floating in space, books orbiting around, knowledge and wisdom, cosmic library',
    alt: 'Space library'
  }
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: typeof galleryData[0]) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image Prompt Gallery
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Click on any image to view its creation prompt
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{galleryData.length} prompts available</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageGallery 
          images={galleryData} 
          onImageClick={handleImageClick} 
        />
      </main>

      {/* Footer */}
      <footer className="w-full flex items-center justify-center sticky bottom-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700" style={{ height: '40px' }}>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Powered by{' '}
          <a
            href="https://mastrovia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Mastrovia
          </a>
        </p>
      </footer>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <PromptModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
