import React, { useState } from 'react';
import { Project, Task, Risk, AuditLogEntry, ChatMessage } from '../types';
// FIX: Correctly import aliased data sources from constants. `tasksData`, `risksData`, and `auditLogData` were not exported directly.
import { detailedTasksData as tasksData, taskRisksData as risksData, auditLogData, chatData } from '../constants';
import { Screen } from '../App';
// FIX: Imported missing CreditCardIcon.
import { 
    PencilIcon, PauseCircleIcon, ExclamationTriangleIcon, ArrowPathIcon, DocumentDuplicateIcon, CheckCircleIcon, 
    UserCircleIcon, CalendarIcon, PlusCircleIcon, ArrowDownIcon, ListBulletIcon, EyeIcon, PaperclipIcon, PlusIcon, 
    UsersIcon, XCircleIcon, CreditCardIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, EnvelopeIcon, PaperAirplaneIcon
} from './icons';

interface ProjectDetailProps {
  project: Project;
  setActiveScreen: (screen: Screen) => void;
}

const StatCard: React.FC<{title: string, value: React.ReactNode, icon: React.ReactNode}> = ({title, value, icon}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
        <div className="p-3 rounded-full bg-gray-100 mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <div className="text-xl font-bold text-gray-800">{value}</div>
        </div>
    </div>
);

const TaskStatusBadge: React.FC<{status: Task['status']}> = ({status}) => {
    // FIX: Add 'Submitted for Review' status to handle all possible task statuses.
    const colors: { [key in Task['status']]: string } = {
        'Completed': 'bg-green-100 text-green-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Not Started': 'bg-gray-100 text-gray-800',
        'Blocked': 'bg-red-100 text-red-800',
        'Submitted for Review': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, setActiveScreen }) => {
    const [activeCommTab, setActiveCommTab] = useState<'chat' | 'meet' | 'mail'>('chat');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold text-gray-500">{project.id}</h2>
                        <button title="Copy Project ID"><DocumentDuplicateIcon className="w-5 h-5 text-gray-400" /></button>
                    </div>
                    <span className="text-gray-300">&gt;</span>
                    <h2 className="text-lg font-semibold text-gray-500">{project.company}</h2>
                    <span className="text-gray-300">&gt;</span>
                    <h2 className="text-lg font-semibold text-gray-800">{project.serviceType}</h2>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><PencilIcon className="w-4 h-4" /><span>Edit Scope</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><PauseCircleIcon className="w-4 h-4" /><span>Put On Hold</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 text-red-600"><ExclamationTriangleIcon className="w-4 h-4" /><span>Escalate</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"><ArrowPathIcon className="w-4 h-4" /><span>Change Status</span></button>
                </div>
            </div>

            {/* Sub-Header info */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <div className="flex items-center space-x-4">
                     <div>
                        <p className="text-xs text-gray-500">Timeline</p>
                        <p className="text-sm font-medium">{project.startDate} - {project.endDate}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>{project.status}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">Project Owner</p>
                        <p className="text-sm font-medium">{project.projectOwner.name}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">Team Owner</p>
                        <p className="text-sm font-medium">{project.teamOwner}</p>
                    </div>
                </div>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Timeline Health" value={<span className="text-green-600">On Track</span>} icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />} />
                <StatCard title="Task Completion" value={<>68% <span className="text-sm text-gray-400 font-normal">12 of 18</span></>} icon={<CheckCircleIcon className="w-6 h-6 text-blue-600" />} />
                <StatCard title="Risk Level" value={<span className="text-yellow-600">Medium</span>} icon={<ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />} />
                <StatCard title="Budget Usage" value={<>42% <span className="text-sm text-gray-400 font-normal">$10,500</span></>} icon={<CreditCardIcon className="w-6 h-6 text-purple-600" />} />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Scope Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">Scope Summary</h3>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Read-only</span>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 space-y-3">
                            <div>
                                <h4 className="font-medium text-gray-700">SCOPE DESCRIPTION</h4>
                                <p>Complete technical audit, keyword research, on-page optimization for 50 pages, backlink analysis, and monthly reporting dashboard</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">DELIVERABLES</h4>
                                <ul className="list-disc list-inside">
                                    <li>Technical SEO audit report</li>
                                    <li>Keyword research document with 200+ keywords</li>
                                    <li>On-page optimization for 50 web pages</li>
                                    <li>Monthly performance reports</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Task List */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-gray-800">Task List</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 text-xs">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Task Name</th>
                                        <th className="px-4 py-2 text-left">Task Owner</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Due Date</th>
                                        <th className="px-4 py-2 text-left">Dependency</th>
                                        <th className="px-4 py-2 text-left">% Complete</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasksData.map(task => (
                                    <tr key={task.id} className="border-b">
                                        <td className="px-4 py-3 font-medium">{task.name}</td>
                                        <td className="px-4 py-3">{task.assignees.map(a => a.name).join(', ')}</td>
                                        <td className="px-4 py-3"><TaskStatusBadge status={task.status}/></td>
                                        <td className="px-4 py-3">{task.dueDate}</td>
                                        <td className="px-4 py-3">{task.dependencies.type}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center">
                                                <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${task.progress}%`}}></div></div>
                                                <span>{task.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-1 text-gray-500">
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="View Details"><EyeIcon className="w-4 h-4"/></button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="Change Owner"><UserCircleIcon className="w-4 h-4"/></button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="Attach Files"><PaperclipIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                    {/* Dependency & Sequence */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3">Dependency & Sequence</h3>
                        <div className="space-y-2 text-sm">
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded flex items-center justify-between"><span>Technical Audit</span> <ListBulletIcon className="w-4 h-4" /></div>
                            <div className="flex justify-center"><ArrowDownIcon className="w-4 h-4 text-gray-400" /></div>
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded flex items-center justify-between"><span>Keyword Research</span> <ListBulletIcon className="w-4 h-4" /></div>
                             <div className="flex justify-center"><ArrowDownIcon className="w-4 h-4 text-gray-400" /></div>
                            <div className="p-2 bg-green-50 border border-green-200 rounded flex items-center justify-between"><span>On-page Optimization</span> <ListBulletIcon className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">Current Phase: <span className="font-medium text-gray-700">On-page Optimization</span></div>
                    </div>
                    {/* Audit & Activity Log */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3">Audit & Activity Log</h3>
                        <div className="space-y-3">
                            {auditLogData.map(log => {
                                const icons: { [key in AuditLogEntry['type']]: React.ReactNode } = {
                                    StatusChange: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
                                    OwnerChange: <UserCircleIcon className="w-4 h-4 text-blue-500" />,
                                    TimelineUpdate: <CalendarIcon className="w-4 h-4 text-purple-500" />,
                                    TaskCompleted: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
                                    RiskEscalated: <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />,
                                    NewTask: <PlusCircleIcon className="w-4 h-4 text-blue-500" />
                                };
                                return (
                                <div key={log.id} className="flex items-start text-xs">
                                    <div className="mt-0.5 mr-2">{icons[log.type]}</div>
                                    <div>
                                        <p className="text-gray-700">{log.description}</p>
                                        <p className="text-gray-400">{log.date}</p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Communication Hub */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Communication Hub</h3>
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveCommTab('chat')}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeCommTab === 'chat' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    >
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        <span>Team Chat</span>
                    </button>
                    <button
                        onClick={() => setActiveCommTab('meet')}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeCommTab === 'meet' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    >
                        <VideoCameraIcon className="w-5 h-5" />
                        <span>Instant Meeting</span>
                    </button>
                    <button
                        onClick={() => setActiveCommTab('mail')}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeCommTab === 'mail' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    >
                        <EnvelopeIcon className="w-5 h-5" />
                        <span>Mail Communication</span>
                    </button>
                </div>

                <div className="mt-4">
                    {activeCommTab === 'chat' && (
                        <div className="space-y-4">
                            <div className="h-64 overflow-y-auto pr-4 space-y-4">
                                {chatData.map(chat => (
                                    <div key={chat.id} className="flex items-start space-x-3">
                                        <img src={chat.author.avatar} alt={chat.author.name} className="w-8 h-8 rounded-full" />
                                        <div className="flex-1">
                                            <div className="flex items-baseline space-x-2">
                                                <p className="font-semibold text-sm">{chat.author.name}</p>
                                                <p className="text-xs text-gray-400">{chat.timestamp}</p>
                                            </div>
                                            <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">{chat.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2 pt-4 border-t">
                                <img src="https://i.pravatar.cc/150?u=johncarter" alt="Your avatar" className="w-8 h-8 rounded-full" />
                                <input type="text" placeholder="Type your message..." className="flex-1 p-2 border border-gray-300 rounded-md" />
                                <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" title="Send Message">
                                    <PaperAirplaneIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                    {activeCommTab === 'meet' && (
                        <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700">Start an Instant Meeting</h4>
                            <p className="text-sm text-gray-500 mt-1 mb-4">This feature will be available in Phase 2.</p>
                            <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">Start a Meeting</button>
                        </div>
                    )}
                    {activeCommTab === 'mail' && (
                         <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700">Send Email to Team</h4>
                            <p className="text-sm text-gray-500 mt-1 mb-4">This feature will be available in Phase 2.</p>
                            <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">Compose Email</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mt-6">
                <p className="text-sm font-medium text-gray-700">Project Management Actions</p>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setActiveScreen(Screen.CreateTask)} className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><PlusIcon className="w-4 h-4" /><span>Add Task</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><UsersIcon className="w-4 h-4" /><span>Change Owner</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><CalendarIcon className="w-4 h-4" /><span>Update Timeline</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"><PauseCircleIcon className="w-4 h-4" /><span>Put On Hold</span></button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"><XCircleIcon className="w-4 h-4" /><span>Close Project</span></button>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail;