import React, { useState, useMemo, useEffect } from 'react';
import { Screen } from '../App';
import { HelpIcon, InformationCircleIcon, ExclamationTriangleIcon } from './icons';
import { Deal, ServiceInDeal, ProjectConfiguration, Project } from '../types';
import { dealsData } from '../constants';
import ProjectConfigurationDrawer from './ProjectConfigurationDrawer';

interface CreateProjectFromDealProps {
  deal: Deal | null;
  setActiveScreen: (screen: Screen) => void;
  onCreateProjects: (projects: Project[]) => void;
}

const DealInfo: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-xs uppercase text-gray-500 tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
);

const SummaryCard: React.FC<{ title: string; value: number; color: 'blue' | 'green' | 'purple' }> = ({ title, value, color }) => {
    const colors = {
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200 text-green-800',
        purple: 'bg-purple-50 border-purple-200 text-purple-800',
    }
    return (
        <div className={`p-4 rounded-lg border ${colors[color]}`}>
            <p className="text-sm">{title}</p>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    )
};


const CreateProjectFromDeal: React.FC<CreateProjectFromDealProps> = ({ deal, setActiveScreen, onCreateProjects }) => {
    const [selectedDeal] = useState<Deal | null>(deal || dealsData.find(d => d.id === 'DEAL-ACME-01') || null);
    const [services, setServices] = useState<ServiceInDeal[]>(selectedDeal?.services || []);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(services.filter(s=>s.status === 'Ready').map(s=>s.id)));
    
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [serviceToConfigure, setServiceToConfigure] = useState<ServiceInDeal | null>(null);

    const showWarning = useMemo(() => {
        return Array.from(selectedServices).some(id => services.find(s => s.id === id)?.status !== 'Ready');
    }, [selectedServices, services]);

    const handleConfigureClick = (service: ServiceInDeal) => {
        setServiceToConfigure(service);
        setDrawerOpen(true);
    };
    
    const handleSaveConfiguration = (serviceId: string, config: ProjectConfiguration) => {
        setServices(prev => prev.map(s => s.id === serviceId ? {...s, status: 'Ready', configuration: config} : s));
        setDrawerOpen(false);
        setServiceToConfigure(null);
    };

    const handleCheckboxChange = (serviceId: string) => {
        const newSet = new Set(selectedServices);
        if (newSet.has(serviceId)) {
            newSet.delete(serviceId);
        } else {
            newSet.add(serviceId);
        }
        setSelectedServices(newSet);
    }
    
    const handleCreateProjects = () => {
        if (!selectedDeal) return;

        const projectsToCreate: Project[] = [];
        selectedServices.forEach(serviceId => {
            const service = services.find(s => s.id === serviceId);
            if (service && service.configuration && service.status === 'Ready') {
                const newProject: Project = {
                    id: `PRJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: service.configuration.projectName,
                    company: selectedDeal.company,
                    serviceType: service.name,
                    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
                    teamOwner: service.configuration.teamOwner,
                    status: 'Active',
                    health: 'On Track',
                    progress: 0,
                    startDate: new Date(service.configuration.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
                    endDate: new Date(service.configuration.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
                    budget: typeof service.amount === 'number' ? service.amount : 0,
                    dealId: selectedDeal.id,
                };
                projectsToCreate.push(newProject);
            }
        });

        if (projectsToCreate.length > 0) {
            onCreateProjects(projectsToCreate);
        } else {
            alert('No configured services selected for project creation.');
        }
    };
    
    return (
        <div className="space-y-6 bg-gray-50 -m-8 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                         <h1 className="text-2xl font-bold text-gray-800">Deal Handoff – Convert Services to Projects</h1>
                         <p className="text-gray-600">Review sales information and create execution projects</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setActiveScreen(Screen.DealList)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Back to Deals</button>
                        <button onClick={handleCreateProjects} disabled={showWarning || selectedServices.size === 0} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Create Projects</button>
                    </div>
                </div>

                {selectedDeal ? (
                    <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Deal Summary</h2>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <DealInfo label="Client Name" value={selectedDeal.clientDetails?.name} />
                                    <DealInfo label="Company URL" value={<a href="#" className="text-blue-600">{selectedDeal.clientDetails?.url}</a>} />
                                    <DealInfo label="Contact Email" value={selectedDeal.clientDetails?.email} />
                                    <DealInfo label="Contact Phone" value={selectedDeal.clientDetails?.phone} />
                                    <DealInfo label="Total Contract Value" value={`$${selectedDeal.contractValue?.toLocaleString()}`} />
                                    <DealInfo label="Currency" value={selectedDeal.currency} />
                                    <DealInfo label="Sales Owner" value={selectedDeal.salesPerson.name} />
                                    <DealInfo label="Deal Created Date" value={selectedDeal.createdDate} />
                                </div>
                                <div className="mt-6 pt-4 border-t">
                                     <h3 className="text-xs uppercase text-gray-500 tracking-wider">Sales Notes / Handover Notes</h3>
                                     <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">{selectedDeal.salesNotes}</div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Risk & Context</h2>
                                <div>
                                    <h3 className="text-xs uppercase text-gray-500 tracking-wider">Risk Tags</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">Non-technical</span>
                                        <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded">Had bad past experience</span>
                                        <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">Needs handholding</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                     <h3 className="text-xs uppercase text-gray-500 tracking-wider">Additional Comments</h3>
                                     <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">{selectedDeal.clientRisk?.comments}</div>
                                </div>
                                <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md text-sm flex items-start space-x-2">
                                    <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p>Note: Commercial data is locked and owned by Sales.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold text-gray-800">Services in This Deal</h2>
                                <p className="text-sm text-gray-500">Each service converts into an independent project.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-2 w-10"><input type="checkbox" /></th>
                                            {['Service Name', 'Description', 'Billing Type', 'Amount', 'Start Date', 'End Date', 'Status', 'Action'].map(h => <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 divide-y divide-gray-200">
                                        {services.map(service => (
                                            <tr key={service.id}>
                                                <td className="px-4 py-3"><input type="checkbox" checked={selectedServices.has(service.id)} onChange={() => handleCheckboxChange(service.id)}/></td>
                                                <td className="px-4 py-3 font-semibold text-gray-800">{service.name}</td>
                                                <td className="px-4 py-3">{service.description}</td>
                                                <td className="px-4 py-3">{service.billingType}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-800">{typeof service.amount === 'number' ? `$${service.amount.toLocaleString()}` : `$${service.amount}`}</td>
                                                <td className="px-4 py-3">{service.startDate}</td>
                                                <td className="px-4 py-3">{service.endDate}</td>
                                                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{service.status}</span></td>
                                                <td className="px-4 py-3"><button onClick={() => handleConfigureClick(service)} className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Configure Project</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                             {showWarning && <div className="p-3 bg-yellow-50 border-t border-yellow-200 text-yellow-800 text-sm flex items-center space-x-2"><ExclamationTriangleIcon className="w-5 h-5"/><span>Configuration is required for all selected services before project creation.</span></div>}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Creation Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SummaryCard title="Total Services in Deal" value={services.length} color="blue" />
                                <SummaryCard title="Services Selected for Conversion" value={selectedServices.size} color="green" />
                                <SummaryCard title="Projects to be Created" value={selectedServices.size} color="purple" />
                            </div>
                            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                                <InformationCircleIcon className="w-5 h-5" />
                                <p>Each selected service will create one project with its own task structure.</p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center space-x-2 pt-4">
                            <button onClick={() => setActiveScreen(Screen.DealList)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Draft</button>
                            <button onClick={handleCreateProjects} disabled={showWarning || selectedServices.size === 0} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Create Projects</button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 bg-white p-12 rounded-lg border text-center">
                        <h3 className="text-lg font-semibold text-gray-600">Please select a deal to begin.</h3>
                        <p className="text-gray-500 mt-1">This screen is used to convert services from a deal into executable projects.</p>
                    </div>
                )}
            </div>
             <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
            {isDrawerOpen && serviceToConfigure && selectedDeal && (
                <ProjectConfigurationDrawer 
                    service={serviceToConfigure}
                    deal={selectedDeal}
                    onClose={() => setDrawerOpen(false)}
                    onSave={handleSaveConfiguration}
                />
            )}
        </div>
    );
};

export default CreateProjectFromDeal;
