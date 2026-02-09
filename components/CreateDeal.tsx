import React, { useState, useMemo } from 'react';
import { Screen } from '../App';
import { ServiceInDeal, Deal, Company } from '../types';
import { 
    HelpIcon, ArrowLeftIcon, SaveIcon, PlusIcon, InformationCircleIcon, CalendarIcon, 
    BuildingOfficeIcon, CurrencyDollarIcon as WalletIcon, ClipboardDocumentListIcon, ExclamationTriangleIcon, 
    PaperclipIcon, ShieldCheckIcon, XCircleIcon, DocumentDuplicateIcon, TrashIcon,
    DocumentTextIcon as DocumentSignatureIcon, CreditCardIcon as ReceiptIcon, DocumentIcon
} from './icons';

interface CreateDealProps {
  setActiveScreen: (screen: Screen) => void;
  onAddDeal: (deal: Deal) => void;
  companies: Company[];
}

const FormSection: React.FC<{icon: React.ReactNode, title: string, required?: boolean, children: React.ReactNode, helpText?: string}> = ({icon, title, required, children, helpText}) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
        <div className="flex items-start justify-between">
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg mr-4">{icon}</div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        {title} {required && <span className="ml-2 text-xs text-red-500 font-normal">* Required</span>}
                    </h2>
                </div>
            </div>
            {helpText && <button className="p-1.5 text-indigo-500 hover:bg-indigo-100 rounded-full"><HelpIcon className="w-5 h-5"/></button>}
        </div>
        {children}
    </div>
);

const ServiceBlock: React.FC<{
    service: ServiceInDeal;
    index: number;
    onChange: (id: string, field: keyof ServiceInDeal, value: any) => void;
    onRemove: (id: string) => void;
    onDuplicate: (id: string) => void;
}> = ({ service, index, onChange, onRemove, onDuplicate }) => (
    <div className="p-4 border rounded-lg bg-gray-50/50 relative">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Service #{index + 1}</h3>
            <div className="flex items-center space-x-3">
                <button onClick={() => onDuplicate(service.id)} className="flex items-center space-x-1 text-sm text-blue-600 font-medium"><DocumentDuplicateIcon className="w-4 h-4"/><span>Duplicate</span></button>
                <button onClick={() => onRemove(service.id)} className="flex items-center space-x-1 text-sm text-red-600 font-medium"><TrashIcon className="w-4 h-4"/><span>Remove</span></button>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-700">Service Name <span className="text-red-500">*</span></label><select value={service.name} onChange={e => onChange(service.id, 'name', e.target.value)} className="w-full mt-1 p-2 border rounded-md"><option>Select service</option><option>SEO</option><option>Web Redesign</option></select></div>
            <div><label className="text-sm font-medium text-gray-700">Sale Type <span className="text-red-500">*</span></label><select value={service.saleType} onChange={e => onChange(service.id, 'saleType', e.target.value)} className="w-full mt-1 p-2 border rounded-md"><option>Select sale type</option><option>New Sale</option><option>Upsell</option></select></div>
            <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Service Description</label><textarea value={service.description} onChange={e => onChange(service.id, 'description', e.target.value)} rows={2} className="w-full mt-1 p-2 border rounded-md" placeholder="Brief description of what this service includes..."></textarea></div>
            <div><label className="text-sm font-medium text-gray-700">Billing Type <span className="text-red-500">*</span></label><select value={service.billingType} onChange={e => onChange(service.id, 'billingType', e.target.value)} className="w-full mt-1 p-2 border rounded-md"><option>Select</option><option>Fixed Price</option></select></div>
            <div className="grid grid-cols-2 gap-2">
                <div><label className="text-sm font-medium text-gray-700">Currency <span className="text-red-500">*</span></label><select value={service.currency} onChange={e => onChange(service.id, 'currency', e.target.value)} className="w-full mt-1 p-2 border rounded-md"><option>USD</option><option>EUR</option></select></div>
                <div><label className="text-sm font-medium text-gray-700">Amount <span className="text-red-500">*</span></label><input type="number" value={service.amount} onChange={e => onChange(service.id, 'amount', e.target.value)} className="w-full mt-1 p-2 border rounded-md" placeholder="0.00"/></div>
            </div>
             <div className="relative">
                <label className="text-sm font-medium text-gray-700">Service Start Date</label>
                <input type="date" value={service.startDate} onChange={e => onChange(service.id, 'startDate', e.target.value)} className="w-full mt-1 p-2 border rounded-md"/>
            </div>
            <div className="relative">
                <label className="text-sm font-medium text-gray-700">Service End Date</label>
                <input type="date" value={service.endDate} onChange={e => onChange(service.id, 'endDate', e.target.value)} className="w-full mt-1 p-2 border rounded-md"/>
            </div>
        </div>
    </div>
);


const CreateDeal: React.FC<CreateDealProps> = ({ setActiveScreen, onAddDeal, companies }) => {
    const [clientId, setClientId] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [advancePayment, setAdvancePayment] = useState<'Paid' | 'Not Paid'>('Not Paid');
    const [services, setServices] = useState<ServiceInDeal[]>([{
        id: `service-${Date.now()}`, name: '', saleType: '', description: '', billingType: '', currency: 'USD', amount: 0, startDate: '', endDate: '', status: 'Not Converted'
    }]);
    const [riskTags, setRiskTags] = useState<string[]>([]);
    const [riskTagInput, setRiskTagInput] = useState('');
    const [riskComments, setRiskComments] = useState('');

    const handleAddService = () => {
        setServices(prev => [...prev, {
            id: `service-${Date.now()}`, name: '', saleType: '', description: '', billingType: '', currency: 'USD', amount: 0, startDate: '', endDate: '', status: 'Not Converted'
        }]);
    };
    const handleRemoveService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));
    const handleDuplicateService = (id: string) => {
        const serviceToCopy = services.find(s => s.id === id);
        if(serviceToCopy) {
            setServices(prev => [...prev, {...serviceToCopy, id: `service-${Date.now()}`}]);
        }
    }
    const handleServiceChange = (id: string, field: keyof ServiceInDeal, value: any) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleAddRiskTag = () => {
        if (riskTagInput.trim() && !riskTags.includes(riskTagInput.trim())) {
            setRiskTags([...riskTags, riskTagInput.trim()]);
            setRiskTagInput('');
        }
    };

    const handleRemoveRiskTag = (tagToRemove: string) => {
        setRiskTags(riskTags.filter(tag => tag !== tagToRemove));
    };

    const totalValue = useMemo(() => services.reduce((sum, s) => sum + Number(s.amount), 0), [services]);

    const validationErrors = useMemo(() => {
        const errors: {field: string, message: string}[] = [];
        if (!clientId) errors.push({field: 'Client Name', message: 'Required field'});
        if (!email) errors.push({field: 'Email Address', message: 'Required field'});
        if (!invoiceId) errors.push({ field: 'Invoice ID', message: 'Required field' });
        if (services.length === 0) errors.push({field: 'At Least One Service', message: 'Add at least one service'});
        services.forEach((s, i) => {
            if (!s.name) errors.push({field: `Service #${i+1}: Name`, message: 'Required for each service'});
            if (!s.saleType) errors.push({field: `Service #${i+1}: Sale Type`, message: 'Required for each service'});
            if (!s.billingType) errors.push({field: `Service #${i+1}: Billing Type`, message: 'Required for each service'});
            if (Number(s.amount) <= 0) errors.push({field: `Service #${i+1}: Amount`, message: 'Must be greater than 0'});
        });
        return errors;
    }, [clientId, email, services, invoiceId]);

    const handleSaveAndCreateProjects = () => {
        if (validationErrors.length > 0) {
            alert('Please fix validation errors before saving.');
            return;
        }
        const selectedCompany = companies.find(c => c.id === clientId);
        if (!selectedCompany) {
            alert('Please select a valid client.');
            return;
        }

        const newDeal: Deal = {
            id: `DEAL-${Date.now()}`,
            dealName: selectedCompany.name,
            company: selectedCompany.name,
            clientDetails: {
                name: selectedCompany.name,
                url: companyUrl,
                email: email,
                phone: phone,
            },
            services: services,
            saleType: (services[0]?.saleType as Deal['saleType']) || 'New Sale',
            salesPerson: { name: 'John Smith', email: 'sales@dws.com' }, // Hardcoded from UI
            budget: totalValue,
            startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
            advancePayment: advancePayment,
            invoiceId: invoiceId,
            status: 'New',
            introCallStatus: 'Pending',
            riskLevel: 'Low Risk', // default
            clientRisk: {
                tags: riskTags,
                comments: riskComments,
            },
        };
        onAddDeal(newDeal);
    };


    return (
        <div className="bg-gray-50 font-sans -m-8 p-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                 <button onClick={() => setActiveScreen(Screen.SalesDashboard)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <ArrowLeftIcon className="w-6 h-6" />
                    <div>
                        <h1 className="text-xl font-bold">Create New Deal</h1>
                        <p className="text-sm">Convert sales conversation into structured deal</p>
                    </div>
                </button>
                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Discard</button>
                    <button onClick={handleSaveAndCreateProjects} className="px-4 py-2 bg-gray-800 border border-transparent rounded-md text-sm font-medium text-white hover:bg-gray-900 flex items-center space-x-2">
                         <PlusIcon className="w-5 h-5"/>
                        <span>Save & Create Projects</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <FormSection icon={<BuildingOfficeIcon className="w-6 h-6"/>} title="Client Information" required>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Client Name <span className="text-red-500">*</span></label>
                                <select value={clientId} onChange={e => setClientId(e.target.value)} className="w-full mt-1 p-2 border rounded-md">
                                    <option value="">Select a company</option>
                                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div><label className="text-sm font-medium text-gray-700">Company URL</label><input type="text" value={companyUrl} onChange={e => setCompanyUrl(e.target.value)} placeholder="https://example.com" className="w-full mt-1 p-2 border rounded-md"/></div>
                            <div><label className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="client@company.com" className="w-full mt-1 p-2 border rounded-md"/></div>
                            <div><label className="text-sm font-medium text-gray-700">Phone Number</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full mt-1 p-2 border rounded-md"/></div>
                        </div>
                    </FormSection>
                    
                    <FormSection icon={<WalletIcon className="w-6 h-6"/>} title="Sales Context">
                         <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium text-gray-700">Sales Owner</label><input type="text" readOnly value="John Smith (Sales)" className="w-full mt-1 p-2 border rounded-md bg-gray-100"/></div>
                            <div><label className="text-sm font-medium text-gray-700">Mode of Sale</label><select className="w-full mt-1 p-2 border rounded-md"><option>Select mode</option></select></div>
                            <div className="relative"><label className="text-sm font-medium text-gray-700">Intro Call Date & Time</label><input type="date" className="w-full mt-1 p-2 border rounded-md"/></div>
                            <div><label className="text-sm font-medium text-gray-700">Meeting Link</label><input type="text" placeholder="https://zoom.us/j/..." className="w-full mt-1 p-2 border rounded-md"/></div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Invoice ID <span className="text-red-500">*</span></label>
                                <input type="text" value={invoiceId} onChange={e => setInvoiceId(e.target.value)} placeholder="e.g. INV-2024-101" className="w-full mt-1 p-2 border rounded-md"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Advance Payment</label>
                                <select value={advancePayment} onChange={e => setAdvancePayment(e.target.value as 'Paid' | 'Not Paid')} className="w-full mt-1 p-2 border rounded-md">
                                    <option value="Not Paid">Not Paid</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection icon={<ClipboardDocumentListIcon className="w-6 h-6"/>} title="Services in this Deal" required>
                        <div className="flex justify-end mb-2"><span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Each service = 1 project</span></div>
                        <div className="space-y-4">
                            {services.map((s, i) => <ServiceBlock key={s.id} service={s} index={i} onChange={handleServiceChange} onRemove={handleRemoveService} onDuplicate={handleDuplicateService} />)}
                        </div>
                        <button onClick={handleAddService} className="w-full mt-4 p-2 border-2 border-dashed rounded-lg flex items-center justify-center text-sm font-semibold text-gray-600 hover:bg-gray-100"><PlusIcon className="w-4 h-4 mr-1"/>Add Another Service</button>
                        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 flex items-start space-x-3">
                            <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                            <div>
                                <h4 className="font-semibold">Important: Service-to-Project Logic</h4>
                                <ul className="list-disc list-inside text-sm mt-1">
                                    <li>Each service will become one project</li>
                                    <li>All commercial data (billing, amount) is per service</li>
                                    <li>Services already converted to projects cannot be reused</li>
                                </ul>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection icon={<ExclamationTriangleIcon className="w-6 h-6"/>} title="Client Risk & Notes">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Risk Indicators</label>
                            <div className="flex items-center mt-1 space-x-2">
                                <input 
                                    type="text" 
                                    value={riskTagInput}
                                    onChange={e => setRiskTagInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddRiskTag(); } }}
                                    placeholder="e.g., Non-technical client" 
                                    className="flex-grow p-2 border rounded-md"
                                />
                                <button onClick={handleAddRiskTag} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-md hover:bg-gray-300">Add Tag</button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {riskTags.map(tag => (
                                    <span key={tag} className="flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                                        {tag}
                                        <button onClick={() => handleRemoveRiskTag(tag)} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                            <XCircleIcon className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-700">Additional Comments</label>
                            <textarea 
                                rows={3} 
                                value={riskComments}
                                onChange={e => setRiskComments(e.target.value)}
                                placeholder="Add any important notes from sales conversation..." 
                                className="w-full mt-1 p-2 border rounded-md"
                            ></textarea>
                        </div>
                    </FormSection>

                    <FormSection icon={<PaperclipIcon className="w-6 h-6"/>} title="Attachments">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 border-2 border-dashed rounded-lg text-center"><DocumentIcon className="w-8 h-8 mx-auto text-gray-400"/><p className="text-sm mt-2">Proposal</p><p className="text-xs text-gray-500">Click to upload</p></div>
                            <div className="p-4 border-2 border-dashed rounded-lg text-center"><DocumentSignatureIcon className="w-8 h-8 mx-auto text-gray-400"/><p className="text-sm mt-2">Contract</p><p className="text-xs text-gray-500">Click to upload</p></div>
                            <div className="p-4 border-2 border-dashed rounded-lg text-center"><ReceiptIcon className="w-8 h-8 mx-auto text-gray-400"/><p className="text-sm mt-2">Payment Receipt</p><p className="text-xs text-gray-500">Click to upload</p></div>
                        </div>
                    </FormSection>
                </div>

                <div className="space-y-6">
                    <div className="sticky top-8 space-y-6">
                         <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <h3 className="font-semibold mb-3">Form Validation</h3>
                            <div className="space-y-2">
                                {validationErrors.map(err => (
                                    <div key={err.field} className="flex items-start text-sm"><XCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"/><p><span className="font-medium">{err.field}:</span> {err.message}</p></div>
                                ))}
                            </div>
                            {validationErrors.length > 0 && <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm font-semibold rounded-md text-center">{validationErrors.length} fields require attention</div>}
                            {validationErrors.length === 0 && <p className="text-sm text-green-600">All required fields are complete.</p>}
                        </div>

                         <div className="bg-white p-4 rounded-lg shadow-sm border">
                             <h3 className="font-semibold mb-3">Deal Summary</h3>
                             <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Client</span><span className="font-medium">{companies.find(c => c.id === clientId)?.name || 'Not set'}</span></div>
                                <div className="flex justify-between"><span>Services</span><span className="font-medium">{services.length} added</span></div>
                                <div className="flex justify-between"><span>Total Value</span><span className="font-bold text-lg">${totalValue.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Projects to Create</span><span className="font-medium">{services.length}</span></div>
                             </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                             <div className="flex items-center mb-3"><ShieldCheckIcon className="w-6 h-6 text-blue-600 mr-2"/><h3 className="font-semibold text-blue-800">Service-Based Logic</h3></div>
                             <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                <li>Each service becomes one project with its own:</li>
                                <ul className="list-disc list-inside pl-5">
                                    <li>Billing type</li>
                                    <li>Amount & currency</li>
                                    <li>Sale type</li>
                                    <li>Timeline</li>
                                    <li>Team assignment</li>
                                </ul>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 border-t pt-4 flex items-center text-sm text-gray-500">
                <InformationCircleIcon className="w-5 h-5 mr-2"/>
                All fields marked with <span className="text-red-500 mx-1">*</span> are mandatory
            </div>

            <div className="fixed bottom-8 right-8 z-50 space-y-2 flex flex-col items-end">
                <button className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"><HelpIcon className="w-7 h-7"/></button>
            </div>
        </div>
    );
};

export default CreateDeal;
