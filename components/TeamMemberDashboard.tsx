import React from 'react';
import { Screen } from '../App';
import { Task } from '../types';
import { teamMemberDashboardData } from '../constants';
import { HelpIcon, ListBulletIcon, ClockIcon, ExclamationTriangleIcon, EyeIcon, PlusCircleIcon, CheckCircleIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from './icons';

interface TeamMemberDashboardProps {
    setActiveScreen: (screen: Screen) => void;
    setSelectedTask: (task: Task) => void;
}

const StatCard: React.FC<{ title: string, value: number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start space-x-4">
        <div className="text-gray-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

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
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
}

const ReviewStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
        'Under Review': 'bg-yellow-100 text-yellow-800',
        'Rework Requested': 'bg-orange-100 text-orange-800',
        'Approved': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status as keyof typeof colors]}`}>{status}</span>;
};

const AlertIcon: React.FC<{type: string}> = ({ type }) => {
    const icons = {
        'new': <PlusCircleIcon className="w-5 h-5 text-blue-500"/>,
        'approved': <CheckCircleIcon className="w-5 h-5 text-green-500"/>,
        'rework': <ArrowPathIcon className="w-5 h-5 text-orange-500"/>,
        'deadline': <ClockIcon className="w-5 h-5 text-red-500"/>,
        'comment': <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-500"/>,
    }
    return <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${ {new:'bg-blue-100', approved:'bg-green-100', rework:'bg-orange-100', deadline:'bg-red-100', comment:'bg-purple-100'}[type]}`}>{icons[type as keyof typeof icons]}</div>
}

const TeamMemberDashboard: React.FC<TeamMemberDashboardProps> = ({ setActiveScreen, setSelectedTask }) => {

    const handleOpenTask = (taskName: string) => {
        // This is a mock implementation. In a real app, you'd find the task by name or ID.
        const taskToOpen = [...teamMemberDashboardData.workToDo, ...teamMemberDashboardData.blockedTasks].find(t => t.name === taskName);
        if (taskToOpen) {
            setSelectedTask(taskToOpen as unknown as Task);
        }
    }

    return (
        <div className="space-y-6 -m-8 p-8 bg-gray-50">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Sarah Johnson</p>
                </div>
                 <div className="flex items-center space-x-4">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                    </div>
                    <img src="https://i.pravatar.cc/150?u=member@dws.com" alt="Sarah Johnson" className="w-10 h-10 rounded-full"/>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Tasks Assigned to Me" value={12} icon={<ListBulletIcon className="w-6 h-6"/>} />
                <StatCard title="Tasks In Progress" value={5} icon={<ClockIcon className="w-6 h-6"/>} />
                <StatCard title="Tasks Waiting / Blocked" value={3} icon={<ExclamationTriangleIcon className="w-6 h-6"/>} />
                <StatCard title="Tasks Under Review" value={4} icon={<EyeIcon className="w-6 h-6"/>} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="font-semibold mb-2 text-gray-800">Work to Do Now</h2>
                <p className="text-xs text-gray-500 mb-4">High priority and tasks with near due date</p>
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-500"><tr className="border-b"><th className="pb-2 text-left font-medium">Task Name</th><th className="pb-2 text-left font-medium">Priority</th><th className="pb-2 text-left font-medium">Due Date</th><th className="pb-2 text-left font-medium">Status</th><th></th></tr></thead>
                    <tbody>
                        {teamMemberDashboardData.workToDo.map(task => (
                            <tr key={task.name} className="border-b">
                                <td className="py-2"><p className="font-medium text-gray-800">{task.name}</p><p className="text-xs text-gray-400">{task.project}</p></td>
                                <td className="py-2"><PriorityBadge priority={task.priority}/></td>
                                <td className={`py-2 font-semibold ${task.dueDate.includes('Feb 3') ? 'text-red-600' : ''}`}>{task.dueDate}</td>
                                <td className="py-2"><StatusBadge status={task.status}/></td>
                                <td className="py-2 text-right"><button onClick={() => handleOpenTask(task.name)} className="font-semibold text-blue-600 hover:underline">Open Task</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="font-semibold mb-2 text-gray-800">Blocked / Waiting Tasks</h2>
                <p className="text-xs text-gray-500 mb-4">Tasks that need your attention to get unblocked</p>
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-500"><tr className="border-b"><th className="pb-2 text-left font-medium">Task Name</th><th className="pb-2 text-left font-medium">Reason</th><th className="pb-2 text-left font-medium">Waiting Since</th><th></th></tr></thead>
                    <tbody>
                        {teamMemberDashboardData.blockedTasks.map(task => (
                            <tr key={task.name} className="border-b">
                                <td className="py-2 font-medium text-gray-800">{task.name}</td>
                                <td className="py-2 text-gray-600">{task.reason}</td>
                                <td className="py-2 font-semibold">{task.waitingSince}</td>
                                <td className="py-2 text-right"><button onClick={() => handleOpenTask(task.name)} className="font-semibold text-blue-600 hover:underline">Open Task</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="font-semibold mb-2 text-gray-800">Review & Feedback</h2>
                <p className="text-xs text-gray-500 mb-4">Tasks submitted for review from others</p>
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-500"><tr className="border-b"><th className="pb-2 text-left font-medium">Task Name</th><th className="pb-2 text-left font-medium">Submitted On</th><th className="pb-2 text-left font-medium">Status</th><th></th></tr></thead>
                    <tbody>
                        {teamMemberDashboardData.reviewTasks.map(task => (
                            <tr key={task.name} className="border-b">
                                <td className="py-2 font-medium text-gray-800">{task.name}</td>
                                <td className="py-2">{task.submitted}</td>
                                <td className="py-2"><ReviewStatusBadge status={task.status}/></td>
                                <td className="py-2 text-right"><button className="font-semibold text-blue-600 hover:underline">View Feedback</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="font-semibold mb-2 text-gray-800">Alerts / Notifications</h2>
                <p className="text-xs text-gray-500 mb-4">Recent updates on your tasks and mentions</p>
                <div className="space-y-3">
                    {teamMemberDashboardData.alerts.map(alert => (
                         <div key={alert.text} className="flex items-start text-sm">
                            <AlertIcon type={alert.type}/>
                            <div>
                                <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: alert.text }}></p>
                                <p className="text-xs text-gray-400">{alert.time}</p>
                            </div>
                         </div>
                    ))}
                </div>
             </div>
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default TeamMemberDashboard;
