import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Color Picker - Extract Colors from Images',
  description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
  openGraph: {
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    images: [
      {
        url: 'https://images/og-image.jpg',
        width: 2064,
        height: 1628,
        alt: 'Color Picker App',
      },
    ],
    site_name: 'Color Picker',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@helloIamWilly',
    title: 'Color Picker - Extract Colors from Images',
    description: 'Upload an image and extract its color palette. Perfect for designers and developers.',
    images: ['https://images/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
