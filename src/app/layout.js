import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Color Picker - Extract Colors from Images',
  description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
  openGraph: {
    type: 'website',
    url: 'https://www.colorpicker.photos',
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    images: [
      {
        url: 'https://www.colorpicker.photos/images/ogimage1.png',
        width: 2064,
        height: 1628,
        alt: 'Color Picker App',
      },
    ],
    siteName: 'Color Picker',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@helloIamWilly',
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    images: ['https://www.colorpicker.photos/images/ogimage1.png'],
  },
  icons: {
    icon: '/images/logocolor.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}