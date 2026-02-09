import React, { useState, useCallback } from 'react';
import { Screen } from '../App';
import { Project } from '../types';
import { dealsData, usersData, detailedTasksData } from '../constants';
import { HelpIcon, ChevronDownIcon, CalendarIcon, LightBulbIcon, CheckIcon, PaperAirplaneIcon, ChevronUpIcon, CloudArrowUpIcon, TrashIcon } from './icons';

interface CreateTaskProps {
    project: Project;
    setActiveScreen: (screen: Screen) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ project, setActiveScreen }) => {

    const [isAdvancedOpen, setAdvancedOpen] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const relatedDeal = dealsData.find(d => d.id === project.dealId);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleFileRemove = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
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
            setAttachments(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
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


    const taskTemplates = [
        'WYTLABS SEO (RISK FREE)',
        'Maps Essential 9 Tasks',
        'New Logo 4 Tasks',
        'Social 1 Tasks',
        'Client | Not Responding. 1 Tasks',
        'Client disputed 4 Tasks',
        'New Domain 4 Tasks',
        'Shift Hosting 2 Tasks'
    ];
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{relatedDeal?.company || 'Deal'}</span>
                <span className="mx-2">&gt;</span>
                <span>{project.name}</span>
                <span className="mx-2">&gt;</span>
                <span className="font-semibold text-gray-800">Create Task</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main form */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Task Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Task Template (PETL) <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    <option>Select Task Template</option>
                                    {taskTemplates.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Task Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Auto-filled from template, editable" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Related Project <span className="text-red-500">*</span></label>
                                <select defaultValue={project.name} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50">
                                    <option>{project.name}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Related Deal</label>
                                <input type="text" readOnly value={relatedDeal ? `${relatedDeal.company} - ${relatedDeal.dealName}` : 'N/A'} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Service Type <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                    <option>Select Service Type</option>
                                    <option selected>{project.serviceType}</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Priority <span className="text-red-500">*</span></label>
                                <select defaultValue="Medium" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Task Owner <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                    <option>Select Task Owner</option>
                                    {usersData.map(u => <option key={u.id}>{u.name}</option>)}
                                </select>
                            </div>
                             <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="29-01-2026" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                                <CalendarIcon className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
                            </div>
                             <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Due Date <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="12-02-2026" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                                <CalendarIcon className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                         <h2 className="text-lg font-semibold mb-2 text-gray-800">Task Description</h2>
                         <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe client requirement or expected business outcome. What should be delivered?"></textarea>
                         <p className="text-xs text-gray-500 mt-1">Provide clear context for the team executing this task</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Attachments</h2>
                        <div 
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className="relative flex justify-center w-full h-32 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors"
                        >
                            <div className="space-y-1 text-center">
                                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF, ZIP up to 25MB</p>
                            </div>
                        </div>
                        {attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium text-gray-800">{file.name}</span>
                                            <span className="text-xs text-gray-500">({formatBytes(file.size)})</span>
                                        </div>
                                        <button onClick={() => handleFileRemove(index)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                     <div className="bg-white rounded-lg shadow-sm border">
                        <button onClick={() => setAdvancedOpen(!isAdvancedOpen)} className="w-full flex justify-between items-center p-4">
                            <h2 className="text-lg font-semibold text-gray-800">Advanced Options</h2>
                            {isAdvancedOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
                        </button>
                        {isAdvancedOpen && (
                            <div className="p-6 border-t border-gray-200 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Visibility</label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                        <option>Project Team</option>
                                        <option>Entire Organization</option>
                                        <option>Only Me</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Task Type</label>
                                    <div className="mt-2 flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input id="one-time" name="task-type" type="radio" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300" />
                                            <label htmlFor="one-time" className="ml-2 block text-sm text-gray-900">One-time</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="recurring" name="task-type" type="radio" className="h-4 w-4 text-blue-600 border-gray-300" />
                                            <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">Recurring</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Successor Task (Optional)</label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                        <option>None - This task has no successor</option>
                                        {detailedTasksData.filter(t => t.project === project.name).map(task => (
                                            <option key={task.id}>{task.name}</option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">Task that should start after this one is completed</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end items-center space-x-3 pt-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Create Task</button>
                        <button className="px-5 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                            <PaperAirplaneIcon className="w-5 h-5" />
                            <span>Create Task & Notify Owner</span>
                        </button>
                    </div>

                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                            <LightBulbIcon className="w-6 h-6 text-blue-500" />
                            <h3 className="text-lg font-semibold text-blue-800">Quick Tips</h3>
                        </div>
                        <ul className="mt-4 space-y-3 text-sm text-blue-700">
                            <li className="flex items-start"><CheckIcon className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" /><span>Task templates automatically create subtasks - you don't need to add them manually</span></li>
                            <li className="flex items-start"><CheckIcon className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" /><span>Task Owner will receive notification and can start work immediately</span></li>
                            <li className="flex items-start"><CheckIcon className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" /><span>Estimated time helps with resource planning and capacity management</span></li>
                            <li className="flex items-start"><CheckIcon className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" /><span>Use clear task descriptions to reduce back-and-forth questions</span></li>
                        </ul>
                    </div>
                     <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">What Happens Next?</h3>
                        <div className="mt-4 space-y-4">
                           <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center mr-3 flex-shrink-0">1</div>
                                <div>
                                    <p className="font-semibold">Task Created</p>
                                    <p className="text-sm text-gray-500">Subtasks auto-generated from template</p>
                                </div>
                           </div>
                           <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center mr-3 flex-shrink-0">2</div>
                                <div>
                                    <p className="font-semibold">Owner Notified</p>
                                    <p className="text-sm text-gray-500">Email + in-app notification sent</p>
                                </div>
                           </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center mr-3 flex-shrink-0">3</div>
                                <div>
                                    <p className="font-semibold">Work Begins</p>
                                    <p className="text-sm text-gray-500">Owner executes subtasks in sequence</p>
                                </div>
                           </div>
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

export default CreateTask;