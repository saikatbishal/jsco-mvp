import React, { useState, useEffect, useRef } from 'react';
import { Task, Risk, Subtask, ActivityLogEntry, Attachment } from '../types';
import { subtasksData, taskRisksData, activityLogDataForTask, chatData } from '../constants';
import { Screen } from '../App';
import { 
    ArrowLeftIcon, CogIcon, HelpIcon, ExclamationTriangleIcon, CreditCardIcon, CheckCircleIcon, UserCircleIcon, 
    PlayIcon, StopIcon, PaperclipIcon as LinkIcon, DocumentTextIcon, CodeBracketIcon, PhotoIcon, DocumentIconSolid, 
    ArrowDownTrayIcon, PlusIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, EnvelopeIcon, PaperAirplaneIcon
} from './icons';

interface TaskDetailProps {
  task: Task;
  setActiveScreen: (screen: Screen) => void;
}

const InfoPill: React.FC<{label: string, value: string | undefined, color?: string}> = ({label, value, color}) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-sm font-semibold ${color || 'text-gray-800'}`}>{value || 'N/A'}</p>
    </div>
);

const AttachmentIcon: React.FC<{ type: Attachment['type'] }> = ({ type }) => {
    switch (type) {
        case 'pdf': return <DocumentIconSolid className="w-6 h-6 text-red-500" />;
        case 'html': return <CodeBracketIcon className="w-6 h-6 text-blue-500" />;
        case 'json': return <CodeBracketIcon className="w-6 h-6 text-green-500" />;
        case 'image': return <PhotoIcon className="w-6 h-6 text-purple-500" />;
        case 'doc': return <DocumentIconSolid className="w-6 h-6 text-blue-600" />;
        case 'zip': return <DocumentIconSolid className="w-6 h-6 text-gray-500" />;
        default: return <DocumentTextIcon className="w-6 h-6 text-gray-500" />;
    }
};


const TaskDetail: React.FC<TaskDetailProps> = ({ task, setActiveScreen }) => {
    // Timer state
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalTimeLogged, setTotalTimeLogged] = useState(task.timeLogged || 0);
    const intervalRef = useRef<number | null>(null);
    const [activeCommTab, setActiveCommTab] = useState<'chat' | 'meet' | 'mail'>('chat');


    // Timer effect
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleStartStop = () => {
        if (isRunning) {
            // Stopping
            setTotalTimeLogged(prevTotal => prevTotal + elapsedTime);
            setElapsedTime(0);
        }
        // Toggling the state
        setIsRunning(!isRunning);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Safety checks for optional properties
    const progress = task.progress || 0;
    const scheduleStatus = task.scheduleStatus || 'On Track';
    const qualityFlag = task.qualityFlag || 'Green';
    const paymentStatus = task.paymentStatus || 'Not Linked';
    const invoiceId = task.invoiceId || '-';
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={() => setActiveScreen(Screen.TaskList)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span className="font-semibold">Task Details</span>
                </button>
                <div className="flex items-center space-x-2">
                    <button><CogIcon className="w-6 h-6 text-gray-500"/></button>
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">PM</div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{task.name}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>Project: <span className="font-medium text-blue-600">{task.project}</span></span>
                            {task.dealId && <span>DEAL: <span className="font-medium text-blue-600">{task.dealId}</span></span>}
                            {task.serviceType && <span>Service: <span className="font-medium text-gray-700">{task.serviceType}</span></span>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1.5 border rounded-md text-sm">Put On Hold</button>
                        <button className="px-3 py-1.5 border rounded-md text-sm">Change Owner</button>
                        <button className="px-3 py-1.5 border rounded-md text-sm text-red-600 border-red-200 bg-red-50">Raise Issue</button>
                        <button className="px-3 py-1.5 border rounded-md text-sm">Link Invoice</button>
                        <button className="px-3 py-1.5 border rounded-md text-sm bg-blue-600 text-white">Close Task</button>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-6 gap-4">
                    <InfoPill label="Status" value={task.status} color="text-green-600" />
                    <InfoPill label="Priority" value={task.priority} color="text-red-600" />
                    <div className="flex items-center">
                         <img src={task.assignees[0].avatar} className="w-8 h-8 rounded-full mr-2"/>
                         <InfoPill label="Task Owner" value={task.assignees.map(a => a.name).join(', ')} />
                    </div>
                    <InfoPill label="Start Date" value={task.startDate} />
                    <InfoPill label="Due Date" value={task.dueDate} />
                    <InfoPill label="Days Left" value={task.daysLeft ? `${task.daysLeft} days` : undefined} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Time Tracker</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-2xl font-bold font-mono text-gray-800">{formatTime(elapsedTime)}</span>
                        <button onClick={handleStartStop} className={`px-4 py-2 rounded-md text-white font-semibold flex items-center space-x-2 transition-colors ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                            {isRunning ? <StopIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                            <span>{isRunning ? 'Stop' : 'Start'}</span>
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Total Logged: {formatTime(totalTimeLogged + elapsedTime)}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Task Health</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-gray-800 text-lg">{progress}% Complete</span>
                                <span className="text-xs text-gray-500">17 of 25 subtasks</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3.5" title="17 of 25 subtasks completed">
                                <div
                                    className={`h-3.5 rounded-full transition-all duration-500 ${
                                        scheduleStatus === 'Late' ? 'bg-red-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-center border-t pt-2">
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Schedule</p>
                                <p className={`font-bold text-sm ${scheduleStatus === 'Late' ? 'text-red-500' : 'text-green-500'}`}>
                                    {scheduleStatus}
                                </p>
                            </div>
                            <div className="border-l h-8 mx-2"></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Quality Flag</p>
                                <p className={`font-bold text-sm ${
                                    qualityFlag === 'Yellow' ? 'text-yellow-500' : 
                                    qualityFlag === 'Red' ? 'text-red-500' : 
                                    'text-green-500'
                                }`}>
                                    {qualityFlag}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                 
                 <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                    <LinkIcon className={`w-6 h-6 ${paymentStatus === 'Linked' ? 'text-green-500' : 'text-gray-400'}`}/>
                    <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className={`text-xl font-bold ${paymentStatus === 'Linked' ? 'text-green-500' : 'text-gray-800'}`}>{paymentStatus}</p>
                        <p className="text-xs text-gray-400">Invoice {invoiceId}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg">Task Business Context</h3>
                        <div className="mt-4 space-y-2 text-sm">
                            <p><strong className="font-medium text-gray-600">Description:</strong> Complete the second phase of the website redesign project including responsive implementation, performance optimization, and integration with the new CMS. This phase scheduled frontend development, backend API integration, and comprehensive testing across all devices and browsers.</p>
                            <p><strong className="font-medium text-gray-600">Client Expectation:</strong> Client expects pixel-perfect implementation matching approved designs, page load time under 2 seconds, and full mobile responsiveness. All functionality must be tested and approved before final delivery on Feb 28, 2024.</p>
                        </div>
                        <div className="mt-4 pt-4 border-t flex space-x-8 text-sm">
                            <div><span className="font-medium text-gray-600">Template Used:</span> Web Development - Standard PETL</div>
                             <div><span className="font-medium text-gray-600">Total Estimated Time:</span> 240 hours</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg">Execution Snapshot</h3>
                        <div className="grid grid-cols-3 gap-4 my-4">
                            <div className="p-4 bg-gray-100 rounded-md text-center"><p className="text-2xl font-bold">25</p><p className="text-sm text-gray-500">Total Subtasks</p></div>
                            <div className="p-4 bg-green-100 rounded-md text-center"><p className="text-2xl font-bold text-green-700">17</p><p className="text-sm text-green-600">Completed</p></div>
                            <div className="p-4 bg-yellow-100 rounded-md text-center"><p className="text-2xl font-bold text-yellow-700">8</p><p className="text-sm text-yellow-600">Pending</p></div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-xs text-blue-700">Current Step</p>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Performance Optimization & Testing</p>
                                <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">In-Progress</span>
                            </div>
                            <div className="flex space-x-4 text-sm mt-1">
                                <span>Owner: <span className="font-medium">Marcus Chen</span></span>
                                <span>Due Date: <span className="font-medium">Feb 20, 2024</span></span>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Issues & Risks</h3>
                            <div>
                                <button className="px-3 py-1.5 border rounded-md text-sm mr-2">Raise Issue</button>
                                <button className="px-3 py-1.5 border rounded-md text-sm bg-red-600 text-white">Escalate</button>
                            </div>
                        </div>
                        <div className="mt-4 space-y-3">
                            {taskRisksData.map(risk => (
                                <div key={risk.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{risk.title}</p>
                                        <span className="text-xs bg-white border px-2 py-0.5 rounded-full">{risk.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                                    <div className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                                        <img src={`https://i.pravatar.cc/150?u=${risk.owner?.name}`} className="w-4 h-4 rounded-full"/>
                                        <span>Raised by {risk.owner?.name} &middot; {risk.date}</span>
                                    </div>
                                </div>
                            ))}
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
                </div>
                <div className="space-y-6">
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="font-semibold text-lg">Attachments</h3>
                             <button className="flex items-center space-x-1 text-sm text-blue-600 font-medium">
                                 <PlusIcon className="w-4 h-4" />
                                 <span>Add</span>
                             </button>
                        </div>
                         <div className="space-y-3">
                             {task.attachments && task.attachments.length > 0 ? task.attachments.map(att => (
                                 <div key={att.id} className="flex items-center p-2 border rounded-md">
                                     <AttachmentIcon type={att.type} />
                                     <div className="ml-3 flex-grow">
                                         <p className="text-sm font-medium">{att.name}</p>
                                         <p className="text-xs text-gray-500">{att.size}</p>
                                     </div>
                                     <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                     </button>
                                 </div>
                             )) : (
                                <p className="text-sm text-gray-500 text-center py-4">No attachments yet.</p>
                             )}
                         </div>
                     </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                         <h3 className="font-semibold text-lg">Activity Timeline</h3>
                         <div className="mt-4 space-y-4">
                            {activityLogDataForTask.map(log => (
                                <div key={log.id} className="flex items-start text-sm">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <log.icon className="w-5 h-5 text-gray-500"/>
                                    </div>
                                    <div>
                                        <p className="font-medium">{log.title}</p>
                                        <p className="text-gray-600">{log.description}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{log.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button className="text-blue-600 text-sm font-medium mt-4">View Full History</button>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    )
};

export default TaskDetail;