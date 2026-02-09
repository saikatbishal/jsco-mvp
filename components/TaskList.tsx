import React from 'react';
import { Task } from '../types';
import { ChevronDownIcon, FilterIcon, PlusIcon, DotsVerticalIcon, HelpIcon, CheckSquareIcon, ExclamationTriangleIcon, ClockIcon, BellIcon, PauseCircleIcon, StarIcon } from './icons';
import { Screen } from '../App';

interface TaskListProps {
    tasks: Task[];
    setActiveScreen: (screen: Screen) => void;
    setSelectedTask: (task: Task) => void;
}

const StatCard: React.FC<{ title: string; value: number; borderColor: string; icon: React.ReactNode }> = ({ title, value, borderColor, icon }) => (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${borderColor}`}>
        <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">{title}</p>
            {icon}
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
);


const StatusBadge: React.FC<{ status: Task['status'] }> = ({ status }) => {
  const colors = {
    'Blocked': 'bg-red-100 text-red-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Not Started': 'bg-gray-200 text-gray-800',
    'Completed': 'bg-green-100 text-green-800',
    'Submitted for Review': 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
};

const PriorityBadge: React.FC<{ priority: Task['priority'] }> = ({ priority }) => {
    const colors = {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Low': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`}>{priority}</span>;
};

const DependencyBadge: React.FC<{ dep: Task['dependencies'] }> = ({ dep }) => {
    const colors = {
        'Free': 'bg-green-100 text-green-800',
        'Blocked': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[dep.type]}`}>{dep.type === 'Blocked' ? `Blocked (${dep.count})` : 'Free'}</span>;
}


const ProgressBar: React.FC<{ progress: number; status: Task['status'] }> = ({ progress, status }) => {
    const color = status === 'Completed' ? 'bg-green-500' : 'bg-blue-500';
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className={`${color} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
    );
};


const TaskList: React.FC<TaskListProps> = ({ tasks, setActiveScreen, setSelectedTask }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Task Monitor</h1>
                    <p className="text-gray-500">{tasks.length} active tasks</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Export</button>
                    <button onClick={() => setActiveScreen(Screen.CreateTask)} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                        <PlusIcon className="w-5 h-5" />
                        <span>New Task</span>
                    </button>
                    <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?u=user-avatar" alt="User avatar" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Active Tasks" value={tasks.length} borderColor="border-blue-500" icon={<CheckSquareIcon className="w-6 h-6 text-blue-500"/>} />
                <StatCard title="Overdue" value={tasks.filter(t => t.dueDate === 'Today').length} borderColor="border-red-500" icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-500"/>} />
                <StatCard title="Blocked" value={tasks.filter(t => t.status === 'Blocked').length} borderColor="border-yellow-500" icon={<PauseCircleIcon className="w-6 h-6 text-yellow-500"/>} />
                <StatCard title="Due Today" value={tasks.filter(t => t.dueDate === 'Today').length} borderColor="border-purple-500" icon={<ClockIcon className="w-6 h-6 text-purple-500"/>} />
                <StatCard title="High Priority" value={tasks.filter(t => t.priority === 'High').length} borderColor="border-pink-500" icon={<BellIcon className="w-6 h-6 text-pink-500"/>} />
            </div>

            <div className="flex items-center space-x-4">
                <input type="text" placeholder="Search tasks, projects, companies..." className="flex-grow p-2 border border-gray-300 rounded-md"/>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Project</span><ChevronDownIcon className="w-4 h-4"/></button>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Owner</span><ChevronDownIcon className="w-4 h-4"/></button>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Status</span><ChevronDownIcon className="w-4 h-4"/></button>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Priority</span><ChevronDownIcon className="w-4 h-4"/></button>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Due Date</span><ChevronDownIcon className="w-4 h-4"/></button>
                <button className="flex items-center space-x-1 p-2 border rounded-md bg-white"><span className="text-sm">Sort</span><FilterIcon className="w-4 h-4"/></button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center space-x-4 text-sm">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300"/>
                        <span>4 selected</span>
                        <button className="text-blue-600">Change Owner</button>
                        <button className="text-blue-600">Change Status</button>
                        <button className="text-blue-600">Export Selected</button>
                    </div>
                    <p className="text-sm text-gray-500">Showing 1-10 of {tasks.length} tasks</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-2"><input type="checkbox"/></th>
                                <th className="p-2 text-left">Task Name</th>
                                <th className="p-2 text-left">Project</th>
                                <th className="p-2 text-left">Task Owner</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Priority</th>
                                <th className="p-2 text-left">Due Date</th>
                                <th className="p-2 text-left">Rating</th>
                                <th className="p-2 text-left">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTask(task)}>
                                    <td className="p-2"><input type="checkbox"/></td>
                                    <td className="p-2 font-medium text-gray-800">{task.name}<br/><span className="font-normal text-gray-400">{task.id}</span></td>
                                    <td className="p-2">{task.project}</td>
                                    <td className="p-2 flex items-center space-x-2 pt-2"><img src={task.assignees[0].avatar} className="w-6 h-6 rounded-full"/><span>{task.assignees[0].name}</span></td>
                                    <td className="p-2"><StatusBadge status={task.status}/></td>
                                    <td className="p-2"><PriorityBadge priority={task.priority}/></td>
                                    <td className={`p-2 font-medium ${task.dueDate === 'Today' || task.dueDate.includes('Mar 28') ? 'text-red-600' : ''}`}>{task.dueDate}</td>
                                    <td className="p-2">
                                        {task.status === 'Completed' && task.rating ? (
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className={`w-4 h-4 ${i < task.rating! ? 'text-yellow-400' : 'text-gray-300'}`} solid={i < task.rating!} />
                                                ))}
                                            </div>
                                        ) : (<span>-</span>)}
                                    </td>
                                    <td className="p-2">{task.lastUpdated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="p-4 flex justify-between items-center text-sm">
                     <div className="text-gray-500">Showing 1-10 of {tasks.length} tasks</div>
                    <nav className="flex items-center space-x-1">
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-500">Previous</a>
                        <a href="#" className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</a>
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-600">2</a>
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-600">3</a>
                         <span className="px-2">...</span>
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-600">15</a>
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-600">Next</a>
                    </nav>
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

export default TaskList;