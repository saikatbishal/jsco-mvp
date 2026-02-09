import React, { useState } from 'react';
import { Agency, Company, CompanyDeal, CompanyProject } from '../types';
import { SearchIcon, BellIcon, HelpIcon, FilterIcon, ChevronDownIcon, ChevronRightIcon, BuildingOfficeIcon, UserCircleIcon, TagIcon, ClipboardDocumentListIcon, UsersIcon, BriefcaseIcon, FolderIcon, ListBulletIcon, DotsVerticalIcon, CogIcon } from './icons';

const Header: React.FC = () => (
    <div className="bg-white shadow-sm -mt-6 -mx-8 mb-6">
        <div className="max-w-full mx-auto py-3 px-8 flex justify-end items-center">
            <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500"><CogIcon className="h-6 w-6" /></button>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500"><BellIcon className="h-6 w-6" /></button>
                <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">PM</div>
                    <span className="text-sm font-medium">Project Manager</span>
                </div>
            </div>
        </div>
    </div>
);

type Item = Agency | Company;

interface CompaniesProps {
    companiesAndAgencies: (Agency | Company)[];
}

const Companies: React.FC<CompaniesProps> = ({ companiesAndAgencies }) => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'agency-1': true, 'comp-1': true });

    const toggleItem = (id: string) => {
        setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
    return (
        <div className="font-sans">
            <Header />
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Companies & Agencies</h1>
                    <p className="text-sm text-gray-500">Manage all companies and agencies with their associated deals and projects</p>
                </div>
                <div className="text-sm">
                    <span className="font-medium">Total Companies:</span> <span className="text-gray-600">{companiesAndAgencies.filter(item => item.type === 'Company').length}</span>
                    <span className="mx-2">|</span>
                    <span className="font-medium">Total Agencies:</span> <span className="text-gray-600">{companiesAndAgencies.filter(item => item.type === 'Agency').length}</span>
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg border shadow-sm mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 flex items-center"><FilterIcon className="w-4 h-4 mr-1" /> Filters:</span>
                    <select className="border-gray-300 rounded-md shadow-sm text-sm">
                        <option>Agencies Only</option>
                        <option>Companies Only</option>
                        <option>All</option>
                    </select>
                    <select className="border-gray-300 rounded-md shadow-sm text-sm">
                        <option>All Industries</option>
                        <option>Technology & Software</option>
                        <option>E-commerce</option>
                    </select>
                    <select className="border-gray-300 rounded-md shadow-sm text-sm">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Hold</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search companies or agencies..." className="border-gray-300 rounded-md shadow-sm text-sm pl-10" />
                    </div>
                    <button className="text-sm text-blue-600">Clear All</button>
                </div>
            </div>
            
            <div className="space-y-2">
                {companiesAndAgencies.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border">
                        <MainRow item={item} isOpen={!!openItems[item.id]} onToggle={() => toggleItem(item.id)} />
                        {openItems[item.id] && <ExpandedContent item={item} openItems={openItems} onToggle={toggleItem} />}
                    </div>
                ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
                Company delivery view shows all active and historical projects mapped to deals and invoices for operational governance.
            </p>
             <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

const MainRow: React.FC<{item: Item, isOpen: boolean, onToggle: () => void}> = ({ item, isOpen, onToggle }) => {
    const isAgency = item.type === 'Agency';
    return (
        <div className="flex items-center p-3 cursor-pointer" onClick={onToggle}>
            <button className="p-1">{isOpen ? <ChevronDownIcon className="w-5 h-5 text-gray-500" /> : <ChevronRightIcon className="w-5 h-5 text-gray-500" />}</button>
            <div className="p-2 bg-purple-100 rounded-md mr-3"><BuildingOfficeIcon className="w-6 h-6 text-purple-600" /></div>
            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${isAgency ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{item.type}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.status}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    {isAgency && <span><UsersIcon className="w-3 h-3 inline mr-1" />{item.companyCount} Companies</span>}
                    <span><BriefcaseIcon className="w-3 h-3 inline mr-1" />{item.dealCount} Deals</span>
                    <span><FolderIcon className="w-3 h-3 inline mr-1" />{item.projectCount} Projects</span>
                    <span><UserCircleIcon className="w-3 h-3 inline mr-1" />Account: {item.accountOwner}</span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg text-gray-800">{item.totalValue}</p>
                <p className="text-xs text-gray-500">Total Value</p>
            </div>
        </div>
    )
}

const ExpandedContent: React.FC<{item: Item, openItems: Record<string, boolean>, onToggle: (id: string) => void}> = ({ item, openItems, onToggle }) => {
    if (item.type === 'Agency') {
        return (
            <div className="pl-12 pr-4 pb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase my-2">Companies under {item.name}</p>
                <div className="space-y-1">
                    {item.companies.map(company => (
                         <div key={company.id} className="bg-gray-50 rounded-lg border">
                             <CompanyRow company={company} isOpen={!!openItems[company.id]} onToggle={() => onToggle(company.id)} />
                             {openItems[company.id] && <CompanyDeals company={company} />}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    if (item.type === 'Company' && item.deals) {
        return <CompanyDeals company={item} />
    }
    return null;
}

const CompanyRow: React.FC<{company: Company, isOpen: boolean, onToggle:() => void}> = ({ company, isOpen, onToggle }) => (
     <div className="flex items-center p-2 cursor-pointer" onClick={onToggle}>
        <button className="p-1">{isOpen ? <ChevronDownIcon className="w-4 h-4 text-gray-500" /> : <ChevronRightIcon className="w-4 h-4 text-gray-500" />}</button>
        <div className="flex-grow">
            <h4 className="font-medium text-gray-800">{company.name}</h4>
            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                <span>{company.industry}</span>
                <span>{company.dealCount} Deals</span>
                <span>{company.projectCount} Projects</span>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold text-gray-800">{company.totalValue}</p>
            <p className="text-xs text-gray-500">Deal Value</p>
        </div>
    </div>
);

const CompanyDeals: React.FC<{company: Company}> = ({ company }) => (
    <div className="pl-10 pr-4 pb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase my-2">Deals & Projects</p>
        <div className="space-y-3">
            {company.deals?.map(deal => (
                <div key={deal.id}>
                    <DealRow deal={deal} />
                    <div className="pl-10 mt-2 space-y-2">
                        {deal.projects.map(project => <ProjectRow key={project.id} project={project} />)}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DealRow: React.FC<{deal: CompanyDeal}> = ({ deal }) => (
    <div className="flex items-center text-sm">
        <TagIcon className="w-5 h-5 text-gray-400 mr-3" />
        <div className="flex-grow flex items-center space-x-4">
            <p className="font-medium text-gray-700 w-64">{deal.name}</p>
            <span className={`px-2 py-0.5 text-xs rounded-full ${deal.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{deal.status}</span>
            <p className="text-gray-500 text-xs">Signed: {deal.signedDate} • Duration: {deal.duration}</p>
        </div>
        <p className="text-xs text-gray-500">{deal.projectCount} Projects</p>
    </div>
);

const ProjectRow: React.FC<{project: CompanyProject}> = ({ project }) => (
    <div className="flex items-center text-sm bg-white p-2 rounded border">
        <ClipboardDocumentListIcon className="w-5 h-5 text-blue-500 mr-3" />
        <div className="flex-grow flex items-center space-x-4">
            <p className="font-medium text-gray-700 w-56">{project.name}</p>
            <p className="text-xs text-gray-500">Team: {project.team}</p>
            <div className="flex items-center w-32">
                <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${project.progress}%`}}></div>
                </div>
                <span className="text-xs text-gray-500">{project.progress}%</span>
            </div>
            <span className={`text-xs font-medium ${project.status === 'On Track' ? 'text-green-600' : 'text-red-600'}`}>{project.status}</span>
        </div>
        <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-400 hover:text-gray-700" title="View Tasks"><ListBulletIcon className="w-4 h-4" /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700" title="More options"><DotsVerticalIcon className="w-4 h-4" /></button>
        </div>
    </div>
);

export default Companies;
