"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "../app/types";

interface ImageGalleryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1280) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const getColumns = () => {
    const cols: GalleryImage[][] = Array.from({ length: columns }, () => []);
    images.forEach((image, index) => {
      cols[index % columns].push(image);
    });
    return cols;
  };

  const organizedImages = getColumns();

  return (
    <div className="w-full">
      <div className={`columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-4 sm:p-4`}>
        {organizedImages.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((image) => (
              <div
                key={image?._id || image?.imageUrl}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => onImageClick(image)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onImageClick(image)}
              >
                {/* Image Container */}
                <div className="relative aspect-auto overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    width={400}
                    height={600}
                    // fill
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    // style={{
                    //   aspectRatio: "400 / 600", // Default aspect ratio
                    // }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Click to view prompt</span>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-xs">View</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {image.alt}
                  </h3>
                  <div className="mt-2 flex flex-col items-start gap-1 justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">ID: {image?._id}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Prompt Available</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/30 transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No images found</h3>
          <p className="text-slate-600 dark:text-slate-400">Add some images to get started with your prompt gallery.</p>
        </div>
      )}
    </div>
  );
}
