import React from 'react';
import { Screen } from '../App';
import { Agency } from '../types';
import { ArrowLeftIcon, HelpIcon, PlusIcon, LinkIcon } from './icons';

interface CreateAgencyProps {
  setActiveScreen: (screen: Screen) => void;
  onAddAgency: (agency: Agency) => void;
}

const mockCompanies = [
  { name: 'TechCorp Solutions', industry: 'SaaS', contact: 'Sarah Johnson', deals: 3, status: 'Active', avatarColor: 'bg-blue-200 text-blue-800' },
  { name: 'FinanceGuru Inc', industry: 'Fintech', contact: 'David Martinez', deals: 1, status: 'Active', avatarColor: 'bg-purple-200 text-purple-800' },
  { name: 'RetailMax Group', industry: 'E-commerce', contact: 'Emily Wong', deals: 5, status: 'Active', avatarColor: 'bg-orange-200 text-orange-800' },
  { name: 'HealthCare Plus', industry: 'Healthcare', contact: 'Robert Lee', deals: 2, status: 'Inactive', avatarColor: 'bg-teal-200 text-teal-800' },
  { name: 'EduTech Ventures', industry: 'Education', contact: 'Jessica Brown', deals: 4, status: 'Active', avatarColor: 'bg-red-200 text-red-800' },
];

const FormInput: React.FC<{ label: string; id: string; type?: string; required?: boolean; value?: string; placeholder?: string, readOnly?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, id, type = "text", required, value, placeholder, readOnly, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={id}
            defaultValue={value}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={onChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
        />
    </div>
);

const FormSelect: React.FC<{ label: string; id: string; required?: boolean; children: React.ReactNode; }> = ({ label, id, required, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
        >
            {children}
        </select>
    </div>
);


const CreateAgency: React.FC<CreateAgencyProps> = ({ setActiveScreen, onAddAgency }) => {
    const [agencyName, setAgencyName] = React.useState('');
    
    const handleSave = () => {
        if (!agencyName.trim()) {
            alert('Agency name is required.');
            return;
        }
        const newAgency: Agency = {
            id: `agency-${Date.now()}`,
            name: agencyName,
            type: 'Agency',
            status: 'Active',
            companyCount: 0,
            dealCount: 0,
            projectCount: 0,
            totalValue: '$0',
            accountOwner: 'Current User', // Placeholder
            companies: [],
        };
        onAddAgency(newAgency);
    };

    return (
        <div className="-m-8 p-6 bg-gray-100 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                         <button onClick={() => setActiveScreen(Screen.AgencyList)} className="p-2 rounded-full hover:bg-gray-200">
                             <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                            Add New Agency
                            <span className="ml-4 px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </h1>
                    </div>
                     <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Save Agency</button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Agency Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput label="Agency Name" id="agency-name" required onChange={(e) => setAgencyName(e.target.value)} />
                        <FormInput label="Website" id="website" type="url" placeholder="https://example.com" />
                        <FormSelect label="Agency Type" id="agency-type">
                            <option>Reseller</option>
                            <option>Partner</option>
                            <option>Affiliate</option>
                        </FormSelect>
                        <FormInput label="Primary Contact Name" id="contact-name" required />
                        <FormInput label="Email" id="email" type="email" placeholder="contact@example.com" required />
                        <FormInput label="Phone" id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                        <FormSelect label="Commission Type" id="commission-type">
                            <option>Flat</option>
                            <option>Percentage</option>
                        </FormSelect>
                        <FormInput label="Commission Value" id="commission-value" />
                        <FormInput label="Payment Terms" id="payment-terms" />
                        <FormSelect label="Status" id="status">
                            <option>Active</option>
                            <option>Hold</option>
                            <option>Archive</option>
                        </FormSelect>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Companies under this Agency</h2>
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                <LinkIcon className="w-5 h-5"/>
                                <span>Link Existing Company</span>
                            </button>
                            <button onClick={() => setActiveScreen(Screen.AddNewCompany)} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                                <PlusIcon className="w-5 h-5"/>
                                <span>Add New Company</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b">
                                <tr>
                                    {['Company Name', 'Industry', 'Primary Contact', 'Active Deals', 'Status', 'Action'].map(h => 
                                        <th key={h} scope="col" className="py-3 px-4 font-medium">{h}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {mockCompanies.map((company, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-800 flex items-center">
                                            <div className={`w-8 h-8 rounded-full ${company.avatarColor} flex items-center justify-center font-bold text-sm mr-3`}>
                                                {company.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {company.name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{company.industry}</td>
                                        <td className="px-4 py-3 text-gray-600">{company.contact}</td>
                                        <td className="px-4 py-3 text-gray-600">{company.deals}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 space-x-4">
                                            <button className="font-medium text-blue-600 hover:underline">View Company</button>
                                            <button className="font-medium text-red-600 hover:underline">Unlink</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <p className="text-sm text-gray-500">Showing 5 of 5 companies</p>
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border rounded-md bg-white text-gray-400 cursor-not-allowed">Previous</button>
                            <button className="px-3 py-1 border rounded-md bg-white text-gray-400 cursor-not-allowed">Next</button>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-8 right-8 z-50">
                    <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                        <HelpIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAgency;
