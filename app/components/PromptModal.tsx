'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '../types';

interface PromptModalProps {
  image: GalleryImage;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptModal({ image, isOpen, onClose }: PromptModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
    } else {
      document.body.style.overflow = 'auto';
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(image.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[95vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transition-all duration-300 transform flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-start justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-1">
            <h2 id="prompt-modal-title" className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              Image Prompt
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
              {image.alt}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span>Image ID: {image.id}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Ready to copy</span>
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                  Creation Prompt
                </h3>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto ${
                    isCopied
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {image.prompt}
                </p>
              </div>

              {/* Prompt Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-2 sm:p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {image.prompt.split(' ').length}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Words</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {image.prompt.length}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Characters</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                    AI Ready
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-4 md:p-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-center sm:text-left text-slate-500 dark:text-slate-400">
            Click outside or press ESC to close
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 w-full sm:w-auto gap-3 sm:gap-0">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => {
                copyToClipboard();
                onClose();
              }}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Copy & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 