import React, { useState, useEffect, useRef } from 'react';
import { Screen } from '../App';
import { Task, Attachment } from '../types';
import { teamMemberTaskDetailData, frontendIntegrationActivityLog } from '../constants';
import { 
    HelpIcon, CheckCircleIcon, PlayIcon, UserCircleIcon, StopIcon, CalendarIcon, ChatBubbleLeftRightIcon,
    CloudArrowUpIcon, TrashIcon, ArrowDownTrayIcon, DocumentTextIcon, CodeBracketIcon, PhotoIcon, DocumentIconSolid 
} from './icons';

interface TeamMemberTaskDetailProps {
    task: Task;
    setActiveScreen: (screen: Screen) => void;
}

const ActivityLogEntry: React.FC<{entry: typeof frontendIntegrationActivityLog[0]}> = ({ entry }) => {
    const icons = {
        play: <PlayIcon className="w-5 h-5 text-gray-500" />,
        check: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        assign: <UserCircleIcon className="w-5 h-5 text-purple-500" />,
        change: <PlayIcon className="w-5 h-5 text-yellow-500" />
    }
    const iconColors = {
        play: 'bg-blue-100',
        check: 'bg-green-100',
        assign: 'bg-purple-100',
        change: 'bg-yellow-100'
    }

    return (
        <div className="flex items-start space-x-4">
            <div className={`relative flex-shrink-0`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColors[entry.icon]}`}>
                    {icons[entry.icon]}
                </div>
            </div>
            <div>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: entry.text }}></p>
                <p className="text-xs text-gray-400 mt-0.5">{entry.time}</p>
            </div>
        </div>
    );
};

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


const TeamMemberTaskDetail: React.FC<TeamMemberTaskDetailProps> = ({ task, setActiveScreen }) => {
    const [activeTab, setActiveTab] = useState('Activity Log');
    const [comment, setComment] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalTimeLogged, setTotalTimeLogged] = useState(task.timeLogged || 0);
    const intervalRef = useRef<number | null>(null);
    const [newAttachments, setNewAttachments] = useState<File[]>([]);


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
            setTotalTimeLogged(prevTotal => prevTotal + elapsedTime);
            setElapsedTime(0);
        }
        setIsRunning(!isRunning);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleFileRemove = (index: number) => {
        setNewAttachments(prev => prev.filter((_, i) => i !== index));
    };
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
    };
    
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setNewAttachments(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
            e.dataTransfer.clearData();
        }
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    const currentTask = task.name === 'Frontend Integration' ? teamMemberTaskDetailData : task;
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Activity Log':
                return (
                    <div className="space-y-6 relative">
                        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                        {frontendIntegrationActivityLog.map(entry => <ActivityLogEntry key={entry.time} entry={entry} />)}
                    </div>
                );
            case 'Comments':
                 return <p>Comments functionality is not yet implemented.</p>;
            case 'Attachments':
                return (
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Existing Attachments</h4>
                            <div className="space-y-2">
                                {currentTask.attachments && currentTask.attachments.length > 0 ? currentTask.attachments.map(att => (
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
                                )) : <p className="text-sm text-gray-500">No existing attachments.</p>}
                            </div>
                        </div>

                        <div>
                             <h4 className="text-sm font-semibold text-gray-700 my-2">Upload New Files</h4>
                            <div 
                                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                                className="relative flex justify-center w-full h-32 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors"
                            >
                                <div className="space-y-1 text-center"><CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} /></label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                </div>
                            </div>
                             {newAttachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <h5 className="text-xs font-semibold text-gray-600">New files to upload:</h5>
                                    {newAttachments.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                                            <p className="text-sm font-medium text-gray-800">{file.name} <span className="text-xs text-gray-500">({formatBytes(file.size)})</span></p>
                                            <button onClick={() => handleFileRemove(index)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    ))}
                                    <button className="w-full mt-2 px-3 py-1.5 bg-gray-800 text-white text-sm font-semibold rounded-md hover:bg-gray-900">Upload Files</button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 -m-8 p-8 bg-gray-50">
            <p className="text-sm text-gray-500">
                Projects &gt; {currentTask.project}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border space-y-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{currentTask.name}</h1>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">High Priority</span>
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">In Progress</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Owner</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <img src={currentTask.manager?.avatar} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold">{currentTask.manager?.name}</p>
                                    <p className="text-xs text-gray-500">Team Owner</p>
                                </div>
                            </div>
                        </div>
                         <div>
                            <p className="text-xs text-gray-500 uppercase">Assigned To</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <img src={currentTask.assignees[0].avatar} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold">{currentTask.assignees[0].name} (You)</p>
                                    <p className="text-xs text-gray-500">Team Member</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-4 border-t text-sm">
                        <div><p className="text-xs text-gray-500 uppercase">Status</p><p className="font-semibold">{currentTask.status}</p></div>
                        <div><p className="text-xs text-gray-500 uppercase">Priority</p><p className="font-semibold">{currentTask.priority}</p></div>
                        <div><p className="text-xs text-gray-500 uppercase">Due Date</p><p className="font-semibold">{currentTask.dueDate}</p></div>
                        <div><p className="text-xs text-gray-500 uppercase">Estimated Time</p><p className="font-semibold">24 hours</p></div>
                    </div>

                     <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500 uppercase mb-2">Output Requirements</p>
                        <div className="space-y-3">
                            {currentTask.outputRequirements?.map((req, index) => (
                                <label key={index} className="flex items-center p-3 rounded-md bg-gray-50 border border-gray-200 cursor-pointer">
                                    <input type="checkbox" checked={req.completed} readOnly className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className={`ml-3 text-sm ${req.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{req.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500 uppercase mb-2">Dependencies</p>
                        <div className="space-y-2">
                            {currentTask.dependenciesList?.map(dep => (
                                <div key={dep.name} className={`p-3 rounded-lg flex items-center space-x-3 ${dep.status === 'Completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                    <CheckCircleIcon className={`w-6 h-6 ${dep.status === 'Completed' ? 'text-green-500' : 'text-gray-300'}`} />
                                    <div>
                                        <p className="font-semibold">{dep.name}</p>
                                        <p className="text-xs text-gray-500">{dep.id} • Completed on {dep.completedDate}</p>
                                    </div>
                                    <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-white">{dep.status}</span>
                                </div>
                            ))}
                             <div className="p-3 rounded-lg flex items-center space-x-3 bg-blue-50 border-blue-200">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center animate-pulse">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-3 0v-9A1.5 1.5 0 0110 3.5z"/></svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-800">Frontend Integration</p>
                                    <p className="text-xs text-blue-600">Task #345 • In Progress</p>
                                </div>
                                <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-white text-blue-800">Current Task</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium text-gray-800">Time Tracker</h4>
                            <span className="text-2xl font-bold font-mono text-gray-800">{formatTime(totalTimeLogged + elapsedTime)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={handleStartStop} className={`w-full py-3 font-semibold rounded-md flex items-center justify-center space-x-2 ${isRunning ? 'bg-white border border-gray-300 hover:bg-gray-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                {isRunning ? <StopIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5" />}
                                <span>{ isRunning ? 'Pause Task' : (totalTimeLogged > 0 || elapsedTime > 0) ? 'Continue Task' : 'Start Task' }</span>
                            </button>
                            <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 flex items-center justify-center space-x-2">
                                <CheckCircleIcon className="w-5 h-5" />
                                <span>Submit for Review</span>
                            </button>
                            <button className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 flex items-center justify-center space-x-2">
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                <span>Need More Information</span>
                            </button>
                            <button className="w-full py-3 bg-white border border-gray-300 font-semibold rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2">
                                <CalendarIcon className="w-5 h-5" />
                                <span>Request Due Date Change</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex border-b">
                        {['Activity Log', 'Comments', 'Attachments'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>{tab}</button>
                        ))}
                    </div>

                    <div className="mt-4">
                        {renderTabContent()}
                    </div>
                    
                    <div className="mt-6 flex items-start space-x-3 pt-4 border-t">
                        <img src={currentTask.assignees[0].avatar} className="w-9 h-9 rounded-full"/>
                        <div className="flex-1">
                            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2} className="w-full p-2 border rounded-md text-sm" placeholder="Add a comment..."></textarea>
                            <button className="mt-2 px-3 py-1.5 bg-gray-800 text-white text-sm font-semibold rounded-md hover:bg-gray-900">Add Comment</button>
                        </div>
                    </div>
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

export default TeamMemberTaskDetail;