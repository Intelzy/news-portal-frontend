"use client";

import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ShareButtons({ title, slug }) {
  // Construct the full URL for sharing
  const url = typeof window !== 'undefined' ? `${window.location.origin}/news/${slug}` : '';

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <Facebook size={20} />,
      className: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: <Twitter size={20} />,
      className: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <Linkedin size={20} />,
      className: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-semibold text-gray-600">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={`text-white p-2 rounded-full transition-colors duration-200 ${link.className}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}