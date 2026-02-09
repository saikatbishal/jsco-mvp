import React from 'react';
import { Project } from '../types';
import { SearchIcon, ChevronDownIcon, FilterIcon, PlusIcon, DotsVerticalIcon, HelpIcon } from './icons';
import { Screen } from '../App';

interface ProjectListProps {
    projects: Project[];
    setActiveScreen: (screen: Screen) => void;
    setSelectedProject: (project: Project) => void;
}

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  const colorClasses = {
    Active: 'bg-blue-100 text-blue-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
  };
  return <span className={`${baseClasses} ${colorClasses[status]}`}>{status}</span>;
};

const HealthBadge: React.FC<{ health: Project['health'] }> = ({ health }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const colorClasses = {
        'On Track': 'bg-green-100 text-green-800',
        'At Risk': 'bg-red-100 text-red-800',
        'Delayed': 'bg-yellow-100 text-yellow-800',
    };
    const dotClasses = {
        'On Track': 'bg-green-400',
        'At Risk': 'bg-red-400',
        'Delayed': 'bg-yellow-400',
    }

    return (
        <span className={`${baseClasses} ${colorClasses[health]}`}>
            <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${dotClasses[health]}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {health}
        </span>
    );
};

const ProgressBar: React.FC<{ progress: number; health: Project['health'] }> = ({ progress, health }) => {
    const colorClasses = {
        'On Track': 'bg-green-500',
        'At Risk': 'bg-red-500',
        'Delayed': 'bg-yellow-500',
    };
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className={`${colorClasses[health]} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
    );
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, setActiveScreen, setSelectedProject }) => {
    return (
        <div className="space-y-6">
             <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
            {/* Header and Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">Export</button>
                    <button onClick={() => setActiveScreen(Screen.CreateProjectFromDeal)} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center">
                        <PlusIcon className="w-5 h-5 mr-1"/>
                        New Project
                    </button>
                    <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?u=user-avatar" alt="User avatar" />
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm"><p className="text-gray-500">Active Projects</p><p className="text-3xl font-bold">42</p><p className="text-xs text-gray-400">Currently in progress</p></div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm"><p className="text-gray-500">At Risk</p><p className="text-3xl font-bold">8</p><p className="text-xs text-gray-400">Need immediate attention</p></div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm"><p className="text-gray-500">On Hold</p><p className="text-3xl font-bold">12</p><p className="text-xs text-gray-400">Temporarily paused</p></div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm"><p className="text-gray-500">Overdue</p><p className="text-3xl font-bold">5</p><p className="text-xs text-gray-400">Past due date</p></div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="relative">
                    <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input type="text" placeholder="Search projects, companies, services..." className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button className="flex items-center space-x-1 text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <span>Status</span> <ChevronDownIcon className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <span>Health</span> <ChevronDownIcon className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <span>Service Type</span> <ChevronDownIcon className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <span>Company</span> <ChevronDownIcon className="w-4 h-4" />
                </button>
                <div className="flex-grow"></div>
                <button className="flex items-center space-x-1 text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <FilterIcon className="w-4 h-4" /> <span>Sort</span>
                </button>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-end items-center border-b">
                    <div className="text-sm text-gray-500">
                        Showing {projects.length} of {projects.length} projects
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Project Name</th>
                                <th scope="col" className="px-6 py-3">Company</th>
                                <th scope="col" className="px-6 py-3">Team Owner</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Health</th>
                                <th scope="col" className="px-6 py-3">Progress</th>
                                <th scope="col" className="px-6 py-3">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProject(p)}>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div>{p.name}</div>
                                        <div className="text-xs text-gray-400">{p.id}</div>
                                    </td>
                                    <td className="px-6 py-4">{p.company}</td>
                                    <td className="px-6 py-4">{p.teamOwner}</td>
                                    <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                                    <td className="px-6 py-4"><HealthBadge health={p.health} /></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-20 mr-2"><ProgressBar progress={p.progress} health={p.health} /></div>
                                            <span>{p.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{p.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 flex justify-between items-center text-sm">
                     <div className="text-gray-500">
                        Showing 1-{projects.length} of {projects.length} projects
                    </div>
                    <nav className="flex items-center space-x-1">
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-500">Previous</a>
                        <a href="#" className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</a>
                        <a href="#" className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-600">Next</a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;