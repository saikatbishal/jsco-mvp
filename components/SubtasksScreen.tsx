import React, { useState, useMemo } from 'react';
import { TeamLeadSubtask, User, Task } from '../types';
import SubtaskDetailModal from './SubtaskDetailModal';
import CreateSubtaskModal from './CreateSubtaskModal';
import { SearchIcon, UsersIcon, ExclamationTriangleIcon, ChatBubbleLeftRightIcon, NoSymbolIcon, ClockIcon, HelpIcon, ListBulletIcon, PlusIcon } from './icons';

// --- Badge Components --- //
const ApprovalBadge: React.FC<{ status: TeamLeadSubtask['approvalStatus'] }> = ({ status }) => {
    const colors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const ExecutionBadge: React.FC<{ status: TeamLeadSubtask['executionStatus'] }> = ({ status }) => {
    const colors = {
        'Not Started': 'bg-gray-200 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Blocked': 'bg-red-100 text-red-800',
        'Rework': 'bg-orange-100 text-orange-800',
        'Completed': 'bg-green-100 text-green-800',
        'Waiting': 'bg-yellow-100 text-yellow-800',
        'Paused': 'bg-gray-200 text-gray-700',
        'Not Taken Up': 'bg-gray-200 text-gray-700',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const TimerBadge: React.FC<{ status: TeamLeadSubtask['timerStatus'] }> = ({ status }) => {
    const colors = {
        'Running': 'bg-green-100 text-green-800',
        'Paused': 'bg-gray-200 text-gray-700',
        'Stopped': 'bg-gray-200 text-gray-700',
        'Not Started': 'bg-gray-200 text-gray-700',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status!] || 'bg-gray-100'}`}>{status}</span>;
};

const QualityFlag: React.FC<{ flag: TeamLeadSubtask['qualityFlag'] }> = ({ flag }) => {
    const colors = {
        'No Flag': 'bg-gray-300',
        'Green': 'bg-green-500',
        'L1': 'bg-red-500',
        'L2': 'bg-red-700',
        'Green Flag': 'bg-green-500',
    };
    return <div className={`w-3 h-3 rounded-full ${colors[flag]}`} title={flag}></div>;
};

interface SubtasksScreenProps {
    subtasks: TeamLeadSubtask[];
    teamMembers: User[];
    allTasks: Task[];
    onCreateSubtask: (newSubtask: TeamLeadSubtask) => void;
}

const SubtasksScreen: React.FC<SubtasksScreenProps> = ({ subtasks, teamMembers, allTasks, onCreateSubtask }) => {
    const [selectedSubtask, setSelectedSubtask] = useState<TeamLeadSubtask | null>(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    const handleRowClick = (subtask: TeamLeadSubtask) => {
        setSelectedSubtask(subtask);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setSelectedSubtask(null);
    };

    const handleSaveSubtask = (newSubtask: TeamLeadSubtask) => {
        onCreateSubtask(newSubtask);
        setCreateModalOpen(false);
    };
    
    const handleCheckboxChange = (subtaskId: string, checked: boolean) => {
        const newSet = new Set(selectedRows);
        if (checked) newSet.add(subtaskId);
        else newSet.delete(subtaskId);
        setSelectedRows(newSet);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) setSelectedRows(new Set(subtasks.map(t => t.id)));
        else setSelectedRows(new Set());
    };

    const overviewStats = useMemo(() => {
        const stats = {
            total: subtasks.length,
            blocked: subtasks.filter(t => t.executionStatus === 'Blocked').length,
            overdue: subtasks.filter(t => new Date(t.deadline) < new Date() && t.executionStatus !== 'Completed').length,
            rework: subtasks.filter(t => t.executionStatus === 'Rework').length,
            qualityFlags: subtasks.reduce((acc, t) => {
                acc[t.qualityFlag] = (acc[t.qualityFlag] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            statusCounts: subtasks.reduce((acc, t) => {
                const status = t.executionStatus || 'Not Started';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            pendingApprovals: subtasks.filter(t => t.approvalStatus === 'Pending').length,
        };
        return stats;
    }, [subtasks]);

    return (
        <div className="flex space-x-6 h-full font-sans -m-8 p-6 bg-gray-50">
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Subtasks</h1>
                        <p className="text-gray-500 text-sm">Monitor and supervise all subtasks under your team</p>
                    </div>
                    <div className="flex items-center space-x-2">
                         <button onClick={() => setCreateModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white border border-transparent rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                            <PlusIcon className="w-5 h-5" />
                            <span>Create Subtask</span>
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Bulk Approve</button>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Bulk Reassign</button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 text-sm bg-white p-2 border rounded-md">
                    <input type="text" placeholder="Search by subtask, parent" className="w-full p-2 border border-gray-300 rounded-md"/>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Parent Tasks</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Team Members</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Approval Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Execution Status</option></select>
                    <select className="p-2 border border-gray-300 rounded-md bg-white"><option>All Deadlines</option></select>
                </div>

                <div className="bg-white rounded-lg border shadow-sm flex-1 overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0">
                            <tr>
                                <th className="p-3 w-10"><input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} /></th>
                                <th className="p-3">Subtask Name</th>
                                <th className="p-3">Parent Task</th>
                                <th className="p-3">Assigned To</th>
                                <th className="p-3">Approval</th>
                                <th className="p-3">Execution</th>
                                <th className="p-3">Timer</th>
                                <th className="p-3">Time Spent</th>
                                <th className="p-3">Quality</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {subtasks.map(subtask => (
                                <tr key={subtask.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(subtask)}>
                                    <td className="p-3"><input type="checkbox" checked={selectedRows.has(subtask.id)} onChange={(e) => handleCheckboxChange(subtask.id, e.target.checked)} onClick={e => e.stopPropagation()} /></td>
                                    <td className="p-3 font-medium">{subtask.name}<br/><span className="text-xs text-gray-400 font-normal">{subtask.id}</span></td>
                                    <td className="p-3">{subtask.parentTask.name}<br/><span className="text-xs text-gray-400 font-normal">{subtask.parentTask.id}</span></td>
                                    <td className="p-3">
                                        <div className="flex items-center space-x-2">
                                            <img src={subtask.assignee.avatar} alt={subtask.assignee.name} className="w-6 h-6 rounded-full" />
                                            <span>{subtask.assignee.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3"><ApprovalBadge status={subtask.approvalStatus}/></td>
                                    <td className="p-3"><ExecutionBadge status={subtask.executionStatus}/></td>
                                    <td className="p-3"><TimerBadge status={subtask.timerStatus}/></td>
                                    <td className="p-3 font-mono">{`${Math.floor(subtask.timeSpent / 3600)}h ${Math.floor((subtask.timeSpent % 3600) / 60)}m`}</td>
                                    <td className="p-3"><QualityFlag flag={subtask.qualityFlag} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <aside className="w-80 flex-shrink-0 space-y-4">
                 <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Subtask Overview</h2>
                    <div className="space-y-3">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg"><div className="flex justify-between items-center text-sm text-blue-800"><span>Total Subtasks</span><ListBulletIcon className="w-5 h-5"/></div><p className="text-3xl font-bold text-blue-900 mt-1">{overviewStats.total}</p><p className="text-xs text-blue-700">Under supervision</p></div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><div className="flex justify-between items-center text-sm text-red-800"><span>Blocked Subtasks</span><NoSymbolIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-red-900">{overviewStats.blocked}</p><p className="text-xs text-red-700">Needs intervention</p></div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg"><div className="flex justify-between items-center text-sm text-orange-800"><span>Overdue Subtasks</span><ClockIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-orange-900">{overviewStats.overdue}</p><p className="text-xs text-orange-700">Past deadline</p></div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg relative"><div className="flex justify-between items-center text-sm text-yellow-800"><span>Rework Subtasks</span><HelpIcon className="w-5 h-5 absolute top-2 right-2 p-1 bg-blue-600 text-white rounded-full"/></div><p className="text-2xl font-bold text-yellow-900">{overviewStats.rework}</p><p className="text-xs text-yellow-700">Requires rework</p></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                     <h3 className="font-semibold text-gray-800 mb-3">Quality Flags</h3>
                     <div className="space-y-2 text-sm">
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>Green Flag</span><span>{overviewStats.qualityFlags['Green'] || 0}</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></div>Red Flag - L1</span><span>{overviewStats.qualityFlags['L1'] || 0}</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-red-700 rounded-full mr-2"></div>Red Flag - L2</span><span>{overviewStats.qualityFlags['L2'] || 0}</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center"><div className="w-2.5 h-2.5 bg-gray-300 rounded-full mr-2"></div>No Flag</span><span>{overviewStats.qualityFlags['No Flag'] || 0}</span></div>
                     </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Subtasks by Status</h3>
                    <div className="space-y-3 text-sm">
                        {Object.entries(overviewStats.statusCounts).map(([status, count]) => (
                             <div key={status}>
                                 <div className="flex justify-between mb-1"><span className="text-gray-600">{status}</span><span>{count}</span></div>
                                 <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${(count as number / subtasks.length) * 100}%`}}></div></div>
                             </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Pending Approvals</h3>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                        <p className="font-bold text-2xl text-purple-800">{overviewStats.pendingApprovals}</p>
                        <p className="text-xs text-purple-700">Awaiting Your Approval</p>
                        <button className="mt-2 text-sm font-semibold bg-white border border-purple-300 px-4 py-1 rounded-md text-purple-800 hover:bg-purple-100">Review Now</button>
                    </div>
                </div>
            </aside>
            
            {isDetailModalOpen && selectedSubtask && (
                <SubtaskDetailModal subtask={selectedSubtask} onClose={handleCloseDetailModal} />
            )}

            {isCreateModalOpen && (
                <CreateSubtaskModal 
                    onClose={() => setCreateModalOpen(false)}
                    onSave={handleSaveSubtask}
                    teamMembers={teamMembers}
                    allTasks={allTasks}
                />
            )}
        </div>
    );
};

export default SubtasksScreen;