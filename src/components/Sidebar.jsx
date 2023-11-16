import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, UsersIcon, UserCircleIcon} from '@heroicons/react/outline'; 
import logo from '../assets/logo.jpeg';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <> 
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <MenuIcon className="flex-shrink-0 w-6 h-6 mt-6 ml-4" />
      </button>

      <div
        ref={sidebarRef}
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } hs-overlay hs-overlay-open:translate-x-0 transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] md:w-72 w-48 bg-white border-e border-gray-300 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 `}
      >
        <div className="px-6">
          <Link to="/">
          <img src={logo} alt='logo' className='md:w-16 md:h-16 w-12 h-12 '/>
          </Link>
        </div>
        <nav className="p-6 w-full flex flex-col flex-wrap">
          <ul className="space-y-1.5">
            <li>
              <Link to='/userdetails'>
              <button
                type="button"
                className={`w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 md:text-lg text-sm text-gray-700 rounded-lg font-semibold ${
                  activeItem === 'users' ? 'bg-green-100' : 'hover:bg-green-100'
                }`}
                onClick={() => handleItemClick('users')}
              >
                <UsersIcon className="md:w-6 md:h-6 w-4 h-4" />
                Users
              </button>
              </Link>
            </li>

            <li>
              <Link to='/createaccount'>
              <button
                type="button"
                className={`w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 md:text-lg text-sm text-gray-700 rounded-lg font-semibold ${
                  activeItem === 'account' ? 'bg-green-100' : 'hover:bg-green-100'
                }`}
                onClick={() => handleItemClick('account')}
              >
                <UserCircleIcon className="md:w-6 md:h-6 w-4 h-4" />
                Account
              </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
