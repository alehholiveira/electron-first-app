import React, { useState } from 'react';

const DropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center p-2 text-sm font-medium text-center    dark:text-white bg-transparent hover:bg-transparent focus:ring-transparent"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="z-10 divide-y rounded-lg shadow w-42 bg-gradient-to-r from-white  to-black divide-gray-600"
        >
          <ul className="py-2  dark:text-white" aria-labelledby="dropdownMenuIconButton">
            <li>
              <a href="#" className="block px-4 py-2  hover:bg-purple-500 hover:text-white">
                Editar
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Deletar
              </a>
            </li>
            
          </ul>
        
        </div>
      )}
    </div>
  );
};

export default DropdownButton;