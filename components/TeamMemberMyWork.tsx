import React from 'react';
import { Screen } from '../App';
import { Task } from '../types';
import { teamMemberMyWorkData } from '../constants';
import { SearchIcon, HelpIcon } from './icons';

interface TeamMemberMyWorkProps {
    setActiveScreen: (screen: Screen) => void;
    setSelectedTask: (task: Task) => void;
}

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
    const colors = {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Low': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colors[priority as keyof typeof colors]}`}>{priority}</span>;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
        'Not Started': 'bg-gray-200 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Blocked': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
}

const ReviewStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    if (!status) return <span className="text-gray-400">—</span>;
    const colors = {
        'Under Review': 'bg-yellow-100 text-yellow-800',
        'Rework Requested': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
};


const TeamMemberMyWork: React.FC<TeamMemberMyWorkProps> = ({ setActiveScreen, setSelectedTask }) => {

    const handleOpenTask = (taskName: string) => {
        const taskToOpen = teamMemberMyWorkData.find(t => t.name === taskName);
        if (taskToOpen) {
            setSelectedTask(taskToOpen as unknown as Task);
        }
    }

    const getActionColor = (action: string) => {
        switch (action) {
            case 'Start Rework':
                return 'text-red-600';
            case 'Start':
                return 'text-green-600';
            case 'Pause':
            case 'View Reason':
                return 'text-orange-600';
            case 'View':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6 -m-8 p-8 bg-gray-50">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Work</h1>
                    <p className="text-gray-500">All tasks assigned to you</p>
                </div>
                 <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium">Total Tasks: <span className="text-gray-800 font-bold">{teamMemberMyWorkData.length}</span></p>
                    <img src="https://i.pravatar.cc/150?u=member@dws.com" alt="Sarah Johnson" className="w-10 h-10 rounded-full"/>
                </div>
            </header>
            
            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center space-x-2">
                <select className="p-2 border-gray-200 rounded-md bg-gray-50 text-sm"><option>Status: All</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-gray-50 text-sm"><option>Priority: All</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-gray-50 text-sm"><option>Due Date: All</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-gray-50 text-sm"><option>Project: All</option></select>
                <div className="relative flex-grow">
                    <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search task name..." className="w-full pl-9 p-2 border-gray-200 rounded-md text-sm"/>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <caption className="p-4 text-lg font-semibold text-left bg-gray-50 text-gray-800">My Assigned Tasks</caption>
                     <thead className="text-xs text-gray-500 bg-gray-50"><tr className="border-b"><th className="p-3 text-left font-medium">Task Name</th><th className="p-3 text-left font-medium">Project Name</th><th className="p-3 text-left font-medium">Priority</th><th className="p-3 text-left font-medium">Due Date</th><th className="p-3 text-left font-medium">Status</th><th className="p-3 text-left font-medium">Timer</th><th className="p-3 text-left font-medium">Review State</th><th className="p-3 text-left font-medium">Actions</th></tr></thead>
                     <tbody>
                         {teamMemberMyWorkData.map(task => {
                             const isRework = task.reviewState === 'Rework Requested';
                             return (
                                 <tr key={task.name} className={`border-b ${isRework ? 'bg-red-50 border-l-4 border-red-400 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                                    <td className="p-3 font-medium text-gray-800">{task.name}</td>
                                    <td className="p-3 text-gray-600">{task.project}</td>
                                    <td className="p-3"><PriorityBadge priority={task.priority} /></td>
                                    <td className={`p-3 font-semibold ${task.isOverdue ? 'text-red-600' : ''}`}>{task.dueDate} {task.isOverdue && <span className="font-normal text-xs">(Overdue)</span>}</td>
                                    <td className="p-3"><StatusBadge status={task.status} /></td>
                                    <td className="p-3">{task.timer}</td>
                                    <td className="p-3"><ReviewStatusBadge status={task.reviewState} /></td>
                                    <td className="p-3">
                                        <div className="flex items-center space-x-2">
                                            <button className={`font-semibold ${getActionColor(task.action)} hover:underline`}>{task.action}</button>
                                            <button onClick={() => handleOpenTask(task.name)} className="font-semibold text-blue-600 hover:underline">Open</button>
                                        </div>
                                    </td>
                                 </tr>
                             );
                         })}
                     </tbody>
                </table>
            </div>
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default TeamMemberMyWork;