import React, { useState, useEffect } from 'react';
import { Task, User } from '../types';
import { XMarkIcon } from './icons';

interface AssignTaskModalProps {
    task: Task | null;
    teamMembers: User[];
    currentUser: User;
    onClose: () => void;
    onAssign: (task: Task, assignees: User[]) => void;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ task, teamMembers, currentUser, onClose, onAssign }) => {
    const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (task) {
            setSelectedUserIds(new Set(task.assignees.map(a => a.id)));
        }
    }, [task]);

    if (!task) return null;

    const handleCheckboxChange = (userId: string) => {
        const newSelection = new Set(selectedUserIds);
        if (newSelection.has(userId)) {
            newSelection.delete(userId);
        } else {
            newSelection.add(userId);
        }
        setSelectedUserIds(newSelection);
    };

    const handleAssign = () => {
        const allUsers = [...teamMembers, currentUser];
        const selectedUsers = allUsers.filter(member => selectedUserIds.has(member.id));
        onAssign(task, selectedUsers);
    };

    const assignToMe = () => {
        setSelectedUserIds(new Set([currentUser.id]));
    };
    
    const assignToTeam = () => {
        setSelectedUserIds(new Set(teamMembers.map(m => m.id)));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Assign Task</h2>
                        <p className="text-sm text-gray-500">{task.name}</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="flex items-center space-x-2 mb-4">
                        <button onClick={assignToMe} className="flex-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-100">Assign to Me</button>
                        <button onClick={assignToTeam} className="flex-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-100">Assign to Team</button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Team Members</p>
                    <div className="space-y-2">
                        {teamMembers.map(member => (
                            <label key={member.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedUserIds.has(member.id)}
                                    onChange={() => handleCheckboxChange(member.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full mx-2"/>
                                <span className="text-sm font-medium text-gray-700">{member.name}</span>
                                <span className="text-xs text-gray-500 ml-auto">{member.role}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleAssign}
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Save Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignTaskModal;
