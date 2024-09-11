import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Color Picker - Extract Colors from Images',
  description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
  icons: {
    icon: '/favicon.ico',  // Favicon
    apple: '/images/logocolor.png',  // Apple touch icon
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/images/logocolor.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/images/logocolor.png',
      },
    ],
  },
  manifest: '/site.webmanifest',  // Web manifest

  openGraph: {
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    url: 'https://www.colorpicker.photos',
    type: 'website',
    images: [
      {
        url: 'https://www.colorpicker.photos/images/ogimage1.png',
        width: 2064,
        height: 1628,
        alt: 'Color Picker App',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@helloIamWilly',
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    images: ['https://www.colorpicker.photos/images/ogimage1.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Simple Analytics Script */}
        <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        <noscript><img src="https://simpleanalyticscdn.com/noscript.gif" alt=""/></noscript>
        {children}
      </body>
    </html>
  );
}
