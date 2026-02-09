import React, { useState } from 'react';
import { TeamLeadSubtask, User, Task } from '../types';
import { XMarkIcon } from './icons';

interface CreateSubtaskModalProps {
    onClose: () => void;
    onSave: (newSubtask: TeamLeadSubtask) => void;
    teamMembers: User[];
    allTasks: Task[];
}

const CreateSubtaskModal: React.FC<CreateSubtaskModalProps> = ({ onClose, onSave, teamMembers, allTasks }) => {
    const [name, setName] = useState('');
    const [parentTaskId, setParentTaskId] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = () => {
        if (!name || !parentTaskId || !assigneeId || !deadline) {
            alert('Please fill all required fields.');
            return;
        }

        const parentTask = allTasks.find(t => t.id === parentTaskId);
        const assignee = teamMembers.find(m => m.id === assigneeId);

        if (!parentTask || !assignee) {
            alert('Invalid parent task or assignee selected.');
            return;
        }

        const newSubtask: TeamLeadSubtask = {
            id: `SUB-${Date.now()}`,
            name,
            parentTask: { id: parentTask.id, name: parentTask.name },
            assignee,
            deadline,
            approvalStatus: 'Pending',
            executionStatus: 'Not Started',
            timerStatus: 'Not Started',
            timeSpent: 0,
            qualityFlag: 'No Flag',
            outputRequirements: [],
            dependencies: '',
            attachments: [],
        };
        
        onSave(newSubtask);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Create New Subtask</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtask Name <span className="text-red-500">*</span></label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parent Task <span className="text-red-500">*</span></label>
                        <select value={parentTaskId} onChange={e => setParentTaskId(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="">Select a parent task</option>
                            {allTasks.map(task => <option key={task.id} value={task.id}>{task.name} ({task.project})</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assign To <span className="text-red-500">*</span></label>
                        <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="">Select a team member</option>
                            {teamMembers.map(member => <option key={member.id} value={member.id}>{member.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline <span className="text-red-500">*</span></label>
                        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Create Subtask</button>
                </div>
            </div>
        </div>
    );
};

export default CreateSubtaskModal;
