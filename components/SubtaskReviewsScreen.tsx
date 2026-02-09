import React, { useState, useMemo } from 'react';
import { SubtaskForReview } from '../types';
import { subtaskReviewData } from '../constants';
import SubtaskReviewModal from './SubtaskReviewModal';
// FIX: Replaced non-existent ChatBubbleOvalLeftEllipsisIcon with ChatBubbleLeftRightIcon and aliased it as ClarifyIcon.
import { SearchIcon, HelpIcon, CheckIcon, XMarkIcon, ExclamationTriangleIcon, ChatBubbleLeftRightIcon as ClarifyIcon, EyeIcon } from './icons';

const ReviewStatusBadge: React.FC<{ status: SubtaskForReview['reviewStatus'], sla?: string }> = ({ status, sla }) => {
    const colors = {
        'Pending Review': 'bg-purple-100 text-purple-800',
        'Clarification': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800',
    };
    return (
        <div className="flex flex-col items-start">
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${colors[status]}`}>{status}</span>
            {sla && <span className="text-xs text-red-600 mt-1">{sla}</span>}
        </div>
    );
};

const QualityFlag: React.FC<{ flag: SubtaskForReview['qualityFlag'] }> = ({ flag }) => {
    const colors = {
        'Not Flagged': 'bg-gray-300',
        'Green': 'bg-green-500',
        'Red L1': 'bg-red-500',
        'Red L2': 'bg-red-700',
    };
    return <div className={`w-3 h-3 rounded-full ${colors[flag]}`} title={flag}></div>;
};


const SubtaskReviewsScreen: React.FC = () => {
    const [reviews, setReviews] = useState<SubtaskForReview[]>(subtaskReviewData);
    const [selectedReview, setSelectedReview] = useState<SubtaskForReview | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (review: SubtaskForReview) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    const overview = useMemo(() => ({
        pending: reviews.filter(r => r.reviewStatus === 'Pending Review').length,
        approved: reviews.filter(r => r.reviewStatus === 'Approved').length,
        rejected: reviews.filter(r => r.reviewStatus === 'Rejected').length,
        slaBreaches: reviews.filter(r => r.slaStatus).length,
        redFlags: reviews.filter(r => r.qualityFlag === 'Red L1' || r.qualityFlag === 'Red L2').length,
    }), [reviews]);


    return (
        <div className="flex space-x-6 h-full font-sans -m-8 p-6 bg-gray-50">
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Subtask Reviews</h1>
                        <p className="text-gray-500 text-sm">Quality Control & Acceptance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Export</button>
                        <button className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Advanced Filters</button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="grid grid-cols-6 gap-4">
                        <select className="p-2 border border-gray-300 rounded-md bg-white text-sm"><option>All Tasks</option></select>
                        <select className="p-2 border border-gray-300 rounded-md bg-white text-sm"><option>All Members</option></select>
                        <select className="p-2 border border-gray-300 rounded-md bg-white text-sm"><option>All Statuses</option></select>
                        <input type="text" placeholder="dd-mm-yyyy" className="p-2 border border-gray-300 rounded-md bg-white text-sm" />
                        <select className="p-2 border border-gray-300 rounded-md bg-white text-sm"><option>All Flags</option></select>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="relative flex-grow">
                            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search subtask, employee, or parent task..." className="w-full pl-9 p-2 border border-gray-300 rounded-md text-sm"/>
                        </div>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Clear Filters</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border shadow-sm flex-1 overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-3 w-10"><input type="checkbox" /></th>
                                <th className="p-3">Subtask Name</th>
                                <th className="p-3">Parent Task</th>
                                <th className="p-3">Assigned To</th>
                                <th className="p-3">Completion</th>
                                <th className="p-3">Time Spent</th>
                                <th className="p-3">Review Status</th>
                                <th className="p-3">Quality</th>
                                <th className="p-3">Output</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {reviews.map(r => (
                                <tr key={r.id} className="border-b hover:bg-gray-100 cursor-pointer">
                                    <td className="p-3" onClick={e => e.stopPropagation()}><input type="checkbox"/></td>
                                    <td onClick={() => handleRowClick(r)} className="p-3 font-medium">{r.name}<br/><span className="text-xs text-gray-400 font-normal">{r.id}</span></td>
                                    <td onClick={() => handleRowClick(r)} className="p-3">{r.parentTask}</td>
                                    <td onClick={() => handleRowClick(r)} className="p-3">
                                        <div className="flex items-center space-x-2">
                                            <img src={r.assignee.avatar} alt={r.assignee.name} className="w-6 h-6 rounded-full" />
                                            <span>{r.assignee.name}</span>
                                        </div>
                                    </td>
                                    <td onClick={() => handleRowClick(r)} className="p-3">{r.completionDate}<br/><span className="text-xs text-gray-400">{r.completionTime}</span></td>
                                    <td onClick={() => handleRowClick(r)} className="p-3 font-mono">{r.timeSpent}</td>
                                    <td onClick={() => handleRowClick(r)} className="p-3"><ReviewStatusBadge status={r.reviewStatus} sla={r.slaStatus}/></td>
                                    <td onClick={() => handleRowClick(r)} className="p-3 flex items-center pt-4"><QualityFlag flag={r.qualityFlag}/></td>
                                    <td onClick={() => handleRowClick(r)} className="p-3">{r.output.value}</td>
                                    <td className="p-3">
                                        <div className="flex items-center space-x-1">
                                            {r.reviewStatus === 'Pending Review' && <button onClick={() => handleRowClick(r)} className="font-medium text-blue-600 hover:underline">View</button>}
                                            {r.reviewStatus === 'Approved' && <button className="font-medium text-gray-500 cursor-not-allowed">View Only</button>}
                                            {r.reviewStatus === 'Rejected' && <button className="font-medium text-blue-600 hover:underline">Respan</button>}
                                            {r.reviewStatus === 'Clarification' && <button className="font-medium text-blue-600 hover:underline">Reply</button>}
                                            <div className="flex items-center space-x-1">
                                                <button title="Approve" className="p-1 text-green-500 hover:bg-green-100 rounded-full"><CheckIcon className="w-4 h-4"/></button>
                                                <button title="Reject" className="p-1 text-red-500 hover:bg-red-100 rounded-full"><XMarkIcon className="w-4 h-4"/></button>
                                                <button title="Clarify" className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full"><ClarifyIcon className="w-4 h-4"/></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                 <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">Showing 1-5 of 23 results</p>
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Previous</button>
                        <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">2</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">3</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Next</button>
                    </div>
                </div>

            </div>

            <aside className="w-72 flex-shrink-0 space-y-4">
                 <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Summary</h2>
                    <div className="space-y-3">
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg"><div className="flex justify-between items-center text-sm text-purple-800"><span>Pending Reviews</span><EyeIcon className="w-5 h-5"/></div><p className="text-3xl font-bold text-purple-900 mt-1">{overview.pending}</p><p className="text-xs text-purple-700">Requires immediate attention</p></div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg"><div className="flex justify-between items-center text-sm text-green-800"><span>Approved Today</span><CheckIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-green-900">{overview.approved}</p><p className="text-xs text-green-700">Great progress today</p></div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><div className="flex justify-between items-center text-sm text-red-800"><span>Rejected Today</span><XMarkIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-red-900">{overview.rejected}</p><p className="text-xs text-red-700">Needs rework</p></div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg"><div className="flex justify-between items-center text-sm text-orange-800"><span>SLA Breaches</span><ExclamationTriangleIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-orange-900">{overview.slaBreaches}</p><p className="text-xs text-orange-700">Overdue reviews</p></div>
                         <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg"><div className="flex justify-between items-center text-sm text-gray-800"><span>Red Flag Count</span><ExclamationTriangleIcon className="w-5 h-5"/></div><p className="text-2xl font-bold text-gray-900">{overview.redFlags}</p></div>
                    </div>
                </div>
            </aside>

            {isModalOpen && selectedReview && <SubtaskReviewModal subtask={selectedReview} onClose={handleCloseModal} />}
            <div className="fixed bottom-8 right-8 z-50"><button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"><HelpIcon className="w-7 h-7" /></button></div>
        </div>
    );
};

export default SubtaskReviewsScreen;