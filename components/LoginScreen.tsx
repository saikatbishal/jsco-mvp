import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from './icons';
import { userCredentials, STATIC_PASSWORD } from '../constants';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => Promise<string | null>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const loginError = await onLogin(username, password);
    if (loginError) {
      setError(loginError);
    }
    setIsLoading(false);
  };

  const handleDemoUserClick = (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword(STATIC_PASSWORD);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">DWS</h1>
          <p className="text-sm text-gray-500">Digital Web Solutions</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="user@dws.com"
            />
          </div>
          <div className="relative">
            <label htmlFor="password-input" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
             <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md" role="alert">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="border-t pt-4">
            <h3 className="text-center text-xs font-semibold text-gray-500 uppercase">Demo Accounts</h3>
            <p className="text-center text-xs text-gray-400 mb-2">(Password is 123456)</p>
            <div className="space-y-2">
                {Object.entries(userCredentials).map(([demoUsername, role]) => (
                    <button 
                        key={demoUsername} 
                        onClick={() => handleDemoUserClick(demoUsername)}
                        className="w-full text-left text-sm p-2 rounded-md hover:bg-gray-100 flex justify-between items-center"
                    >
                        <div>
                            <span className="font-medium text-gray-700">{demoUsername}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{role}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;