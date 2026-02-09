import React from 'react';
import { Screen } from '../App';
import { TaskForReview } from '../types';
import { taskForReviewData } from '../constants';
// FIX: Import missing icon components.
import { ArrowLeftIcon, BellIcon, BuildingOfficeIcon, CalendarIcon, CheckCircleIcon, ClockIcon, CodeBracketIcon, DocumentTextIcon, ExclamationTriangleIcon, FolderIcon, HelpIcon, NoSymbolIcon, PaperAirplaneIcon, PhotoIcon, StarIcon, UserCircleIcon, XCircleIcon, CogIcon } from './icons';

const Header: React.FC = () => (
    <div className="bg-white shadow-sm -mt-8 -mx-8 mb-6">
        <div className="max-w-full mx-auto py-3 px-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                 <h1 className="text-xl font-semibold text-gray-900">DWS</h1>
                 <nav className="flex items-center space-x-1">
                    <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard</a>
                    <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
                    <a href="#" className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Tasks</a>
                    <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Companies</a>
                    <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Reports</a>
                 </nav>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500"><BellIcon className="h-6 w-6" /></button>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500"><CogIcon className="h-6 w-6" /></button>
                <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">PM</div>
                    <span className="text-sm font-medium">Project Manager</span>
                </div>
            </div>
        </div>
    </div>
);

const StatusStep: React.FC<{ title: string; icon: React.ReactNode; status: 'done' | 'current' | 'next'; isLast?: boolean; }> = ({ title, icon, status, isLast }) => {
    const colorClasses = {
        done: 'bg-green-500 text-white',
        current: 'bg-yellow-400 text-white',
        next: 'bg-gray-200 text-gray-400',
    };
    return (
        <div className="flex items-center flex-1">
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[status]}`}>{icon}</div>
                <p className={`text-sm mt-2 font-medium ${status === 'next' ? 'text-gray-500' : 'text-gray-800'}`}>{title}</p>
            </div>
            {!isLast && <div className={`flex-1 h-0.5 ${status === 'done' ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
        </div>
    );
};

const AttachmentIcon: React.FC<{ type: 'pdf' | 'html' | 'json' | 'image' }> = ({ type }) => {
    switch (type) {
        case 'pdf': return <DocumentTextIcon className="w-6 h-6 text-red-500" />;
        case 'html': return <CodeBracketIcon className="w-6 h-6 text-blue-500" />;
        case 'json': return <CodeBracketIcon className="w-6 h-6 text-green-500" />;
        case 'image': return <PhotoIcon className="w-6 h-6 text-purple-500" />;
        default: return <DocumentTextIcon className="w-6 h-6 text-gray-500" />;
    }
};

interface TaskReviewProps {
    task: TaskForReview;
    setActiveScreen: (screen: Screen) => void;
}

const TaskReview: React.FC<TaskReviewProps> = ({ task: initialTask, setActiveScreen }) => {
    const task = taskForReviewData;

    return (
        <div className="font-sans">
            <Header />
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-sm text-gray-500">Projects &gt; {task.project} &gt; <span className="font-medium text-gray-700">Task Review</span></div>
                    <h1 className="text-3xl font-bold text-gray-800 mt-2">{task.name} <span className="ml-2 text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full align-middle">Submitted for Review</span></h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center"><FolderIcon className="w-4 h-4 mr-1.5"/>Project: {task.project}</span>
                        <span className="flex items-center"><BuildingOfficeIcon className="w-4 h-4 mr-1.5"/>{task.company}</span>
                        <span className="flex items-center"><UserCircleIcon className="w-4 h-4 mr-1.5"/>Task Owner: {task.assignees.map(a => a.name).join(', ')}</span>
                        <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1.5"/>Submitted: {task.submittedDate}</span>
                    </div>
                </div>
                <button onClick={() => setActiveScreen(Screen.ProjectDetail)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"><ArrowLeftIcon className="w-5 h-5"/><span>Back to Project</span></button>
            </div>
            
            <div className="flex items-center justify-between my-8 px-10">
                <StatusStep title="Created" icon={<CheckCircleIcon className="w-6 h-6"/>} status="done" />
                <StatusStep title="In Progress" icon={<CheckCircleIcon className="w-6 h-6"/>} status="done" />
                <StatusStep title="Submitted for Review" icon={<ClockIcon className="w-6 h-6"/>} status="current" />
                <StatusStep title="Reviewed" icon={<StarIcon className="w-6 h-6"/>} status="next" />
                <StatusStep title="Closed" icon={<NoSymbolIcon className="w-6 h-6"/>} status="next" isLast />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mr-3"/>
                                <h2 className="text-xl font-semibold text-yellow-800">PM Review Required</h2>
                            </div>
                            <span className="text-sm font-bold text-yellow-800 bg-yellow-200 px-3 py-1 rounded-md">PENDING REVIEW</span>
                        </div>
                        <div className="bg-white p-4 rounded-md mt-4 grid grid-cols-2 gap-4">
                            <div><p className="text-xs text-gray-500">TASK OWNER</p><p className="font-semibold">{task.assignees.map(a => a.name).join(', ')}</p></div>
                            <div><p className="text-xs text-gray-500">COMPLETION DATE</p><p className="font-semibold">{task.completionDate}</p></div>
                        </div>
                        <div className="bg-white p-4 rounded-md mt-4">
                            <h3 className="font-semibold text-sm mb-2">EXECUTION SUMMARY</h3>
                            <ul className="space-y-1.5">
                                {task.executionSummary.map(item => <li key={item} className="flex items-center text-sm"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2"/>{item}</li>)}
                            </ul>
                        </div>
                         <div className="bg-white p-4 rounded-md mt-4">
                            <h3 className="font-semibold text-sm mb-2">REVIEW CHECKLIST (MANDATORY)</h3>
                            <div className="space-y-3">
                                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2"/><div><p className="font-medium text-sm">Scope met</p><p className="text-xs text-gray-500">All requirements from task description fulfilled</p></div></label>
                                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2"/><div><p className="font-medium text-sm">Quality acceptable</p><p className="text-xs text-gray-500">Code quality, testing, and documentation standards met</p></div></label>
                                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2"/><div><p className="font-medium text-sm">Client expectation met</p><p className="text-xs text-gray-500">Deliverable aligns with client requirements</p></div></label>
                                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2"/><div><p className="font-medium text-sm">No open blockers</p><p className="text-xs text-gray-500">All dependencies resolved, no pending issues</p></div></label>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"><CheckCircleIcon className="w-5 h-5"/><span>Approve Task</span></button>
                            <button className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 flex items-center justify-center space-x-2"><XCircleIcon className="w-5 h-5"/><span>Reject & Reopen Task</span></button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-4">Task Details</h3>
                        <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                            <div><p className="text-xs text-gray-500">PRIORITY</p><span className="font-semibold px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">{task.priority}</span></div>
                            <div><p className="text-xs text-gray-500">ESTIMATED HOURS</p><p className="font-semibold">40 hours</p></div>
                            <div><p className="text-xs text-gray-500">START DATE</p><p className="font-semibold">{task.startDate}</p></div>
                            <div><p className="text-xs text-gray-500">DUE DATE</p><p className="font-semibold">{task.dueDate}</p></div>
                        </div>
                        <div className="text-sm space-y-3 text-gray-700">
                             <div><h4 className="font-semibold text-gray-800">DESCRIPTION</h4><p>{task.description}</p></div>
                             <div><h4 className="font-semibold text-gray-800">ACCEPTANCE CRITERIA</h4><ul className="list-disc list-inside space-y-1">{task.acceptanceCriteria.map(c => <li key={c}>{c}</li>)}</ul></div>
                        </div>
                    </div>
                     <div className="bg-white rounded-lg shadow-sm border">
                         <h3 className="font-semibold text-lg p-6">Review History</h3>
                         <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 text-xs">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium">REVIEW DATE</th>
                                    <th className="px-4 py-2 text-left font-medium">REVIEWER</th>
                                    <th className="px-4 py-2 text-left font-medium">RATING</th>
                                    <th className="px-4 py-2 text-left font-medium">COMMENT</th>
                                    <th className="px-4 py-2 text-left font-medium">OUTCOME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task.reviewHistory.map(h => (
                                <tr key={h.id} className="border-b">
                                    <td className="px-4 py-3">{h.date}</td><td className="px-4 py-3">{h.reviewer}</td>
                                    <td className="px-4 py-3">-</td><td className="px-4 py-3">{h.comment}</td>
                                    <td className="px-4 py-3"><span className="font-semibold px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">{h.outcome}</span></td>
                                </tr>
                                ))}
                                <tr><td colSpan={5} className="px-4 py-3 text-center text-gray-500">No prior reviews</td></tr>
                            </tbody>
                         </table>
                     </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-3">Task Information</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">TASK ID</span><span className="font-medium">{task.id}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">CREATED BY</span><span className="font-medium">{task.createdBy}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">CREATED DATE</span><span className="font-medium">{task.createdDate}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">LAST MODIFIED</span><span className="font-medium">{task.lastModified}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">TIME TRACKED</span><span className="font-medium">{task.timeTracked}</span></div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-3">Dependencies</h3>
                        <div className="space-y-2">
                            {task.dependenciesList.map(d => (
                                <div key={d.id} className="p-2 border rounded-md flex justify-between items-center"><p>{d.name}<br/><span className="text-xs text-gray-400">{d.id}</span></p><span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Done</span></div>
                            ))}
                        </div>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-3">Attachments</h3>
                        <div className="space-y-2">
                           {task.attachments.map(a => (
                            <div key={a.id} className="p-2 border rounded-md flex items-center"><AttachmentIcon type={a.type as 'pdf' | 'html' | 'json' | 'image'}/><div className="ml-2"><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-gray-500">{a.size}</p></div></div>
                           ))}
                        </div>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-3">Activity Log</h3>
                        <div className="space-y-3">
                           {task.reviewActivityLog.map(l => (
                             <div key={l.id} className="flex items-start text-sm"><div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0"><l.icon className="w-4 h-4 text-gray-500"/></div><div><p>{l.text}</p><p className="text-xs text-gray-400">{l.time}</p></div></div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">Task review workflow ensures quality control and PM accountability before task closure. All tasks require PM review and rating.</p>
            <div className="fixed bottom-8 right-8 z-50"><button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"><HelpIcon className="w-7 h-7" /></button></div>
        </div>
    );
};


export default TaskReview;
