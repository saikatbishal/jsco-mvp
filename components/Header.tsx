import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BellIcon, ArrowRightOnRectangleIcon as LogoutIcon } from './icons';
import { AuthenticatedUser } from '../types';

interface HeaderProps {
    title: string;
    currentUser: AuthenticatedUser;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, currentUser, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);
  
  const getUsername = (email: string) => {
    switch(email) {
      case 'pm@dws.com': return 'Sarah Johnson';
      case 'member@dws.com': return 'Sarah Johnson';
      default: return email;
    }
  }


  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-baseline space-x-3">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          { title === 'Command Center' && <p className="text-sm text-gray-500">{formattedDate}</p> }
          { title !== 'Command Center' &&  <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 flex items-center justify-center text-xs text-white border-2 border-white"></span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-3 cursor-pointer">
               <img
                  className="h-9 w-9 rounded-full"
                  src={`https://i.pravatar.cc/150?u=${currentUser.username}`}
                  alt="User avatar"
               />
               <div>
                  <p className="text-sm font-medium text-gray-800 text-left">{getUsername(currentUser.username)}</p>
                  <p className="text-xs text-gray-500 text-left">{currentUser.role}</p>
               </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-20">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onLogout();
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogoutIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;