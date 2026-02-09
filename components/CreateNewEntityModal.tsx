import React, { useState } from 'react';
import { XMarkIcon } from './icons';

interface CreateNewEntityModalProps {
    entityType: 'Agency' | 'Company';
    onClose: () => void;
    onSave: (name: string) => void;
}

const CreateNewEntityModal: React.FC<CreateNewEntityModalProps> = ({ entityType, onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Create New {entityType}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-6">
                    <label htmlFor="entity-name" className="block text-sm font-medium text-gray-700 mb-2">
                        {entityType} Name
                    </label>
                    <input
                        id="entity-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Enter ${entityType.toLowerCase()} name`}
                        required
                        autoFocus
                    />
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Save {entityType}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewEntityModal;
