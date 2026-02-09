import React, { useState } from 'react';
import { Screen } from '../App';
import { TaskTemplate, TemplateStep } from '../types';
import { taskTemplatesData } from '../constants';
import { SearchIcon, HelpIcon, InformationCircleIcon, DocumentIcon, ClockIcon, XMarkIcon } from './icons';

interface TaskTemplatesProps {
    setActiveScreen: (screen: Screen) => void;
}

const TemplateModal: React.FC<{ template: TaskTemplate; onClose: () => void }> = ({ template, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>Department: {template.department}</span>
                            <span>Typical Duration: {template.typicalDuration}</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">{template.status}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md flex items-start space-x-3">
                        <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">Templates are managed by Quality Team. This is a read-only view.</p>
                    </div>

                    <p className="my-4 text-sm text-gray-600">{template.description}</p>
                    
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Workflow Steps</h3>

                    <div className="relative pl-6">
                        {/* Vertical line */}
                        <div className="absolute left-9 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                        {template.steps?.map((step, index) => (
                            <div key={step.stepNumber} className="relative mb-8">
                                <div className="absolute -left-2 top-1.5 w-5 h-5 bg-purple-500 rounded-full border-4 border-white"></div>
                                <div className="ml-8">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold text-gray-800">Step {step.stepNumber} – {step.title}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${step.ownerType === 'Team Owner' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{step.ownerType}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                                        <span className="flex items-center"><ClockIcon className="w-3 h-3 mr-1" /> Estimated Time: {step.estimatedTime}</span>
                                        <span className="flex items-center"><DocumentIcon className="w-3 h-3 mr-1" /> {step.dependencies}</span>
                                    </div>
                                    {step.requiredOutputs && (
                                        <div className="mt-3 bg-gray-50 p-3 rounded-md border">
                                            <h5 className="text-xs font-semibold text-gray-600">Required Outputs:</h5>
                                            <ul className="text-sm text-gray-700 list-disc list-inside mt-1">
                                                {step.requiredOutputs.map(output => <li key={output}>{output}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Close</button>
                    <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Select Template</button>
                </div>
            </div>
        </div>
    );
};

const TaskTemplates: React.FC<TaskTemplatesProps> = ({ setActiveScreen }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);
    
    return (
        <div className="font-sans">
             <div className="bg-white shadow-sm -mt-8 -mx-8 mb-6 p-4 border-b">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pre-Existing Task List (PETL)</h1>
                        <p className="text-sm text-gray-500">Standard task workflows defined by Quality Team</p>
                    </div>
                    <div className="flex items-center space-x-4">
                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                           Read-Only Access
                       </span>
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">PM</div>
                    </div>
                </div>
             </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search by template name..." className="w-full border-gray-300 rounded-md shadow-sm text-sm pl-10 p-2" />
                </div>
                <div className="flex items-center space-x-2">
                    <select className="border-gray-300 rounded-md shadow-sm text-sm p-2">
                        <option>All Departments</option>
                        <option>Quality</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Finance</option>
                        <option>Customer Success</option>
                        <option>Operations</option>
                    </select>
                     <select className="border-gray-300 rounded-md shadow-sm text-sm p-2">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Archived</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium">Template Name</th>
                            <th className="px-6 py-3 text-left font-medium">Department</th>
                            <th className="px-6 py-3 text-left font-medium">No. of Steps</th>
                            <th className="px-6 py-3 text-left font-medium">Typical Duration</th>
                            <th className="px-6 py-3 text-left font-medium">Status</th>
                            <th className="px-6 py-3 text-left font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {taskTemplatesData.map((template) => (
                            <tr key={template.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-semibold">{template.name}</td>
                                <td className="px-6 py-4">{template.department}</td>
                                <td className="px-6 py-4">{template.stepCount} Steps</td>
                                <td className="px-6 py-4">{template.typicalDuration}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {template.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedTemplate(template)} className="font-medium text-blue-600 hover:text-blue-800">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedTemplate && <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}

            <div className="fixed bottom-8 right-8 z-40">
                <button className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default TaskTemplates;