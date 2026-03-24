'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppBubble() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20MIRA%2C%20I%20have%20a%20question%20about%20your%20sarees"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 lg:bottom-8 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />

        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110">
          <MessageCircle size={24} className="text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-dark-ink text-ivory text-xs font-dm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-dark-ink" />
        </div>
      </div>
    </a>
  )
}
