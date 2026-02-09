import React, { useState } from 'react';
import { Deal } from '../types';
import { Screen } from '../App';
import { CalendarIcon, ExclamationTriangleIcon, CheckCircleIcon, BriefcaseIcon } from './icons';
import ScheduleIntroCallModal from './ScheduleIntroCallModal';
import DealDetailPanel from './DealDetailPanel';


interface DealListProps {
  deals: Deal[];
  onUpdateDeal: (deal: Deal) => void;
  setActiveScreen: (screen: Screen) => void;
  setSelectedDeal: (deal: Deal) => void;
}

const DealList: React.FC<DealListProps> = ({ deals, onUpdateDeal, setActiveScreen, setSelectedDeal }) => {
    const [schedulingDeal, setSchedulingDeal] = useState<Deal | null>(null);
    const [detailDeal, setDetailDeal] = useState<Deal | null>(null);
    
    const riskIndicator = (riskLevel: Deal['riskLevel']) => {
        switch (riskLevel) {
            case 'High Risk':
                return {
                    icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />,
                    barColor: 'bg-red-500',
                    badgeColor: 'bg-red-100 text-red-700'
                };
            case 'Medium Risk':
                return {
                    icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
                    barColor: 'bg-gray-300',
                    badgeColor: 'bg-gray-200 text-gray-600'
                };
            case 'Low Risk':
            default:
                return {
                    icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
                    barColor: 'bg-gray-300',
                    badgeColor: 'bg-gray-200 text-gray-600'
                };
        }
    };
    
    const handleScheduleCall = (dealId: string, dateTime: string) => {
        const dealToUpdate = deals.find(d => d.id === dealId);
        if (dealToUpdate) {
            onUpdateDeal({ ...dealToUpdate, introCallStatus: 'Done', introCallDateTime: dateTime, status: 'Intro Call Done' });
        }
        setSchedulingDeal(null);
    };

  return (
    <>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">Deal / Client</th>
                        <th scope="col" className="px-6 py-3 font-medium">Intro Call</th>
                        <th scope="col" className="px-6 py-3 font-medium">Total Value</th>
                        <th scope="col" className="px-6 py-3 font-medium">Sales Owner</th>
                        <th scope="col" className="px-6 py-3 font-medium">Handover Date</th>
                        <th scope="col" className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {deals.map((deal) => {
                        const { icon: riskIcon, barColor, badgeColor: riskBadgeColor } = riskIndicator(deal.riskLevel);
                        return (
                            <tr key={deal.id} className="hover:bg-gray-50 align-top cursor-pointer" onClick={() => setDetailDeal(deal)}>
                                <td className="px-6 py-4">
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-1.5 h-16 rounded-full ${barColor}`}></div>
                                        <div>{riskIcon}</div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <div className="font-bold text-gray-800">{deal.dealName}</div>
                                                {deal.status === 'New' && <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-600">NEW</span>}
                                                {deal.status === 'Converted' && <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-200 text-gray-600">CONVERTED</span>}
                                                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${deal.introCallStatus === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                                    Intro Call: {deal.introCallStatus}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-xs mt-1">{deal.clientDetails?.url}</p>
                                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-2">
                                                <span className="flex items-center"><BriefcaseIcon className="w-4 h-4 mr-1"/> {deal.services.length} Services</span>
                                                <span className={`px-2 py-0.5 rounded ${riskBadgeColor}`}>{deal.riskLevel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                    {deal.introCallStatus === 'Pending' ? (
                                        <button onClick={() => setSchedulingDeal(deal)} className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-semibold">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>Schedule Call</span>
                                        </button>
                                    ) : (
                                        <div>
                                            <p className="font-semibold text-gray-800">{deal.introCallDateTime?.split('•')[0]}</p>
                                            <p className="text-gray-500 text-xs">{deal.introCallDateTime?.split('•')[1]}</p>
                                            <div className="flex space-x-2 text-xs mt-1">
                                                <a href="#" className="text-blue-600 font-semibold">Edit</a>
                                                <a href="#" className="text-blue-600 font-semibold">Join</a>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-lg text-gray-800">${deal.budget.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400 uppercase">{deal.currency}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{deal.salesPerson.name}</td>
                                <td className="px-6 py-4 text-gray-700">{deal.startDate}</td>
                                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                    {deal.status === 'Converted' ? (
                                        <button onClick={() => setSelectedDeal(deal)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold">View Projects</button>
                                    ) : deal.introCallStatus === 'Done' ? (
                                        <button onClick={() => setSelectedDeal(deal)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold">Convert to Projects</button>
                                    ) : (
                                        <button disabled className="bg-gray-100 text-gray-400 px-4 py-2 rounded-md text-sm font-semibold cursor-not-allowed">Convert</button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        {schedulingDeal && (
            <ScheduleIntroCallModal
                deal={schedulingDeal}
                onClose={() => setSchedulingDeal(null)}
                onSchedule={handleScheduleCall}
            />
        )}
        {detailDeal && (
            <DealDetailPanel
                deal={detailDeal}
                onClose={() => setDetailDeal(null)}
                onConvertToProject={(dealToConvert) => {
                    setDetailDeal(null);
                    setSelectedDeal(dealToConvert);
                }}
            />
        )}
    </>
  );
};

export default DealList;
