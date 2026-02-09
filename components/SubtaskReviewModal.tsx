import React, { useState } from 'react';
import { SubtaskForReview } from '../types';
// FIX: Replaced non-existent ClarifyIcon with ChatBubbleLeftRightIcon and aliased it.
import { XMarkIcon, CheckIcon, ChatBubbleLeftRightIcon as ClarifyIcon, PaperclipIcon, HelpIcon } from './icons';

interface SubtaskReviewModalProps {
    subtask: SubtaskForReview;
    onClose: () => void;
}

const SubtaskReviewModal: React.FC<SubtaskReviewModalProps> = ({ subtask, onClose }) => {
    const [decision, setDecision] = useState<'Approve' | 'Reject' | 'Clarify' | null>(null);
    const [comment, setComment] = useState('');
    const [qualityFlag, setQualityFlag] = useState(subtask.qualityFlag);

    const isCommentRequired = decision === 'Reject' || decision === 'Clarify';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end font-sans">
            <div className="bg-white h-full w-full max-w-lg shadow-xl flex flex-col transform transition-transform translate-x-0">
                <div className="p-4 bg-purple-600 text-white flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">{subtask.assignee.name.charAt(0)}</div>
                           <h2 className="text-lg font-semibold">{subtask.name}</h2>
                        </div>
                        <p className="text-sm text-purple-200 mt-1">{subtask.id} • Submitted by {subtask.assignee.name}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-purple-200 hover:bg-purple-700">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Subtask Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-gray-500">Parent Task:</p><p className="font-medium">{subtask.parentTask}</p></div>
                            <div><p className="text-gray-500">Assigned To:</p><p className="font-medium">{subtask.assignee.name}</p></div>
                            <div><p className="text-gray-500">Completed:</p><p className="font-medium">{subtask.completionDate} {subtask.completionTime}</p></div>
                            <div><p className="text-gray-500">Time Spent:</p><p className="font-medium">{subtask.timeSpent}</p></div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Review Decision</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => setDecision('Approve')} className={`p-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 border-2 ${decision === 'Approve' ? 'bg-green-600 text-white border-green-600' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}><CheckIcon className="w-5 h-5"/><span>Approve</span></button>
                            <button onClick={() => setDecision('Reject')} className={`p-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 border-2 ${decision === 'Reject' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}><XMarkIcon className="w-5 h-5"/><span>Reject</span></button>
                            <button onClick={() => setDecision('Clarify')} className={`p-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 border-2 ${decision === 'Clarify' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'}`}><ClarifyIcon className="w-5 h-5"/><span>Clarify</span></button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="review-comment" className="text-sm font-medium text-gray-700">Review Comment {isCommentRequired && <span className="text-red-500">*</span>}</label>
                        <textarea
                            id="review-comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Provide detailed feedback (required for Reject/Clarification)..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label htmlFor="quality-flag" className="text-sm font-medium text-gray-700">Quality Flag</label>
                             <select id="quality-flag" value={qualityFlag} onChange={e => setQualityFlag(e.target.value as SubtaskForReview['qualityFlag'])} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                                <option>Not Flagged</option>
                                <option>Green</option>
                                <option>Red L1</option>
                                <option>Red L2</option>
                             </select>
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-700">Attach Reference (Optional)</label>
                             <button className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-50">
                                <PaperclipIcon className="w-4 h-4"/>
                                <span>Attach File</span>
                             </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                    <button className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
                        <HelpIcon className="w-6 h-6" />
                    </button>
                    <button
                        disabled={!decision || (isCommentRequired && !comment.trim())}
                        className="w-full max-w-xs py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Confirm Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubtaskReviewModal;