import dynamic from 'next/dynamic';
import Header from '../components/Header';
import { Toaster } from 'react-hot-toast';

const ColorPicker = dynamic(() => import('../components/ColorPicker'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <ColorPicker />
      </main>
      <Toaster position="bottom-center" />
    </div>
  );
}
