import React, { useState } from 'react';
import { Deal } from '../types';
import { XMarkIcon } from './icons';

interface DealDetailPanelProps {
    deal: Deal;
    onClose: () => void;
    onConvertToProject: (deal: Deal) => void;
}

const DealDetailPanel: React.FC<DealDetailPanelProps> = ({ deal, onClose, onConvertToProject }) => {
    const [isCallCompleted, setIsCallCompleted] = useState(deal.introCallStatus === 'Done');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{deal.dealName}</h2>
                        <p className="text-sm text-gray-500">{deal.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Read-only details */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Client Info</h3>
                        <div className="text-sm bg-gray-50 p-4 rounded-md border grid grid-cols-2 gap-4">
                            <div><p className="text-gray-500">Name:</p><p className="font-medium">{deal.clientDetails?.name}</p></div>
                            <div><p className="text-gray-500">URL:</p><p className="font-medium text-blue-600">{deal.clientDetails?.url}</p></div>
                            <div><p className="text-gray-500">Email:</p><p className="font-medium">{deal.clientDetails?.email}</p></div>
                            <div><p className="text-gray-500">Phone:</p><p className="font-medium">{deal.clientDetails?.phone}</p></div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Services</h3>
                        <ul className="text-sm bg-gray-50 p-4 rounded-md border list-disc list-inside">
                           {deal.services.map(s => <li key={s.id}>{s.name}</li>)}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Sale Info</h3>
                        <div className="text-sm bg-gray-50 p-4 rounded-md border grid grid-cols-2 gap-4">
                             <div><p className="text-gray-500">Sale Type:</p><p className="font-medium">{deal.saleType}</p></div>
                             <div><p className="text-gray-500">Sales Owner:</p><p className="font-medium">{deal.salesPerson}</p></div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Notes from Sales</h3>
                        <div className="text-sm bg-gray-50 p-4 rounded-md border">{deal.salesNotes || 'No notes provided.'}</div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Risk Indicators</h3>
                        <div className="text-sm bg-gray-50 p-4 rounded-md border">
                            <p className="font-medium">Tags:</p>
                             <div className="flex flex-wrap gap-2 mt-1">
                                {deal.clientRisk?.tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">{tag}</span>)}
                            </div>
                            <p className="font-medium mt-3">Comments:</p>
                            <p>{deal.clientRisk?.comments}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Internal PM Notes</h3>
                        <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Add internal notes for the project team..."></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isCallCompleted}
                                onChange={(e) => setIsCallCompleted(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-700">Intro call completed</span>
                        </label>
                    </div>

                </div>

                <div className="p-4 bg-gray-50 border-t">
                    <button
                        onClick={() => onConvertToProject(deal)}
                        disabled={!isCallCompleted}
                        className="w-full px-4 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Convert Services into Projects
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DealDetailPanel;
