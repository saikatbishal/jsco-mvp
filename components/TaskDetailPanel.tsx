import React, { useState } from 'react';
import { Task, Subtask, TaskConversationMessage, TaskHistoryEntry, User } from '../types';
import { subtasksData, conversationData, taskHistoryData } from '../constants';
import { XMarkIcon, PaperclipIcon, PaperAirplaneIcon } from './icons';
import AssignTaskModal from './AssignTaskModal';


interface TaskDetailPanelProps {
    task: Task;
    onClose: () => void;
    onUpdateTask: (updatedTask: Task) => void;
    currentUser: User;
    teamMembers: User[];
}

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium border-b-2 ${isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
    >
        {label}
    </button>
);

const DetailsTab: React.FC<{
    task: Task;
    currentUser: User;
    onAssignClick: () => void;
}> = ({ task, currentUser, onAssignClick }) => {
    const isFreshTask = task.assignees.length === 1 && task.assignees[0].id === currentUser.id;

    return (
        <div>
            <div className="p-4 space-y-4">
                <div><h4 className="text-xs text-gray-500">Task Name</h4><p className="text-sm font-medium">{task.name}</p></div>
                <div><h4 className="text-xs text-gray-500">Project</h4><p className="text-sm font-medium">{task.project}</p></div>
                <div><h4 className="text-xs text-gray-500">Project Manager</h4><p className="text-sm font-medium">{task.pm?.name}</p></div>
                <div><h4 className="text-xs text-gray-500">Task Owner(s)</h4><p className="text-sm font-medium">{task.assignees.map(a => a.name).join(', ')}</p></div>
                <div><h4 className="text-xs text-gray-500">Deadline</h4><p className="text-sm font-medium">{task.dueDate}</p></div>
                <div><h4 className="text-xs text-gray-500">Execution Status</h4><p className="text-sm font-medium">{task.executionStatus}</p></div>
            </div>
            <div className="p-4 border-t space-y-3">
                <h4 className="text-xs text-gray-500 uppercase font-semibold">Actions</h4>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={onAssignClick}
                        className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                        {isFreshTask ? 'Assign Task' : 'Re-assign Task'}
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Hold Task
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Archive Task
                    </button>
                </div>
            </div>
        </div>
    );
};

const SubtasksTab: React.FC = () => (
    <div className="p-4 space-y-2">
        {subtasksData.map(subtask => (
            <div key={subtask.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                <input type="checkbox" checked={subtask.status === 'Completed'} readOnly className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                <span className="ml-3 text-sm flex-1">{subtask.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${subtask.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{subtask.status}</span>
            </div>
        ))}
    </div>
);

const ConversationTab: React.FC = () => (
    <div className="p-4 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {conversationData.map(msg => (
                <div key={msg.id} className="flex flex-col">
                     <div className="flex items-baseline space-x-2">
                        <p className="font-semibold text-sm">{msg.sender.name}</p>
                        <p className="text-xs text-gray-400">{msg.sender.role}</p>
                        <p className="text-xs text-gray-400">{msg.timestamp}</p>
                    </div>
                    <div className={`p-2 rounded-lg text-sm mt-1 ${msg.type === 'System' ? 'bg-gray-100 text-gray-600 italic' : 'bg-blue-50 text-gray-800'}`}>
                       {msg.type === 'System' && <span className="font-semibold">System Audit: </span>}
                       {msg.message}
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-4 border-t pt-4">
            <textarea placeholder="Type your message here... @PM, @AssignedMember" rows={3} className="w-full p-2 border border-gray-300 rounded-md text-sm"></textarea>
            <div className="flex justify-between items-center mt-2">
                <button className="p-2 text-gray-500 hover:text-gray-700"><PaperclipIcon className="w-5 h-5"/></button>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 flex items-center space-x-2">
                    <PaperAirplaneIcon className="w-4 h-4" />
                    <span>Send</span>
                </button>
            </div>
        </div>
    </div>
);

const HistoryTab: React.FC = () => (
     <div className="p-4">
        <div className="relative pl-4 border-l-2 border-gray-200">
            {taskHistoryData.map(entry => (
                <div key={entry.id} className="mb-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                    <p className="text-sm text-gray-800">{entry.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{entry.timestamp} by {entry.user}</p>
                </div>
            ))}
        </div>
    </div>
);

const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({ task, onClose, onUpdateTask, currentUser, teamMembers }) => {
    const [activeTab, setActiveTab] = useState('Details');
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);

    const handleAssign = (taskToUpdate: Task, assignees: User[]) => {
        onUpdateTask({ ...taskToUpdate, assignees });
        setAssignModalOpen(false);
    };

    const renderTabContent = () => {
        switch(activeTab) {
            case 'Details': return <DetailsTab task={task} currentUser={currentUser} onAssignClick={() => setAssignModalOpen(true)} />;
            case 'Subtasks': return <SubtasksTab />;
            case 'Conversation': return <ConversationTab />;
            case 'History': return <HistoryTab />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{task.name}</h3>
                    <p className="text-xs text-gray-500">{task.id}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div>
            {/* Tabs */}
            <div className="border-b">
                <nav className="flex space-x-2 px-2">
                    <TabButton label="Details" isActive={activeTab === 'Details'} onClick={() => setActiveTab('Details')} />
                    <TabButton label="Subtasks" isActive={activeTab === 'Subtasks'} onClick={() => setActiveTab('Subtasks')} />
                    <TabButton label="Conversation" isActive={activeTab === 'Conversation'} onClick={() => setActiveTab('Conversation')} />
                    <TabButton label="History" isActive={activeTab === 'History'} onClick={() => setActiveTab('History')} />
                </nav>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {renderTabContent()}
            </div>

            {isAssignModalOpen && (
                <AssignTaskModal
                    task={task}
                    teamMembers={teamMembers}
                    currentUser={currentUser}
                    onClose={() => setAssignModalOpen(false)}
                    onAssign={handleAssign}
                />
            )}
        </div>
    );
};

export default TaskDetailPanel;