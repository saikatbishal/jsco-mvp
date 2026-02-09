import React, { useState } from 'react';
import { TeamLeadSubtask, Attachment } from '../types';
import { XMarkIcon, CheckIcon, HelpIcon, ArrowDownTrayIcon, DocumentTextIcon, CodeBracketIcon, PhotoIcon, DocumentIconSolid } from './icons';

interface SubtaskDetailModalProps {
    subtask: TeamLeadSubtask;
    onClose: () => void;
}

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium border-b-2 ${isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
    >
        {label}
    </button>
);

const AttachmentRow: React.FC<{ attachment: Attachment }> = ({ attachment }) => {
    const Icon = () => {
        switch (attachment.type) {
            case 'xlsx': return <DocumentTextIcon className="w-6 h-6 text-green-600" />;
            default: return <DocumentTextIcon className="w-6 h-6 text-gray-500" />;
        }
    };
    return (
        <div className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center space-x-2">
                <Icon />
                <span className="text-sm font-medium">{attachment.name}</span>
            </div>
            <button className="text-sm text-blue-600 hover:underline">Download</button>
        </div>
    );
};

const SubtaskDetailModal: React.FC<SubtaskDetailModalProps> = ({ subtask, onClose }) => {
    const [activeTab, setActiveTab] = useState('Details');
    
    const timeSpentFormatted = `${Math.floor(subtask.timeSpent / 3600)}h ${Math.floor((subtask.timeSpent % 3600) / 60)}m`;

    const DetailsTab: React.FC = () => (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div><p className="text-xs text-gray-500">APPROVAL</p><span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">{subtask.approvalStatus}</span></div>
                <div><p className="text-xs text-gray-500">EXECUTION</p><span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{subtask.executionStatus}</span></div>
                <div><p className="text-xs text-gray-500">TIMER STATUS</p><span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-md">{subtask.timerStatus}</span></div>
                <div><p className="text-xs text-gray-500">TIME SPENT</p><p className="font-semibold">{timeSpentFormatted}</p></div>
                <div><p className="text-xs text-gray-500">QUALITY FLAG</p><div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div><p className="font-semibold">{subtask.qualityFlag}</p></div></div>
                <div><p className="text-xs text-gray-500">DEADLINE</p><p className="font-semibold">{subtask.deadline}</p></div>
            </div>

            <div>
                <h4 className="font-semibold text-sm text-gray-800 mb-2">OUTPUT REQUIREMENTS</h4>
                <div className="space-y-2">
                    {subtask.outputRequirements.map((req, i) => (
                        <div key={i} className="flex items-center text-sm">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${req.completed ? 'bg-green-500' : 'border-2 border-gray-300'}`}>
                                {req.completed && <CheckIcon className="w-3 h-3 text-white" />}
                            </div>
                            <span>{req.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-sm text-gray-800 mb-2">DEPENDENCIES</h4>
                <div className="p-3 bg-gray-50 border rounded-md text-sm">{subtask.dependencies}</div>
            </div>

            <div>
                <h4 className="font-semibold text-sm text-gray-800 mb-2">ATTACHMENTS</h4>
                <div className="space-y-2">
                    {subtask.attachments.map(att => <AttachmentRow key={att.id} attachment={att} />)}
                </div>
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{subtask.name}</h2>
                        <p className="text-sm text-gray-500">{subtask.id}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                
                <div className="border-b">
                    <nav className="flex space-x-2 px-4">
                        <TabButton label="Details" isActive={activeTab === 'Details'} onClick={() => setActiveTab('Details')} />
                        <TabButton label="Conversation" isActive={activeTab === 'Conversation'} onClick={() => setActiveTab('Conversation')} />
                        <TabButton label="History" isActive={activeTab === 'History'} onClick={() => setActiveTab('History')} />
                    </nav>
                </div>

                <div className="flex-1 overflow-y-auto">
                   {activeTab === 'Details' && <DetailsTab />}
                   {/* Add other tab contents here */}
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                    <button className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
                        <HelpIcon className="w-6 h-6" />
                    </button>
                    <div className="flex space-x-2">
                        <button className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Approve</button>
                        <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Ask Clarification</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubtaskDetailModal;
