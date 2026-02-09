import React, { useState, useMemo } from 'react';
import { Task, User } from '../types';
import { teamLeadTasksData, usersData } from '../constants';
import TaskDetailPanel from './TaskDetailPanel';
// FIX: Replaced incorrect `QuestionMarkCircleIcon` with the correct `HelpIcon`.
import { SearchIcon, ChevronDownIcon, UsersIcon, ExclamationTriangleIcon, ChatBubbleLeftRightIcon, NoSymbolIcon, ClockIcon, HelpIcon, ListBulletIcon } from './icons';

// --- Badge Components --- //
const ApprovalBadge: React.FC<{ status: Task['approvalStatus'] }> = ({ status }) => {
    const colors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Clarification': 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const ExecutionBadge: React.FC<{ status: Task['executionStatus'] }> = ({ status }) => {
    const colors = {
        'Not Started': 'bg-gray-200 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Blocked': 'bg-red-100 text-red-800',
        'Rework': 'bg-orange-100 text-orange-800',
        'Completed': 'bg-green-100 text-green-800',
        'Waiting': 'bg-yellow-100 text-yellow-800'
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const TimerBadge: React.FC<{ status: Task['timerStatus'] }> = ({ status }) => {
    const colors = {
        'Running': 'bg-green-100 text-green-800',
        'Paused': 'bg-gray-200 text-gray-700',
        'Stopped': 'bg-gray-200 text-gray-700',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const currentUser = usersData.find(u => u.role === 'Team Owner')!;
const teamMembers = usersData.filter(u => u.role !== 'Team Owner');

const TeamTasksScreen = () => {
    const [tasks, setTasks] = useState<Task[]>(teamLeadTasksData);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    const handleRowClick = (task: Task) => {
        setSelectedTask(task);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setSelectedTask(null);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setSelectedTask(updatedTask);
    };

    const handleCheckboxChange = (taskId: string, checked: boolean) => {
        const newSet = new Set(selectedRows);
        if (checked) {
            newSet.add(taskId);
        } else {
            newSet.delete(taskId);
        }
        setSelectedRows(newSet);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(tasks.map(t => t.id)));
        } else {
            setSelectedRows(new Set());
        }
    };

    const teamOverviewStats = useMemo(() => {
        const activeTasks = tasks.filter(t => t.executionStatus !== 'Completed');
        return {
            totalActive: activeTasks.length,
            blocked: tasks.filter(t => t.executionStatus === 'Blocked').length,
            overdue: tasks.filter(t => t.dueDate === 'Today' || t.dueDate.includes('Mar')).length,
            rework: tasks.filter(t => t.executionStatus === 'Rework').length,
            // FIX: Added explicit typing for the accumulator in reduce to prevent potential type inference issues.
            qualityFlags: tasks.reduce((acc: Record<string, number>, t) => {
                const flag = t.qualityFlag || 'No Flag';
                acc[flag] = (acc[flag] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            statusCounts: tasks.reduce((acc: Record<string, number>, t) => {
                const status = t.executionStatus || 'Not Started';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            pendingApprovals: tasks.filter(t => t.approvalStatus === 'Pending').length,
        }
    }, [tasks]);

    return (
        <div className="flex space-x-6 h-full font-sans -m-8 p-6 bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Team Tasks</h1>
                        <p className="text-gray-500 text-sm">Tasks currently assigned to your team</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"><UsersIcon className="w-4 h-4" /><span>Bulk Reassign</span></button>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"><ExclamationTriangleIcon className="w-4 h-4" /><span>Bulk Escalate</span></button>
                        <button className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2"><ChatBubbleLeftRightIcon className="w-4 h-4" /><span>Bulk Message</span></button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 text-sm bg-white p-2 border rounded-md">
                    <div className="relative flex-grow">
                        <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search by task, project, or person." className="w-full pl-9 p-2 border border-gray-300 rounded-md"/>
                    </div>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Projects</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Approval Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Execution Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Quality Flags</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Deadlines</option></select>
                </div>

                <div className="bg-white rounded-lg border shadow-sm flex-1 overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-4 py-2 w-10"><input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} /></th>
                                <th className="px-4 py-2">Task Name</th>
                                <th className="px-4 py-2">Project</th>
                                <th className="px-4 py-2">Assigned To</th>
                                <th className="px-4 py-2">PM</th>
                                <th className="px-4 py-2">Approval</th>
                                <th className="px-4 py-2">Execution</th>
                                <th className="px-4 py-2">Timer</th>
                                <th className="px-4 py-2">Time Spent</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {tasks.map(task => {
                                const rowClass = task.executionStatus === 'Blocked' ? 'bg-red-50' : task.executionStatus === 'Rework' ? 'bg-yellow-50' : 'bg-white';
                                return (
                                <tr key={task.id} className={`${rowClass} border-b hover:bg-gray-100 cursor-pointer`} onClick={() => handleRowClick(task)}>
                                    <td className="px-4 py-2"><input type="checkbox" checked={selectedRows.has(task.id)} onChange={(e) => handleCheckboxChange(task.id, e.target.checked)} onClick={e => e.stopPropagation()} /></td>
                                    <td className="px-4 py-2 font-medium">{task.name}<br/><span className="text-xs text-gray-400 font-normal">{task.id}</span></td>
                                    <td className="px-4 py-2">{task.project}</td>
                                    <td className="px-4 py-2">
                                        {task.assignees.length === 1 ? (
                                            <div className="flex items-center space-x-2">
                                                <img src={task.assignees[0].avatar} alt={task.assignees[0].name} className="w-6 h-6 rounded-full" />
                                                <span>{task.assignees[0].name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center -space-x-2" title={task.assignees.map(a => a.name).join(', ')}>
                                                {task.assignees.slice(0, 3).map(assignee => (
                                                    <img key={assignee.id} src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full border-2 border-white" />
                                                ))}
                                                {task.assignees.length > 3 && (
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                                                        +{task.assignees.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{task.pm?.name}</td>
                                    <td className="px-4 py-2"><ApprovalBadge status={task.approvalStatus}/></td>
                                    <td className="px-4 py-2"><ExecutionBadge status={task.executionStatus}/></td>
                                    <td className="px-4 py-2"><TimerBadge status={task.timerStatus}/></td>
                                    <td className="px-4 py-2 font-mono">{task.timeLogged ? `${Math.floor(task.timeLogged / 3600)}h ${Math.floor((task.timeLogged % 3600) / 60)}m` : '-'}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>

            <aside className="w-80 flex-shrink-0 space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Overview</h2>
                    <div className="space-y-3">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg"><div className="flex justify-between items-center text-sm text-blue-800"><span>Total Active Tasks</span><ListBulletIcon className="w-5 h-5"/></div><p className="text-3xl font-bold text-blue-900 mt-1">{teamOverviewStats.totalActive}</p><p className="text-xs text-blue-700">Across 4 projects</p></div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><div className="flex justify-between items-center text-sm text-red-800"><span>Blocked Tasks</span><NoSymbolIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-red-900">{teamOverviewStats.blocked}</p><p className="text-xs text-red-700">Requires immediate attention</p></div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg"><div className="flex justify-between items-center text-sm text-orange-800"><span>Overdue Tasks</span><ClockIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-orange-900">{teamOverviewStats.overdue}</p><p className="text-xs text-orange-700">Past deadline</p></div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg relative"><div className="flex justify-between items-center text-sm text-yellow-800"><span>Rework Tasks</span><HelpIcon className="w-5 h-5 absolute top-2 right-2 p-1 bg-blue-600 text-white rounded-full"/></div><p className="text-2xl font-bold text-yellow-900">{teamOverviewStats.rework}</p><p className="text-xs text-yellow-700">Rejected from review</p></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                     <h3 className="font-semibold text-gray-800 mb-3">Quality Flags</h3>
                     <div className="space-y-2 text-sm">
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>Green Flag</span><span>{teamOverviewStats.qualityFlags['Green'] || 0}</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></div>Red Flag - L1</span><span>{teamOverviewStats.qualityFlags['Red'] || 0}</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-red-700 rounded-full mr-2"></div>Red Flag - L2</span><span>0</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-gray-300 rounded-full mr-2"></div>No Flag</span><span>{teamOverviewStats.qualityFlags['No Flag'] || 0}</span></div>
                     </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Tasks by Status</h3>
                    <div className="space-y-3 text-sm">
                        {Object.entries(teamOverviewStats.statusCounts).map(([status, count]) => (
                             <div key={status}>
                                 <div className="flex justify-between mb-1"><span className="text-gray-600">{status}</span><span>{count}</span></div>
                                 <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${(count as number / tasks.length) * 100}%`}}></div></div>
                             </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Pending Approvals</h3>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <p className="font-bold text-2xl text-yellow-800">{teamOverviewStats.pendingApprovals}</p>
                        <p className="text-xs text-yellow-700">Awaiting Your Approval</p>
                        <button className="mt-2 text-sm font-semibold bg-white border border-yellow-300 px-4 py-1 rounded-md text-yellow-800 hover:bg-yellow-100">Review Now</button>
                    </div>
                </div>

            </aside>
            
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
        </div>
    );
};

export default TeamTasksScreen;
