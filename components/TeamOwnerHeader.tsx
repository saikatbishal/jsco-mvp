import React from 'react';
import { BellIcon, ArrowRightOnRectangleIcon as LogoutIcon } from './icons';
import { AuthenticatedUser } from '../types';

interface TeamOwnerHeaderProps {
    title: string;
    currentUser: AuthenticatedUser;
    onLogout: () => void;
}

const TeamOwnerHeader: React.FC<TeamOwnerHeaderProps> = ({ title, currentUser, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">DWS</h1>
            <div className="w-px h-6 bg-gray-200"></div>
            <h2 className="text-lg font-medium text-gray-600">{title}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-500" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">9</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">SM</div>
            <div>
                <p className="text-sm font-semibold text-gray-800">Sarah Mitchell</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <button onClick={onLogout}>
                <LogoutIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeamOwnerHeader;
