import React, { useState } from 'react';
import { ServiceInDeal, Deal, ProjectConfiguration } from '../types';
import { XMarkIcon } from './icons';
import { usersData } from '../constants';

interface ProjectConfigurationDrawerProps {
    service: ServiceInDeal;
    deal: Deal;
    onClose: () => void;
    onSave: (serviceId: string, config: ProjectConfiguration) => void;
}

const ProjectConfigurationDrawer: React.FC<ProjectConfigurationDrawerProps> = ({ service, deal, onClose, onSave }) => {
    
    const [config, setConfig] = useState<ProjectConfiguration>(service.configuration || {
        projectName: `${service.name} - ${deal.company}`,
        department: '',
        assignedPeople: [],
        priority: 'Medium',
        startDate: service.startDate,
        endDate: service.endDate,
        teamOwner: '',
        complexity: 'Medium',
        dependencies: [],
        internalNotes: '',
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'department') {
            setConfig(prev => ({ ...prev, department: value, assignedPeople: [] }));
        } else {
            setConfig(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAssigneeChange = (userId: string) => {
        setConfig(prev => {
            const newAssignedPeople = new Set(prev.assignedPeople);
            if (newAssignedPeople.has(userId)) {
                newAssignedPeople.delete(userId);
            } else {
                newAssignedPeople.add(userId);
            }
            return { ...prev, assignedPeople: Array.from(newAssignedPeople) };
        });
    };

    const handleSave = () => {
        onSave(service.id, config);
    };

    const departments = [...new Set(usersData.map(u => u.department).filter(Boolean))];
    const departmentMembers = usersData.filter(u => u.department === config.department);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Configure Project for Service</h2>
                        <p className="text-sm text-blue-600 font-medium">{service.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                
                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Editable PM fields */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Project Details (PM Editable)</h3>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Project Name</label>
                            <input type="text" name="projectName" value={config.projectName} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Department</label>
                                <select name="department" value={config.department} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option value="">Select Department</option>
                                    {departments.map(dep => dep && <option key={dep} value={dep}>{dep}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Priority</label>
                                <select name="priority" value={config.priority} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tentative Start Date</label>
                                <input type="date" name="startDate" value={config.startDate.split(' ').reverse().join('-')} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700">Tentative End Date</label>
                                <input type="date" name="endDate" value={config.endDate.split(' ').reverse().join('-')} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700">Assign Team Owner</label>
                                <select name="teamOwner" value={config.teamOwner} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option value="">Select Owner</option>
                                    <option>Platform Team</option><option>Design Team</option><option>Engineering Team</option>
                                </select>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700">Expected Complexity</label>
                                <select name="complexity" value={config.complexity} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option>Low</option><option>Medium</option><option>High</option>
                                </select>
                            </div>
                        </div>
                        {config.department && (
                            <div>
                                <label className="text-sm font-medium text-gray-700">Assign People</label>
                                <div className="mt-2 p-3 border rounded-md max-h-48 overflow-y-auto space-y-2">
                                    {departmentMembers.length > 0 ? departmentMembers.map(member => (
                                        <label key={member.id} className="flex items-center space-x-3 p-1 rounded-md hover:bg-gray-100 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={config.assignedPeople.includes(member.id)}
                                                onChange={() => handleAssigneeChange(member.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />
                                            <span className="text-sm">{member.name}</span>
                                            <span className="text-xs text-gray-500 ml-auto">{member.role}</span>
                                        </label>
                                    )) : (
                                        <p className="text-sm text-gray-500">No members found in this department.</p>
                                    )}
                                </div>
                            </div>
                        )}
                         <div>
                            <label className="text-sm font-medium text-gray-700">Dependencies</label>
                            <select name="dependencies" multiple className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24">
                               {deal.services.filter(s => s.id !== service.id).map(s => <option key={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Internal Notes</label>
                            <textarea name="internalNotes" value={config.internalNotes} onChange={handleInputChange} rows={3} className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    {/* Read-only fields */}
                    <div className="space-y-4 pt-6 border-t">
                         <h3 className="text-sm font-semibold text-gray-500 uppercase">Service Details (Read-Only)</h3>
                         <div className="p-4 bg-gray-50 rounded-md border text-sm grid grid-cols-2 gap-4">
                            <div><p className="text-gray-500">Billing Type</p><p className="font-medium">{service.billingType}</p></div>
                            <div><p className="text-gray-500">Amount</p><p className="font-medium">{typeof service.amount === 'number' ? `$${service.amount.toLocaleString()}` : `$${service.amount}`}</p></div>
                            <div className="col-span-2"><p className="text-gray-500">Service Description</p><p className="font-medium">{service.description}</p></div>
                         </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Save Configuration</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectConfigurationDrawer;