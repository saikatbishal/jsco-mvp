import React from 'react';
import { Screen } from '../App';
import { NeedsActionItem, Deal } from '../types';
import { HelpIcon, DocumentIcon, CurrencyDollarIcon, PhoneIcon, CheckCircleIcon, ExclamationTriangleIcon, PaperAirplaneIcon, XCircleIcon } from './icons';
import { salesNeedsActionData, salesRecentDealsData } from '../constants';

interface SalesDashboardProps {
  setActiveScreen: (screen: Screen) => void;
}

const StatCard: React.FC<{ title: string; value: string; subtitle: React.ReactNode; icon: React.ReactNode; }> = ({ title, value, subtitle, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
        <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
    </div>
);

const DealStatusCard: React.FC<{ count: number; status: string; color: string }> = ({ count, status, color }) => (
    <div className={`p-4 rounded-lg text-center border-t-4 ${color}`}>
        <p className="text-3xl font-bold text-gray-800">{count}</p>
        <p className="text-xs font-semibold text-gray-500 uppercase">{status}</p>
    </div>
);

const NeedsActionRow: React.FC<{ item: NeedsActionItem }> = ({ item }) => {
    const issueMap = {
        'Missing info': { icon: <ExclamationTriangleIcon className="w-4 h-4 text-red-600"/>, text: 'Missing info', color: 'bg-red-100 text-red-700' },
        'Rejected by PM': { icon: <XCircleIcon className="w-4 h-4 text-orange-600"/>, text: 'Rejected by PM', color: 'bg-orange-100 text-orange-700' },
        'Not submitted': { icon: <PaperAirplaneIcon className="w-4 h-4 text-gray-500 -rotate-45 transform"/>, text: 'Not submitted', color: 'bg-gray-100 text-gray-600' },
    };
    const issue = issueMap[item.issue];
    const actionText = item.issue === 'Not submitted' ? 'Submit' : 'Edit Deal';

    return (
        <tr className="border-b">
            <td className="px-4 py-3 font-medium">{item.clientName}</td>
            <td className="px-4 py-3"><span className={`flex items-center space-x-2 text-xs font-semibold px-2 py-1 rounded-md ${issue.color}`}>{issue.icon}<span>{issue.text}</span></span></td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.lastUpdated}</td>
            <td className="px-4 py-3"><button className="px-4 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-50">{actionText}</button></td>
        </tr>
    );
};

const RecentDealRow: React.FC<{ deal: Deal }> = ({ deal }) => {
     const statusColors: { [key in Deal['status']]: string } = {
        'Converted': 'bg-teal-100 text-teal-700',
        'Intro Call Done': 'bg-purple-100 text-purple-700',
        'Intro Call Scheduled': 'bg-orange-100 text-orange-700',
        'Submitted to PM': 'bg-blue-100 text-blue-700',
        'Draft': 'bg-gray-200 text-gray-700',
        'New': 'bg-gray-200 text-gray-700',
        'On Hold': 'bg-yellow-100 text-yellow-700',
    };
    return (
        <tr className="border-b">
            <td className="px-4 py-3 font-medium">{deal.dealName}</td>
            <td className="px-4 py-3">${deal.budget.toLocaleString()}</td>
            <td className="px-4 py-3">{deal.services.length}</td>
            <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-md ${statusColors[deal.status] || 'bg-gray-100'}`}>{deal.status}</span></td>
            <td className="px-4 py-3">{deal.assignedPM || '—'}</td>
            <td className="px-4 py-3"><button className="px-4 py-1.5 text-sm font-medium text-blue-600">View Deal</button></td>
        </tr>
    );
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({ setActiveScreen }) => {
    return (
        <div className="space-y-6">
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 -mt-5">Overview of your sales activity</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Deals Created" value="24" subtitle="Current month" icon={<DocumentIcon className="w-6 h-6 text-blue-600" />} />
                <StatCard title="Total Deal Value" value="$487,500" subtitle="Current month" icon={<CurrencyDollarIcon className="w-6 h-6 text-green-600" />} />
                <StatCard title="Pending Intro Call" value="7" subtitle="Awaiting schedule" icon={<PhoneIcon className="w-6 h-6 text-orange-600" />} />
                <StatCard title="Deals Converted" value="12" subtitle="To projects" icon={<CheckCircleIcon className="w-6 h-6 text-teal-600" />} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Deal Status Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <DealStatusCard count={8} status="DRAFT" color="bg-gray-100 border-gray-300" />
                    <DealStatusCard count={6} status="SUBMITTED TO PM" color="bg-blue-100 border-blue-300" />
                    <DealStatusCard count={5} status="INTRO CALL SCHEDULED" color="bg-orange-100 border-orange-300" />
                    <DealStatusCard count={3} status="INTRO CALL DONE" color="bg-purple-100 border-purple-300" />
                    <DealStatusCard count={12} status="CONVERTED" color="bg-teal-100 border-teal-300" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Needs My Action</h2>
                    <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">5 items</span>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr className="border-b"><th className="px-4 py-2 font-medium">Client Name</th><th className="px-4 py-2 font-medium">Issue</th><th className="px-4 py-2 font-medium">Last Updated</th><th className="px-4 py-2 font-medium">Action</th></tr></thead>
                    <tbody>{salesNeedsActionData.map(item => <NeedsActionRow key={item.id} item={item} />)}</tbody>
                </table>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Deals</h2>
                    <button onClick={() => setActiveScreen(Screen.DealList)} className="text-sm font-medium text-blue-600">View all deals &rarr;</button>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr className="border-b"><th className="px-4 py-2 font-medium">Client Name</th><th className="px-4 py-2 font-medium">Total Deal Value</th><th className="px-4 py-2 font-medium">Services</th><th className="px-4 py-2 font-medium">Status</th><th className="px-4 py-2 font-medium">Assigned PM</th><th className="px-4 py-2 font-medium">Action</th></tr></thead>
                    <tbody>{salesRecentDealsData.map(deal => <RecentDealRow key={deal.id} deal={deal} />)}</tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesDashboard;
