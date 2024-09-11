import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <Link href="/" className="flex items-center">
        <Image src="/images/logocolor.png" alt="Logo" width={35} height={35} />
        <h1 className="ml-2 text-xl font-bold">Color Picker</h1>
      </Link>
      <div className="flex space-x-4">
        <a href="https://x.com/helloIamWilly" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-2xl text-gray-600 hover:text-black" />
        </a>
        <a href="https://www.linkedin.com/in/will-gordon1/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl text-gray-600 hover:text-blue-500" />
        </a>
        <a href="https://github.com/wcgordon1/color-picker" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
      </div>
    </header>
  );
};

export default Header;