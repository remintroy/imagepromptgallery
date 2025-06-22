'use client';

import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { PromptModal } from './PromptModal';
import { GalleryImage } from '../types';
import api from '@/lib/axios';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface GalleryPageProps {
  initialData: GalleryImage[];
  initialPagination: Pagination;
}

export function GalleryPage({ initialData, initialPagination }: GalleryPageProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialData);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const loadMore = async () => {
    if (!pagination.hasMore || loading) return;
    setLoading(true);
    const nextPage = pagination.page + 1;
    try {
      const res = await api.get(`/api/image-prompts?page=${nextPage}&limit=${pagination.limit}`);
      setImages((prev) => [...prev, ...res.data.data]);
      setPagination(res.data.pagination);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {pagination.hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      {isModalOpen && selectedImage && (
        <PromptModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
} 