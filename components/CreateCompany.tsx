import React, { useState } from 'react';
import { Screen } from '../App';
import { Company } from '../types';
import { ArrowLeftIcon, HelpIcon, PlusIcon } from './icons';

interface CreateCompanyProps {
  setActiveScreen: (screen: Screen) => void;
  onAddCompany: (company: Company) => void;
}

const FormCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Label: React.FC<{ htmlFor: string, text: string, required?: boolean }> = ({ htmlFor, text, required }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {text} {required && <span className="text-red-500">*</span>}
    </label>
);

const Input: React.FC<{ id: string, type?: string, placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, type = "text", placeholder, value, onChange }) => (
    <input type={type} id={id} value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={placeholder} />
);

const Select: React.FC<{ id: string, children: React.ReactNode, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ id, children, value, onChange }) => (
    <select id={id} value={value} onChange={onChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        {children}
    </select>
);

const Textarea: React.FC<{ id: string, rows: number, placeholder?: string }> = ({ id, rows, placeholder }) => (
    <textarea id={id} rows={rows} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={placeholder}></textarea>
);


const CreateCompany: React.FC<CreateCompanyProps> = ({ setActiveScreen, onAddCompany }) => {
    const [isActive, setIsActive] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');

    const handleSave = () => {
        if (!companyName.trim() || !industry.trim()) {
            alert('Company Name and Industry are required.');
            return;
        }
        const newCompany: Company = {
            id: `comp-${Date.now()}`,
            name: companyName,
            industry: industry,
            dealCount: 0,
            projectCount: 0,
            totalValue: '$0',
            type: 'Company',
            status: isActive ? 'Active' : 'On Hold',
            accountOwner: 'Current User', // Placeholder
        };
        onAddCompany(newCompany);
    };

    return (
        <div className="-m-8 p-6 bg-gray-100 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setActiveScreen(Screen.Companies)} className="p-2 rounded-full hover:bg-gray-200">
                             <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Create Company</h1>
                            <p className="text-sm text-gray-500">Register a new client company</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-gray-800 border border-transparent rounded-md text-sm font-medium text-white hover:bg-gray-900">Save Company</button>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormCard title="Company Information">
                        <div>
                            <Label htmlFor="company-name" text="Company Name" required />
                            <Input id="company-name" placeholder="Enter company name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="website" text="Website" />
                            <Input id="website" placeholder="https://example.com" />
                        </div>
                        <div>
                            <Label htmlFor="industry" text="Industry" required />
                            <Select id="industry" value={industry} onChange={e => setIndustry(e.target.value)}>
                                <option value="">Select industry</option>
                                <option>Technology & Software</option>
                                <option>E-commerce</option>
                                <option>Marketing</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="company-type" text="Company Type" required />
                            <Select id="company-type">
                                <option>Select type</option>
                                <option>Client</option>
                                <option>Partner</option>
                                <option>Vendor</option>
                            </Select>
                        </div>
                    </FormCard>

                    <FormCard title="Primary Contact">
                        <div>
                            <Label htmlFor="contact-name" text="Contact Person Name" required />
                            <Input id="contact-name" placeholder="Enter full name" />
                        </div>
                        <div>
                            <Label htmlFor="email" text="Email" required />
                            <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                        <div>
                            <Label htmlFor="phone-number" text="Phone Number" required />
                            <Input id="phone-number" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                            <Label htmlFor="timezone" text="Timezone" required />
                            <Select id="timezone">
                                <option>Select timezone</option>
                                <option>PST</option>
                                <option>EST</option>
                                <option>GMT</option>
                            </Select>
                        </div>
                    </FormCard>

                     <FormCard title="Billing Information">
                        <div>
                            <Label htmlFor="billing-currency" text="Billing Currency" required />
                            <Select id="billing-currency">
                                <option>Select currency</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="billing-address" text="Billing Address" />
                            <Textarea id="billing-address" rows={3} placeholder="Street address, City, State, ZIP" />
                        </div>
                        <div>
                            <Label htmlFor="tax-id" text="Tax ID / VAT Number" />
                            <Input id="tax-id" placeholder="Optional" />
                        </div>
                    </FormCard>

                    <FormCard title="Operational Notes">
                         <div className="relative">
                            <Label htmlFor="client-nature" text="Client Nature" />
                            <Select id="client-nature">
                                <option>Select nature</option>
                                <option>Tech-savvy</option>
                                <option>Non-technical</option>
                            </Select>
                            <button className="absolute top-0 right-0 p-1.5 text-blue-600 rounded-full hover:bg-blue-100">
                                <HelpIcon className="w-5 h-5"/>
                            </button>
                        </div>
                         <div>
                            <Label htmlFor="past-experience" text="Past Experience with Agencies" />
                            <Textarea id="past-experience" rows={2} placeholder="Previous agency relationships, outcomes, expectations" />
                        </div>
                         <div>
                            <Label htmlFor="special-instructions" text="Special Instructions" />
                            <Textarea id="special-instructions" rows={2} placeholder="Communication preferences, escalation protocols, restrictions" />
                        </div>
                    </FormCard>
                </div>
                
                {/* Status Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
                    <div className="flex items-center">
                        <label htmlFor="status-toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" id="status-toggle" className="sr-only" checked={isActive} onChange={() => setIsActive(!isActive)} />
                                <div className={`block w-14 h-8 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isActive ? 'translate-x-6' : ''}`}></div>
                            </div>
                            <div className="ml-3 text-gray-700">
                                <span className="font-medium">{isActive ? 'Active' : 'Inactive'}</span>
                                <span className="text-sm text-gray-500 ml-2">(Company can be used in new deals)</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end items-center space-x-2 mt-6 border-t pt-4">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-gray-800 border border-transparent rounded-md text-sm font-medium text-white hover:bg-gray-900">Save Company</button>
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

export default CreateCompany;
