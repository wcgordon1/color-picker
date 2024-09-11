import { Inter } from 'next/font/google';
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
        url: 'https://www.colorpicker.photos/images/og-image1.png',
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
    images: ['https://www.colorpicker.photos/mages/og-image1.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="https://www.colorpicker.photos/images/logocolor.png" sizes="any" />
        
        {/* Meta tags */}
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />

        {/* Simple Analytics Script */}
        <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
