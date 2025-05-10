/*

Image as a banner
Author: HERVET Thibaut

*/
import React from 'react';
import photos from '@/data/photos.json';

/**
 * BannerImage component selects a random photo from photos.json
 * and renders it with a caption. Designed for use in pages.
 */
export default function BannerImage() {
  const randomIndex = Math.floor(Math.random() * photos.length);
  const img = photos[randomIndex];

  return (
    <div className="mb-6">
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-64 object-cover rounded-lg"
      />
      <p className="mt-2 text-center text-sm text-gray-500">
        {img.caption}
      </p>
    </div>
  );
}
