import React from 'react';
import { Screen } from '../App';
import { teamOverviewData, openEscalationsRaisedData, openEscalationsAgainstData, auditActionsData, sessionHistoryData } from '../constants';
import { AuditAction } from '../types';
import { 
    PencilSquareIcon, ArrowDownTrayIcon, ListBulletIcon, UsersIcon, CheckSquareIcon, EyeIcon, 
    ChartBarIcon, ChevronRightIcon, CloudArrowUpIcon, HelpIcon, ClockIcon, NoSymbolIcon, 
    ExclamationTriangleIcon, ArrowUpIcon, ArrowDownIcon, StarIcon, ChatBubbleLeftRightIcon, 
    CheckCircleIcon, XCircleIcon, FlagIcon 
} from './icons';

interface TeamLeaderProfileProps {
  setActiveScreen: (screen: Screen) => void;
}

const StatCard: React.FC<{title: string, value: string, subtext: string, icon: React.ReactNode, alert?:boolean}> = 
({title, value, subtext, icon, alert}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
        <div>
            <div className="flex justify-between items-start">
                <p className="text-sm text-gray-500">{title}</p>
                {icon}
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <p className={`text-xs mt-2 ${alert ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>{subtext}</p>
    </div>
);

const PerfCard: React.FC<{title: string, value: string, trend: string, trendDirection: 'up' | 'down', trendColor: string}> = 
({title, value, trend, trendDirection, trendColor}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold my-1 text-gray-800">{value}</p>
        </div>
        <div className={`flex items-center text-xs font-medium ${trendColor}`}>
            {trendDirection === 'up' ? <ArrowUpIcon className="w-4 h-4"/> : <ArrowDownIcon className="w-4 h-4"/>}
            <span>{trend}</span>
        </div>
    </div>
);

const RedFlagsCard: React.FC = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
        <div>
            <p className="text-sm text-gray-500">Red Flags</p>
            <p className="text-3xl font-bold my-1 text-gray-800">7</p>
        </div>
        <div className="text-xs flex space-x-2">
            <span className="font-semibold text-red-500">L1: 5</span> 
            <span className="font-semibold text-red-700">L2: 2</span>
        </div>
    </div>
);

const AppreciationsCard: React.FC = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
        <div>
            <p className="text-sm text-gray-500">Appreciations</p>
            <p className="text-3xl font-bold my-1 text-gray-800">23</p>
        </div>
        <p className="text-xs text-gray-500 flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1"/> This quarter
        </p>
    </div>
);


const AuditIcon: React.FC<{ action: AuditAction['action'] }> = ({ action }) => {
    switch (action) {
        case 'Approved': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
        case 'Rejected': return <XCircleIcon className="w-5 h-5 text-red-500" />;
        case 'Reassigned': return <UsersIcon className="w-5 h-5 text-blue-500" />;
        case 'Escalated': return <ArrowUpIcon className="w-5 h-5 text-orange-500" />;
        case 'Flagged': return <FlagIcon className="w-5 h-5 text-red-500" />;
        case 'Requested Clarification': return <HelpIcon className="w-5 h-5 text-yellow-500" />;
        default: return null;
    }
};

const StatusPill: React.FC<{ status: 'Pending' | 'Urgent' | 'In Progress' }> = ({ status }) => {
    const colors = {
        Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Urgent: 'bg-red-100 text-red-800 border-red-200',
        'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colors[status]}`}>{status}</span>;
}


const TeamLeaderProfileScreen: React.FC<TeamLeaderProfileProps> = ({ setActiveScreen }) => {
    return (
        <div className="flex space-x-8 -m-8 p-8 bg-gray-50 font-sans">
            {/* Main content */}
            <div className="flex-1 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Team Leader Profile</h1>
                        <p className="text-gray-500">Identity & Authority Overview</p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm border flex items-start space-x-6">
                    <img src="https://i.pravatar.cc/150?u=lead@dws.com" alt="Michael Anderson" className="w-24 h-24 rounded-full" />
                    <div className="flex-grow">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-2xl font-bold text-gray-900">Michael Anderson</h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                               <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span> Active
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">Employee ID: EMP-2847</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm pt-4 border-t border-gray-100">
                            <div><p className="text-xs text-gray-500">Role</p><p className="font-semibold text-gray-800">Team Leader</p></div>
                            <div><p className="text-xs text-gray-500">Department</p><p className="font-semibold text-gray-800">Engineering</p></div>
                            <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold text-gray-800">m.anderson@company.com</p></div>
                            <div><p className="text-xs text-gray-500">Reporting Manager</p><p className="font-semibold text-gray-800">Sarah Williams (PM)</p></div>
                            <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold text-gray-800">+1 (555) 234-5678</p></div>
                            <div><p className="text-xs text-gray-500">Join Date</p><p className="font-semibold text-gray-800">March 15, 2023</p></div>
                        </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500">Last Login</p>
                        <p className="text-sm font-medium">Jan 16, 2026 9:15 AM</p>
                    </div>
                </div>

                {/* Role Scope & Authority */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Role Scope & Authority</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-l-4 border-purple-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Teams Owned</h4>
                            <ul className="mt-2 space-y-1 text-sm"><li className="flex items-center"><UsersIcon className="w-4 h-4 mr-2 text-purple-500"/>Backend Development Team</li><li className="flex items-center"><UsersIcon className="w-4 h-4 mr-2 text-purple-500"/>API Integration Team</li></ul>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Max Subtask Capacity per Day</h4>
                            <p className="text-4xl font-bold text-gray-900">25</p>
                            <p className="text-xs text-gray-500">Across all team members</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Approval Authority</h4>
                            <p className="font-medium text-gray-800">Subtasks Only</p>
                             <p className="text-xs text-gray-500">Cannot approve tasks or projects</p>
                        </div>
                         <div className="border-l-4 border-orange-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Escalation Level</h4>
                            <p className="font-medium text-gray-800">Project Manager</p>
                            <p className="text-xs text-gray-500">Sarah Williams</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Can Reassign Tasks</h4>
                            <p className="font-medium flex items-center text-gray-800"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-1"/> Yes</p>
                             <p className="text-xs text-gray-500">Within owned teams only</p>
                        </div>
                         <div className="border-l-4 border-red-500 pl-4 flex flex-col justify-center h-full">
                            <h4 className="font-semibold text-gray-700">Can Close Tasks</h4>
                            <p className="font-medium flex items-center text-gray-800"><XCircleIcon className="w-5 h-5 text-red-500 mr-1"/> No</p>
                             <p className="text-xs text-gray-500">Requires PM approval</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-800">Current Workload Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                        <StatCard title="Active Tasks" value="8" subtext="Across 2 teams" icon={<ListBulletIcon className="w-6 h-6 text-gray-400" />} />
                        <StatCard title="Active Subtasks" value="34" subtext="Team capacity: 68%" icon={<ListBulletIcon className="w-6 h-6 text-gray-400" />} />
                        <StatCard title="Pending Reviews" value="12" subtext="2 overdue SLA" icon={<ClockIcon className="w-6 h-6 text-orange-500" />} alert={true} />
                        <StatCard title="Blocked Items" value="5" subtext="Requires attention" icon={<NoSymbolIcon className="w-6 h-6 text-red-500" />} alert={true} />
                        <StatCard title="Overdue Items" value="3" subtext="Immediate action" icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-500" />} alert={true} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-800">Performance & Quality Summary</h3>
                        <select className="text-sm border-gray-300 rounded-md shadow-sm"><option>This Week</option></select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                        <PerfCard title="Avg Completion Time" value="4.2h" trend="12% faster" trendDirection="down" trendColor="text-green-600" />
                        <PerfCard title="On-Time Delivery" value="87%" trend="+5% vs last month" trendDirection="up" trendColor="text-green-600" />
                        <PerfCard title="Rework Rate" value="8%" trend="3% improvement" trendDirection="down" trendColor="text-green-600" />
                        <RedFlagsCard />
                        <AppreciationsCard />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                     <h3 className="text-xl font-semibold text-gray-800">Team Overview</h3>
                     <div className="overflow-x-auto mt-4">
                         <table className="w-full text-sm text-left">
                             <thead className="bg-gray-50 text-gray-500 text-xs"><tr><th className="px-4 py-2">Team Member</th><th className="px-4 py-2">Active Subtasks</th><th className="px-4 py-2">Blocked</th><th className="px-4 py-2">Pending Reviews</th><th className="px-4 py-2">Overdue</th><th className="px-4 py-2">Actions</th></tr></thead>
                             <tbody className="text-gray-700">
                                {teamOverviewData.map(m => (
                                    <tr key={m.id} className="border-b even:bg-gray-50 hover:bg-blue-50">
                                        <td className="px-4 py-2 flex items-center space-x-3"><img src={m.avatar} className="w-9 h-9 rounded-full"/><div><p className="font-medium text-gray-800">{m.name}</p><p className="text-xs text-gray-500">{m.team}</p></div></td>
                                        <td className="px-4 py-2 font-medium">{m.activeSubtasks}</td><td className="px-4 py-2 font-semibold text-red-600">{m.blocked > 0 && m.blocked}</td>
                                        <td className="px-4 py-2 font-medium">{m.pendingReviews}</td><td className="px-4 py-2 font-semibold text-red-600">{m.overdue > 0 && m.overdue}</td>
                                        <td className="px-4 py-2"><div className="flex items-center space-x-3"><button className="text-gray-400 hover:text-blue-600" title="View Tasks"><ListBulletIcon className="w-5 h-5"/></button><button className="text-gray-400 hover:text-blue-600" title="Message"><ChatBubbleLeftRightIcon className="w-5 h-5"/></button><button className="text-gray-400 hover:text-red-600" title="Escalate"><ArrowUpIcon className="w-5 h-5"/></button></div></td>
                                    </tr>
                                ))}
                             </tbody>
                         </table>
                     </div>
                </div>

                {/* Communication & Escalation */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Communication & Escalation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Open Escalations Raised</h4>
                            <div className="space-y-3">
                                {openEscalationsRaisedData.map(e => <div key={e.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow"><div className="flex justify-between items-start"><p className="font-semibold text-gray-800">{e.title}</p><StatusPill status={e.status}/></div><p className="text-xs text-gray-500 mt-1">{e.task}</p><p className="text-xs text-gray-400 mt-2">Raised: {e.raisedDate} &nbsp; To: {e.assignee}</p></div>)}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Open Escalations Against</h4>
                            <div className="space-y-3">
                                {openEscalationsAgainstData.map(e => <div key={e.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow"><div className="flex justify-between items-start"><p className="font-semibold text-gray-800">{e.title}</p><StatusPill status={e.status}/></div><p className="text-xs text-gray-500 mt-1">{e.task}</p><p className="text-xs text-gray-400 mt-2">Raised: {e.raisedDate} &nbsp; By: {e.assignee}</p></div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit & Compliance */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Audit & Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Recent Actions (Last 10)</h4>
                            <div className="space-y-4">
                                {auditActionsData.map(a => <div key={a.id} className="flex items-start text-sm"><div className="mr-3 mt-0.5 flex-shrink-0"><AuditIcon action={a.action}/></div><div><p className="text-gray-800">{a.description}</p><p className="text-xs text-gray-400">{a.timestamp} • IP: {a.ip}</p></div></div>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Session History</h4>
                            <div className="space-y-3">
                                {sessionHistoryData.map(s => <div key={s.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow"><div className="flex justify-between items-center"><p className="font-medium text-gray-800">{s.type} Session</p><span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{s.status}</span></div><div className="text-xs text-gray-500 mt-2 space-y-0.5"><p><span className="font-medium">Login:</span> {s.login}</p>{s.logout && <p><span className="font-medium">Logout:</span> {s.logout}</p>}<p><span className="font-medium">IP:</span> {s.ip}</p><p><span className="font-medium">Device:</span> {s.device}</p>{s.location && <p><span className="font-medium">Location:</span> {s.location}</p>}</div></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right sidebar */}
            <aside className="w-80 flex-shrink-0 space-y-6">
                <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"><ArrowDownTrayIcon className="w-4 h-4"/><span>Export Report</span></button>
                    <button className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 flex items-center justify-center space-x-2"><PencilSquareIcon className="w-4 h-4"/><span>Edit Profile</span></button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-md font-semibold mb-3 text-gray-800">Quick Navigation</h3>
                    <div className="space-y-1">
                        {[
                            {label: 'My Tasks', icon: <ListBulletIcon className="w-5 h-5 text-gray-500"/>, screen: Screen.MyTasks},
                            {label: 'Team Tasks', icon: <UsersIcon className="w-5 h-5 text-gray-500"/>, screen: Screen.TeamTasks},
                            {label: 'Subtasks', icon: <CheckSquareIcon className="w-5 h-5 text-gray-500"/>, screen: Screen.Subtasks},
                            {label: 'Reviews', icon: <EyeIcon className="w-5 h-5 text-gray-500"/>, screen: Screen.SubtaskReviews, badge: 12},
                            {label: 'Dashboard', icon: <ChartBarIcon className="w-5 h-5 text-gray-500"/>, screen: Screen.Dashboard},
                        ].map(item => (
                             <button onClick={() => setActiveScreen(item.screen)} key={item.label} className="w-full flex justify-between items-center p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-3">{item.icon}<span>{item.label}</span></div>
                                <div className="flex items-center space-x-2">
                                {item.badge && <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500 text-white font-semibold">{item.badge}</span>}
                                <ChevronRightIcon className="w-4 h-4 text-gray-400"/>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-md font-semibold mb-4 text-gray-800">Editable Fields</h3>
                    <div className="space-y-4">
                        <div><label className="text-xs text-gray-500">Phone Number</label><input type="text" defaultValue="+1 (555) 234-5678" className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm"/></div>
                        <div><label className="text-xs text-gray-500">Email Address</label><input type="email" defaultValue="m.anderson@company.com" className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm"/></div>
                         <div>
                            <label className="text-xs text-gray-500">Profile Photo</label>
                            <div className="mt-1 flex items-center space-x-4">
                                <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/150?u=lead@dws.com" alt="Current profile" />
                                <button type="button" className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <CloudArrowUpIcon className="w-4 h-4 text-gray-500" />
                                    <span>Upload New Photo</span>
                                </button>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors">Save Changes</button>
                    </div>
                 </div>
            </aside>
            <div className="fixed bottom-8 right-8 z-50"><button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"><HelpIcon className="w-7 h-7" /></button></div>
        </div>
    );
};

export default TeamLeaderProfileScreen;