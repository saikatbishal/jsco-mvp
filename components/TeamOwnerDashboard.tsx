
import React from 'react';
// FIX: Correctly import data sources from constants.ts to resolve module export errors.
// 'teamOwnerMyTasksData' and 'teamOwnerSubtasksData' are not exported, so we alias existing exports.
// 'recentActivityData' was missing and has been added to constants.ts.
import { myTasksData as teamOwnerMyTasksData, teamLeadSubtasksData as teamOwnerSubtasksData, recentActivityData } from '../constants';
import { Task, TeamLeadSubtask, RecentActivity } from '../types';
import { HelpIcon, ExclamationTriangleIcon, FlagIcon, StarIcon, PlayIcon } from './icons';

// --- Local Components --- //

const ActionCard: React.FC<{ title: string; description: string; count: number; buttonText: string; color: string; innerCount?: number }> = ({ title, description, count, buttonText, color, innerCount }) => {
    // FIX: Added 'innerCount' property to all color schemes to prevent property access errors.
    const colors = {
        white: { bg: 'bg-white', border: 'border-gray-200', button: 'bg-indigo-600 hover:bg-indigo-700 text-white', count: 'bg-gray-200 text-gray-800', innerCount: 'bg-gray-500 text-white' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-200', button: 'bg-indigo-600 hover:bg-indigo-700 text-white', count: 'bg-purple-200 text-purple-800', innerCount: 'bg-purple-600 text-white' },
        yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', button: 'bg-yellow-500 hover:bg-yellow-600 text-white', count: 'bg-yellow-200 text-yellow-800', innerCount: 'bg-yellow-500 text-white' },
        red: { bg: 'bg-red-50', border: 'border-red-200', button: 'bg-red-600 hover:bg-red-700 text-white', count: 'bg-red-200 text-red-800', innerCount: 'bg-red-600 text-white' },
    };
    const c = colors[color as keyof typeof colors] || colors.white;

    return (
        <div className={`p-4 rounded-lg border ${c.bg} ${c.border} flex justify-between items-center`}>
            <div>
                <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
                <button className={`mt-2 px-3 py-1 text-sm font-semibold rounded-md ${c.button}`}>{buttonText}</button>
            </div>
            <div className="flex items-center space-x-2">
                {innerCount && <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${c.innerCount}`}>{innerCount}</span>}
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${c.count}`}>{count}</span>
            </div>
        </div>
    );
};

// FIX: Update prop type to accept both Task and TeamLeadSubtask approval statuses and add 'Rejected' status color.
const ApprovalBadge: React.FC<{ status: Task['approvalStatus'] | TeamLeadSubtask['approvalStatus'] }> = ({ status }) => {
    const colors = { 'Pending': 'bg-yellow-100 text-yellow-800', 'Approved': 'bg-green-100 text-green-800', 'Clarification': 'bg-yellow-100 text-yellow-800', 'Rejected': 'bg-red-100 text-red-800' };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
};

// FIX: Update prop type to accept both Task and TeamLeadSubtask execution statuses and add 'Paused' status color.
const ExecutionBadge: React.FC<{ status: Task['executionStatus'] | TeamLeadSubtask['executionStatus'] }> = ({ status }) => {
    const colors = { 'Not Started': 'bg-gray-200 text-gray-700', 'In Progress': 'bg-blue-100 text-blue-800', 'Blocked': 'bg-red-100 text-red-800', 'Rework': 'bg-red-100 text-red-800', 'Completed': 'bg-green-100 text-green-800', 'Waiting': 'bg-yellow-100 text-yellow-800', 'Not Taken Up': 'bg-gray-200 text-gray-700', 'Paused': 'bg-gray-200 text-gray-700' };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
};

const TimerBadge: React.FC<{ status: Task['timerStatus'] }> = ({ status }) => {
    const colors = { 'Running': 'bg-green-100 text-green-800', 'Paused': 'bg-gray-200 text-gray-700', 'Stopped': 'bg-gray-200 text-gray-700', 'Not Started': 'bg-gray-200 text-gray-700' };
    const Icon = status === 'Running' ? <PlayIcon className="w-3 h-3 mr-1" /> : null;
    return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${colors[status!]}`}>{Icon}{status}</span>;
};

// FIX: Update prop type to accept both Task and TeamLeadSubtask quality flags and add missing flag colors.
const QualityFlagBadge: React.FC<{ flag: Task['qualityFlag'] | TeamLeadSubtask['qualityFlag'] }> = ({ flag }) => {
    const colors = { 'No Flag': 'bg-gray-100 text-gray-600', 'Red Flag': 'bg-red-100 text-red-700', 'Green Flag': 'bg-green-100 text-green-700', 'Green': 'bg-green-100 text-green-700', 'Red': 'bg-red-100 text-red-700', 'Yellow': 'bg-yellow-100 text-yellow-700', 'L1': 'bg-red-100 text-red-700', 'L2': 'bg-red-100 text-red-700' };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${colors[flag as keyof typeof colors]}`}>{flag}</span>;
};

const ReviewBadge: React.FC<{ status: Task['reviewStatus'] }> = ({ status }) => {
    const colors = { 'Not Submitted': 'bg-gray-100 text-gray-600', 'Rejected': 'bg-red-100 text-red-700', 'Submitted': 'bg-yellow-100 text-yellow-700' };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${colors[status!]}`}>{status}</span>;
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} solid={i < rating} />)}
    </div>
);

// --- Main Dashboard Component --- //

const TeamOwnerDashboard = () => {
    return (
        <div className="flex space-x-6 h-full font-sans -m-6 p-6 bg-white">
            <div className="flex-1 flex flex-col space-y-6">
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    <h2 className="text-md font-semibold text-red-800">Action Required</h2>
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded-full flex items-center justify-center">11</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ActionCard title="PENDING MANAGER APPROVAL" description="Tasks waiting for PM approval before start" count={2} buttonText="View Tasks" color="white" />
                    <ActionCard title="APPROVED - NOT TAKEN UP" description="Ready to start execution" count={2} buttonText="Take Up Tasks" color="white" />
                    <ActionCard title="WAITING CLARIFICATION" description="PM requested more information" count={3} buttonText="Provide Info" color="yellow" innerCount={1} />
                    <ActionCard title="SUBTASKS PENDING APPROVAL" description="Team subtasks awaiting your approval" count={2} buttonText="Approve Now" color="purple" />
                    <ActionCard title="SENT BACK FOR REWORK" description="Quality rejected - needs correction" count={2} buttonText="Start Rework" color="red" />
                    <ActionCard title="BLOCKED TASKS" description="Tasks needing immediate resolution" count={1} buttonText="Resolve Now" color="red" innerCount={2} />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-800">My Tasks</h3>
                        <div className="flex items-center space-x-2">
                            <select className="text-sm border-gray-200 rounded-md"><option>All Approval Status</option></select>
                            <select className="text-sm border-gray-200 rounded-md"><option>All Execution Status</option></select>
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-500">
                                <tr>
                                    {['Task Name', 'Project', 'PM', 'Manager', 'Approval', 'Execution', 'Timer', 'Time Spent', 'Quality Flag', 'Review', 'Deadline', 'Actions'].map(h => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {teamOwnerMyTasksData.map(task => (
                                    <tr key={task.id} className="border-b hover:bg-gray-50">
                                        <td className="px-3 py-2 font-medium"><FlagIcon className={`w-4 h-4 inline-block mr-2 ${task.executionStatus === 'Blocked' ? 'text-red-500' : 'text-gray-300'}`} />{task.name}</td>
                                        <td className="px-3 py-2">{task.project}</td>
                                        <td className="px-3 py-2">{task.pm?.name}</td>
                                        <td className="px-3 py-2">{task.manager?.name}</td>
                                        <td className="px-3 py-2"><ApprovalBadge status={task.approvalStatus} /></td>
                                        <td className="px-3 py-2"><ExecutionBadge status={task.executionStatus} /></td>
                                        <td className="px-3 py-2"><TimerBadge status={task.timerStatus} /></td>
                                        <td className="px-3 py-2 font-mono text-xs">{`${Math.floor(task.timeSpent!.logged / 3600)}h ${Math.floor((task.timeSpent!.logged % 3600) / 60)}m`}<br/><span className={task.timeSpent!.logged > task.timeSpent!.allocated ? 'text-red-500' : 'text-gray-400'}>{Math.floor(Math.abs(task.timeSpent!.logged - task.timeSpent!.allocated) / 3600)}h over</span></td>
                                        <td className="px-3 py-2"><QualityFlagBadge flag={task.qualityFlag} /></td>
                                        <td className="px-3 py-2"><ReviewBadge status={task.reviewStatus} /></td>
                                        <td className={`px-3 py-2 font-medium ${task.dueDate.includes('Overdue') ? 'text-red-500' : ''}`}>{task.dueDate.replace(' (Overdue)', '')}<br/>{task.dueDate.includes('Overdue') && <span className="text-red-500 text-xs font-normal">(Overdue)</span>}</td>
                                        <td className="px-3 py-2"><button className="font-medium text-indigo-600 hover:underline">{task.action}</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <a href="#" className="text-sm text-indigo-600 font-medium float-right mt-2">View All My Tasks &rarr;</a>
                </div>

                 <div className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-800">Team Subtasks</h3>
                        <div className="flex items-center space-x-2">
                            <select className="text-sm border-gray-200 rounded-md"><option>All Status</option></select>
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-500">
                                <tr>
                                    {['Subtask', 'Parent Task', 'Assigned To', 'Approval', 'Execution', 'Timer', 'Deadline', 'Quality Flag'].map(h => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {teamOwnerSubtasksData.map(subtask => (
                                    <tr key={subtask.id} className="border-b hover:bg-gray-50">
                                        <td className="px-3 py-2 font-medium">{subtask.name}</td>
                                        <td className="px-3 py-2">{subtask.parentTask.name}</td>
                                        <td className="px-3 py-2 flex items-center space-x-2"><div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">{subtask.assignee.name.split(' ').map(n=>n[0]).join('')}</div><span>{subtask.assignee.name}</span></td>
                                        <td className="px-3 py-2"><ApprovalBadge status={subtask.approvalStatus} /></td>
                                        <td className="px-3 py-2"><ExecutionBadge status={subtask.executionStatus} /></td>
                                        <td className="px-3 py-2"><TimerBadge status={subtask.timerStatus} /></td>
                                        <td className="px-3 py-2">{subtask.deadline}</td>
                                        <td className="px-3 py-2"><QualityFlagBadge flag={subtask.qualityFlag} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <a href="#" className="text-sm text-indigo-600 font-medium float-right mt-2">View All Subtasks &rarr;</a>
                </div>


            </div>

            <aside className="w-80 flex-shrink-0 space-y-6 border-l pl-6">
                <div className="relative">
                    <h3 className="font-semibold text-gray-800">Review & Quality</h3>
                    <button className="absolute top-0 right-0 text-indigo-600"><HelpIcon className="w-5 h-5"/></button>
                    <div className="mt-2 space-y-2 text-sm">
                        <div className="flex justify-between p-2 rounded-md hover:bg-gray-100"><span>Awaiting Review</span><span className="font-bold bg-gray-200 px-2 rounded-full">3</span></div>
                        <div className="flex justify-between p-2 rounded-md hover:bg-gray-100"><span>Sent Back for Rework</span><span className="font-bold bg-gray-200 px-2 rounded-full">1</span></div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <h4 className="text-xs font-semibold text-gray-500">RECENT RATINGS</h4>
                        <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                            <p className="text-sm font-medium">Performance Optimization</p>
                            <div className="flex justify-between items-center mt-1"><QualityFlagBadge flag="Green Flag"/><StarRating rating={5}/></div>
                        </div>
                         <div className="p-3 border rounded-lg">
                            <p className="text-sm font-medium">User Authentication</p>
                            <div className="flex justify-between items-center mt-1"><QualityFlagBadge flag="No Flag"/><StarRating rating={4}/></div>
                        </div>
                         <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                            <p className="text-sm font-medium">Payment Gateway Testing</p>
                            <div className="flex justify-between items-center mt-1"><QualityFlagBadge flag="Red Flag"/><StarRating rating={2}/></div>
                        </div>
                    </div>
                </div>

                 <div className="relative border-t pt-6">
                    <h3 className="font-semibold text-gray-800">Performance</h3>
                     <button className="absolute top-6 right-0 text-indigo-600"><HelpIcon className="w-5 h-5"/></button>
                    <div className="mt-2 space-y-3 text-sm">
                        <div className="flex justify-between"><span>Tasks Completed</span><span className="font-bold">12</span></div>
                        <div className="flex justify-between"><span>Avg Turnaround</span><span className="font-bold">2.4d</span></div>
                        <div className="flex justify-between"><span>Blocked/Completed</span><span className="font-bold">2/12</span></div>
                        <div className="flex justify-between"><span>Callouts</span><div className="flex space-x-2"><span className="text-xs bg-red-100 text-red-700 px-1.5 rounded">L1: 1</span><span className="text-xs bg-red-100 text-red-700 px-1.5 rounded">L2: 0</span></div></div>
                        <div className="flex justify-between"><span>Appreciations</span><span className="font-bold">5</span></div>
                        <div className="flex justify-between"><span>Escalations</span><span className="font-bold text-red-600">2</span></div>
                    </div>
                </div>

                 <div className="relative border-t pt-6">
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                    <div className="mt-4 space-y-4">
                        {recentActivityData.map(activity => (
                             <div key={activity.id} className="flex items-start">
                                <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center mr-3 flex-shrink-0`}><activity.icon className="w-5 h-5 text-white"/></div>
                                <div>
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-xs text-gray-500">{activity.description}</p>
                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            </aside>
            <div className="fixed bottom-4 right-4 z-50"><button className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"><HelpIcon className="w-6 h-6" /></button></div>
        </div>
    );
}

export default TeamOwnerDashboard;
