import React, { useState } from 'react';
import { Task, User } from '../types';
import { myTasksData, usersData } from '../constants';
import TaskDetailPanel from './TaskDetailPanel';
import AssignTaskModal from './AssignTaskModal';
import { SearchIcon, ChevronDownIcon, ArrowDownTrayIcon, FunnelIcon, HelpIcon } from './icons';

// --- Badge Components --- //
const ApprovalStatusBadge: React.FC<{ status: Task['approvalStatus'] }> = ({ status }) => {
    const colors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Clarification': 'bg-yellow-100 text-yellow-800', // As per screenshot
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const ExecutionStatusBadge: React.FC<{ status: Task['executionStatus'] }> = ({ status }) => {
    const colors = {
        'Not Started': 'bg-gray-200 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Blocked': 'bg-red-100 text-red-800',
        'Rework': 'bg-orange-100 text-orange-800',
        'Completed': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const TimerStatusBadge: React.FC<{ status: Task['timerStatus'] }> = ({ status }) => {
    const colors = {
        'Running': 'bg-green-100 text-green-800',
        'Paused': 'bg-gray-200 text-gray-700',
        'Stopped': 'bg-gray-200 text-gray-700',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const ReviewStatusBadge: React.FC<{ status: Task['reviewStatus'] }> = ({ status }) => {
    const colors = {
        'Not Submitted': 'bg-gray-100 text-gray-700',
        'Submitted': 'bg-blue-100 text-blue-800',
        'Rejected': 'bg-red-100 text-red-800',
        'Approved': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const QualityFlag: React.FC<{ flag: Task['qualityFlag'] }> = ({ flag }) => {
    const colors = {
        'No Flag': 'bg-gray-300',
        'Green': 'bg-green-500',
        'Red': 'bg-red-500',
        'Yellow': 'bg-yellow-500',
    };
    return <div className={`w-3 h-3 rounded-full ${colors[flag!]}`} title={flag}></div>;
};

const currentUser = usersData.find(u => u.role === 'Team Owner')!;
const teamMembers = usersData.filter(u => u.role !== 'Team Owner');

const MyTasksScreen: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(myTasksData);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleRowClick = (task: Task) => {
        setSelectedTask(task);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setSelectedTask(null);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        const isCurrentUserStillAssigned = updatedTask.assignees.some(a => a.id === currentUser.id);

        if (isCurrentUserStillAssigned) {
            setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
            setSelectedTask(updatedTask);
        } else {
            setTasks(prevTasks => prevTasks.filter(t => t.id !== updatedTask.id));
            handleClosePanel();
        }
    };
    
    return (
        <div className="flex h-full font-sans -m-8 p-6 bg-gray-50">
             <div className="flex-1 flex flex-col space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                        <p className="text-gray-500 text-sm">Manage and track your assigned tasks</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"><ArrowDownTrayIcon className="w-4 h-4" /><span>Export</span></button>
                        <button className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2"><FunnelIcon className="w-4 h-4" /><span>Advanced Filters</span></button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2 text-sm bg-white p-2 border rounded-md">
                    <div className="relative flex-grow">
                        <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search tasks..." className="w-full pl-9 p-2 border border-gray-300 rounded-md"/>
                    </div>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Approval Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Execution Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Deadlines</option></select>
                </div>

                {/* Task Table */}
                <div className="bg-white rounded-lg border shadow-sm flex-1 overflow-auto">
                     <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-4 py-2">Task Name</th>
                                <th className="px-4 py-2">Project</th>
                                <th className="px-4 py-2">PM</th>
                                <th className="px-4 py-2">Approval</th>
                                <th className="px-4 py-2">Execution</th>
                                <th className="px-4 py-2">Timer</th>
                                <th className="px-4 py-2">Time Spent</th>
                                <th className="px-4 py-2">Quality</th>
                                <th className="px-4 py-2">Review</th>
                                <th className="px-4 py-2">Deadline</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {tasks.map(task => {
                                const rowClass = task.executionStatus === 'Blocked' ? 'bg-red-50' : task.executionStatus === 'Rework' ? 'bg-orange-50' : task.executionStatus === 'Completed' ? 'bg-green-50' : 'bg-white';
                                const isOverdue = task.dueDate === 'Jan 28, 2026';
                                return (
                                    <tr key={task.id} className={`${rowClass} border-b hover:bg-gray-100 cursor-pointer`} onClick={() => handleRowClick(task)}>
                                        <td className="px-4 py-2 font-medium">{task.name}</td>
                                        <td className="px-4 py-2">{task.project}</td>
                                        <td className="px-4 py-2">{task.pm?.name}</td>
                                        <td className="px-4 py-2"><ApprovalStatusBadge status={task.approvalStatus}/></td>
                                        <td className="px-4 py-2"><ExecutionStatusBadge status={task.executionStatus}/></td>
                                        <td className="px-4 py-2"><TimerStatusBadge status={task.timerStatus}/></td>
                                        <td className="px-4 py-2 font-mono whitespace-pre-line text-center">
                                            {task.timeLogged ? (
                                                `${Math.floor(task.timeLogged / 3600)}h\n${Math.floor((task.timeLogged % 3600) / 60)}m`
                                            ) : '0h\n0m'}
                                        </td>
                                        <td className="px-4 py-2 flex justify-center pt-3"><QualityFlag flag={task.qualityFlag}/></td>
                                        <td className="px-4 py-2"><ReviewStatusBadge status={task.reviewStatus}/></td>
                                        <td className={`px-4 py-2 font-medium ${isOverdue ? 'text-red-600' : ''}`}>{task.dueDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className={`transform top-0 right-0 fixed h-full shadow-2xl transition-all duration-300 ease-in-out bg-white border-l z-30 ${isPanelOpen ? 'w-1/3' : 'w-0'}`} style={{width: isPanelOpen ? '40%' : '0'}}>
                {selectedTask && (
                    <TaskDetailPanel
                        task={selectedTask}
                        onClose={handleClosePanel}
                        onUpdateTask={handleUpdateTask}
                        currentUser={currentUser}
                        teamMembers={teamMembers}
                    />
                )}
            </div>
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white px-5 py-3 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition font-semibold">
                    <HelpIcon className="w-6 h-6 mr-2" />
                    Help
                </button>
            </div>
        </div>
    );
};

export default MyTasksScreen;