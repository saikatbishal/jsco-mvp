import React from 'react';
import { BellIcon } from './icons';
import { AuthenticatedUser } from '../types';

interface SalesHeaderProps {
    currentUser: AuthenticatedUser;
    onLogout: () => void;
}

const SalesHeader: React.FC<SalesHeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-sm z-10 border-b">
      <div className="max-w-full mx-auto py-3 px-8 flex justify-end items-center">
        <div className="flex items-center space-x-6">
          <p className="text-sm font-semibold text-gray-600">Sales Executive Dashboard</p>
          <button className="relative p-1 rounded-full text-gray-400 hover:text-gray-500">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>
          <div className="flex items-center space-x-3">
             <img
                className="h-9 w-9 rounded-full"
                src="https://i.pravatar.cc/150?u=sales@dws.com"
                alt="User avatar"
             />
             <div>
                <p className="text-sm font-medium text-gray-800 text-left">John Smith</p>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SalesHeader;