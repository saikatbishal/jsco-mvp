import React, { useState } from 'react';
import { XMarkIcon } from './icons';

interface ModalProps {
    action: string;
    onClose: () => void;
    onSubmit: (comment: string) => void;
}

const MandatoryCommentModal: React.FC<ModalProps> = ({ action, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Reason for Action: {action}</h2>
                        <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                            <XMarkIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="p-6">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                            Explain reason (required)
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Provide a clear and concise reason for this action..."
                            required
                        />
                         <p className="text-xs text-gray-500 mt-1">This comment will be added to the task's conversation log.</p>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MandatoryCommentModal;
