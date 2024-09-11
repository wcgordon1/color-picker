import Image from 'next/image';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center">
        <Image src="/images/logocolor.png" alt="Logo" width={35} height={35} />
        <h1 className="ml-2 text-xl font-bold">Color Picker</h1>
      </div>
      <div className="flex space-x-4">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl text-gray-600 hover:text-blue-500" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-2xl text-gray-600 hover:text-blue-400" />
        </a>
      </div>
    </header>
  );
};

export default Header;