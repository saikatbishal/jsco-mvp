
import React, { useState } from 'react';
import { Screen } from '../App';
import { Task, PMActionItem, DeliveryCalendarItem } from '../types';
import { 
    FolderIcon, PauseCircleIcon, DocumentIcon, ExclamationTriangleIcon, CheckSquareIcon, ChevronRightIcon,
    HelpIcon, CurrencyDollarIcon, UserCircleIcon, ClockIcon,
// FIX: Import missing BriefcaseIcon and CreditCardIcon.
    BriefcaseIcon, CreditCardIcon
} from './icons';
import { pmActionsData, deliveryCalendarData, projectsData, dealsData } from '../constants';

interface DashboardProps {
    setActiveScreen: (screen: Screen) => void;
    setSelectedTask: (task: Task) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; title: string; subtitle?: string; bgColor: string; }> = ({ icon, value, title, subtitle, bgColor }) => (
    <div className={`p-4 rounded-lg flex items-center space-x-3 ${bgColor} border`}>
        <div className="p-2 bg-black/5 rounded-md">{icon}</div>
        <div className="flex-grow">
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs font-semibold text-gray-600 uppercase">{title}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
);

const ActionItem: React.FC<{ item: PMActionItem }> = ({ item }) => {
    const priorityColors: { [key: string]: string } = {
        'CRITICAL': 'bg-red-500 text-white',
        'URGENT': 'bg-yellow-400 text-black',
        'Delivery': 'bg-blue-100 text-blue-800',
        'Risk': 'bg-yellow-100 text-yellow-800',
        'Compliance': 'bg-gray-200 text-gray-800',
    };
     const riskColors: { [key: string]: string } = {
        'Finance': 'bg-purple-100 text-purple-800',
        'Delivery': 'bg-blue-100 text-blue-800',
        'Compliance': 'bg-gray-200 text-gray-800',
        'Risk': 'bg-yellow-100 text-yellow-800',
    };
    const ctaColors: { [key: string]: string } = {
        'APPROVE': 'bg-green-600 hover:bg-green-700 text-white',
        'RESOLVE': 'bg-blue-600 hover:bg-blue-700 text-white',
        'REVIEW': 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    };


    return (
        <div className={`p-4 rounded-md border-l-4 ${item.border} bg-white border flex justify-between items-center`}>
            <div>
                <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${priorityColors[item.priority]}`}>{item.priority}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${riskColors[item.riskType]}`}>{item.riskType}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center"><div className={`w-2 h-2 rounded-full ${item.projectColor} mr-1.5`}></div>{item.project}</span>
                    {item.dueDate && <span className={`flex items-center font-semibold ${item.dueColor}`}><ClockIcon className="w-4 h-4 mr-1"/>{item.dueDate}</span>}
                    {item.amount && <span className="font-semibold text-gray-800">${item.amount.toLocaleString()}</span>}
                    {item.assignee && <span className="flex items-center"><UserCircleIcon className="w-4 h-4 mr-1"/>{item.assignee}</span>}
                </div>
                <p className="text-xs text-gray-600 mt-2">{item.description}</p>
            </div>
            <button className={`px-5 py-2 text-sm font-semibold rounded-md ${ctaColors[item.cta]}`}>{item.cta}</button>
        </div>
    )
}

const CalendarItem: React.FC<{ item: DeliveryCalendarItem }> = ({ item }) => {
    const typeColors: { [key: string]: string } = {
        'Approval': 'bg-purple-200 text-purple-800',
        'Financial': 'bg-pink-200 text-pink-800',
        'Milestone': 'bg-indigo-200 text-indigo-800',
        'Review': 'bg-blue-200 text-blue-800',
    };
    const overdueColor = item.status === 'OVERDUE' ? 'text-red-500' : 'text-gray-500';
    return (
        <div className="flex items-start space-x-4">
            <div className={`w-1 h-full ${item.status === 'OVERDUE' ? 'bg-red-400' : item.status === 'AWAITING REVIEW' ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
            <div className="flex-grow flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span className={`w-2 h-2 rounded-full ${item.projectColor}`}></span>
                        <span>{item.project}</span>
                    </div>
                     <p className={`text-xs font-medium mt-1 ${overdueColor}`}>{item.dueStatus || item.dueDate}</p>
                </div>
                <div className="text-right">
                    {item.amount && <p className="font-semibold">${item.amount.toLocaleString()}</p>}
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${typeColors[item.type]}`}>{item.type}</span>
                </div>
            </div>
        </div>
    )
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveScreen, setSelectedTask }) => {
    const [calendarView, setCalendarView] = useState('Today');

    return (
        <div className="p-6 bg-white font-sans h-full overflow-y-auto">
            <div className="grid grid-cols-12 gap-6">
                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* ZONE 1: Critical Status Strip */}
                    <div className="grid grid-cols-5 gap-4">
                        <StatCard icon={<FolderIcon className="w-6 h-6 text-gray-600"/>} value="12" title="Active Projects" bgColor="bg-gray-50 border-gray-200" />
                        <StatCard icon={<PauseCircleIcon className="w-6 h-6 text-yellow-700"/>} value="3" title="Projects on Hold" bgColor="bg-yellow-50 border-yellow-200" />
                        <StatCard icon={<DocumentIcon className="w-6 h-6 text-purple-700"/>} value="7" title="Invoices Pending" subtitle="$284,500" bgColor="bg-purple-50 border-purple-200" />
                        <StatCard icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-700"/>} value="4" title="Payments Overdue" subtitle="$127,800" bgColor="bg-red-50 border-red-200" />
                        <StatCard icon={<CheckSquareIcon className="w-6 h-6 text-blue-700"/>} value="9" title="Awaiting PM Review" bgColor="bg-blue-50 border-blue-200" />
                    </div>

                    {/* ZONE 2: Your Actions Today */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-gray-800 flex items-center">YOUR ACTIONS TODAY <span className="ml-2 text-xs font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">14 PENDING</span></h3>
                        <div className="space-y-2">
                            {pmActionsData.map(item => <ActionItem key={item.id} item={item} />)}
                        </div>
                    </div>

                    {/* ZONE 3: Delivery Calendar */}
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">DELIVERY CALENDAR</h3>
                            <div className="flex items-center space-x-1 bg-gray-200 p-0.5 rounded-md">
                                <button onClick={() => setCalendarView('Today')} className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === 'Today' ? 'bg-white shadow' : ''}`}>Today</button>
                                <button onClick={() => setCalendarView('Tomorrow')} className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === 'Tomorrow' ? 'bg-white shadow' : ''}`}>Tomorrow</button>
                                <button onClick={() => setCalendarView('This Week')} className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === 'This Week' ? 'bg-white shadow' : ''}`}>This Week</button>
                            </div>
                         </div>
                         <div className="space-y-4">
                             <div>
                                <h4 className="text-red-500 text-xs font-bold flex items-center">OVERDUE <span className="ml-2 text-xs font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">3</span></h4>
                                <div className="mt-2 space-y-4">{deliveryCalendarData.filter(i => i.status === 'OVERDUE').map(item => <CalendarItem key={item.id} item={item} />)}</div>
                             </div>
                             <div>
                                <h4 className="text-blue-500 text-xs font-bold flex items-center">AWAITING REVIEW <span className="ml-2 text-xs font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">5</span></h4>
                                <div className="mt-2 space-y-4">{deliveryCalendarData.filter(i => i.status === 'AWAITING REVIEW').map(item => <CalendarItem key={item.id} item={item} />)}</div>
                             </div>
                             <div>
                                <h4 className="text-purple-500 text-xs font-bold flex items-center">SCHEDULED <span className="ml-2 text-xs font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">4 This Week</span></h4>
                                <div className="mt-2 space-y-4">{deliveryCalendarData.filter(i => i.status === 'SCHEDULED').map(item => <CalendarItem key={item.id} item={item} />)}</div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* ZONE 4: Risk & Blockers */}
                     <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-bold text-gray-800 flex justify-between items-center">RISK & BLOCKERS <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">7</span></h3>
                        <div className="mt-4 space-y-4">
                            <div className="bg-red-50 p-3 rounded-md border border-red-200">
                                <h4 className="text-red-700 text-xs font-bold flex justify-between items-center">PROJECTS ON HOLD <span className="font-bold text-lg">3</span></h4>
                                <div className="mt-2 space-y-2 text-sm">
                                    <div className="p-2 bg-white rounded"><p className="font-semibold">Cloud Infrastructure Upgrade</p><p className="text-xs text-gray-500">Budget approval pending</p></div>
                                    <div className="p-2 bg-white rounded"><p className="font-semibold">Data Migration Project</p><p className="text-xs text-gray-500">Vendor contract negotiation</p></div>
                                    <div className="p-2 bg-white rounded"><p className="font-semibold">Legacy System Integration</p><p className="text-xs text-gray-500">Resource unavailability</p></div>
                                </div>
                            </div>
                             <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                                <h4 className="text-purple-700 text-xs font-bold flex justify-between items-center">FINANCE RISK <span className="font-bold text-lg">4</span></h4>
                                <div className="mt-2 space-y-2 text-sm">
                                     <div className="p-2 bg-white rounded"><p className="font-semibold">API Integration</p><p className="text-xs text-gray-500">Invoice overdue: $45,200</p></div>
                                     <div className="p-2 bg-white rounded"><p className="font-semibold">Platform Redesign</p><p className="text-xs text-gray-500">Payment overdue: $82,300</p></div>
                                     <div className="p-2 bg-white rounded"><p className="font-semibold">Mobile App v2</p><p className="text-xs text-gray-500">High-value invoice pending</p></div>
                                </div>
                            </div>
                             <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                                <h4 className="text-yellow-700 text-xs font-bold flex justify-between items-center">DELIVERY RISK <span className="font-bold text-lg">3</span></h4>
                                <div className="mt-2 space-y-2 text-sm">
                                    <div className="p-2 bg-white rounded"><p className="font-semibold">API Integration</p><p className="text-xs text-gray-500">2 overdue tasks</p></div>
                                    <div className="p-2 bg-white rounded"><p className="font-semibold">Security Audit</p><p className="text-xs text-gray-500">1 overdue task</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ZONE 5: Portfolio Health */}
                     <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-bold text-gray-800">PORTFOLIO HEALTH</h3>
                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <div className="flex justify-between items-center"><p>On Track</p><p className="font-semibold">8 projects</p></div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-green-500 h-2 rounded-full" style={{width: '66%'}}></div></div>
                            </div>
                             <div>
                                <div className="flex justify-between items-center"><p>At Risk</p><p className="font-semibold">1 project</p></div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-yellow-500 h-2 rounded-full" style={{width: '8%'}}></div></div>
                            </div>
                             <div>
                                <div className="flex justify-between items-center"><p>On Hold</p><p className="font-semibold">3 projects</p></div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-red-500 h-2 rounded-full" style={{width: '25%'}}></div></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 text-white p-4 rounded-lg">
                        <h3 className="font-bold">CRITICAL ACTIONS</h3>
                        <ul className="mt-3 space-y-2 text-sm list-disc list-inside">
                            <li>4 overdue tasks require immediate attention</li>
                            <li>9 items awaiting your review by EOD</li>
                            <li>$127,800 in overdue payments</li>
                            <li>3 projects on hold pending resolution</li>
                            <li>$284,500 in invoices pending approval</li>
                        </ul>
                    </div>
                </div>

                {/* ZONE 6: Business Snapshot */}
                <div className="col-span-12">
                    <h3 className="font-bold text-gray-800 mb-2">BUSINESS SNAPSHOT</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <StatCard icon={<BriefcaseIcon className="w-6 h-6 text-green-700"/>} value="18" title="ACTIVE DEALS" subtitle="$1.2M pipeline" bgColor="bg-green-50 border-green-200" />
                        <StatCard icon={<DocumentIcon className="w-6 h-6 text-purple-700"/>} value="$284K" title="INVOICE PIPELINE" subtitle="7 pending approval" bgColor="bg-purple-50 border-purple-200" />
                        <StatCard icon={<CreditCardIcon className="w-6 h-6 text-yellow-700"/>} value="$412K" title="PENDING PAYMENTS" subtitle="$128K overdue" bgColor="bg-yellow-50 border-yellow-200" />
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

export default Dashboard;
