import React from 'react';
import { DetailedTeamMemberReview } from '../types';
import { XMarkIcon, StarIcon, CheckCircleIcon, LightBulbIcon, ChatBubbleLeftRightIcon, HandThumbUpIcon } from './icons';

interface ReviewDetailModalProps {
    review: DetailedTeamMemberReview;
    onClose: () => void;
}

const StarRating: React.FC<{ rating: number | null }> = ({ rating }) => {
    const totalStars = 5;
    const fullStars = rating ? Math.floor(rating) : 0;
    
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <StarIcon key={index} className={`w-6 h-6 ${index < fullStars ? 'text-yellow-400' : 'text-gray-300'}`} solid={index < fullStars} />
            ))}
            {rating && <span className="ml-2 text-xl font-bold">{rating.toFixed(1)}</span>}
        </div>
    );
};

const OutcomeBadge: React.FC<{ outcome: DetailedTeamMemberReview['reviewOutcome'] }> = ({ outcome }) => {
    const styles = {
        Approved: 'bg-green-100 text-green-800',
        Rework: 'bg-orange-100 text-orange-800',
        Appreciation: 'bg-blue-100 text-blue-800',
        Callout: 'bg-red-100 text-red-800',
        'Under Review': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[outcome]}`}>{outcome}</span>
}

const FeedbackSection: React.FC<{ title: string, items: string[], icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div>
        <h4 className="flex items-center font-semibold text-gray-800 mb-2">
            {icon}
            <span className="ml-2">{title}</span>
        </h4>
        <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside pl-2">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({ review, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center font-sans" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Review History</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XMarkIcon className="w-6 h-6 text-gray-600" /></button>
                </header>
                
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    <section>
                        <h3 className="text-xs uppercase text-gray-500 mb-1">Task Details</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div><p className="font-semibold">{review.taskName}</p><p className="text-sm text-gray-500">Task Name</p></div>
                            <div><p className="font-semibold">{review.projectName}</p><p className="text-sm text-gray-500">Project Name</p></div>
                        </div>
                         <div className="grid grid-cols-3 gap-4 mt-4">
                            <div><p className="font-semibold">{review.submissionDate}</p><p className="text-sm text-gray-500">Submission Date</p></div>
                            <div><p className="font-semibold">{review.deadline}</p><p className="text-sm text-gray-500">Deadline</p></div>
                        </div>
                    </section>
                    
                    <section className="border-t pt-4">
                        <h3 className="text-xs uppercase text-gray-500 mb-1">Reviewer Details</h3>
                         <div className="grid grid-cols-3 gap-4">
                            <div><p className="font-semibold">{review.reviewerName}</p><p className="text-sm text-gray-500">Reviewer</p></div>
                            <div><span className="px-2 py-1 text-sm font-semibold rounded bg-purple-100 text-purple-800">{review.reviewerRole}</span><p className="text-sm text-gray-500 mt-1">Role</p></div>
                            <div><p className="font-semibold">{review.reviewDate}</p><p className="text-sm text-gray-500">Review Date</p></div>
                        </div>
                    </section>

                    <section className="border-t pt-4">
                        <h3 className="text-xs uppercase text-gray-500 mb-2">Rating & Outcome</h3>
                        <div className="flex items-center space-x-6">
                            <StarRating rating={review.rating} />
                            <OutcomeBadge outcome={review.reviewOutcome} />
                        </div>
                    </section>
                    
                    <section className="border-t pt-4 space-y-4">
                        <h3 className="text-xs uppercase text-gray-500 mb-2">Structured Feedback</h3>
                        <FeedbackSection title="What Was Done Well" items={review.feedback.doneWell} icon={<CheckCircleIcon className="w-5 h-5 text-green-500" />} />
                        <FeedbackSection title="What Needs Improvement" items={review.feedback.improvement} icon={<LightBulbIcon className="w-5 h-5 text-yellow-500" />} />
                    </section>
                    
                     <section className="border-t pt-4">
                        <h3 className="text-xs uppercase text-gray-500 mb-2">Client Sentiment</h3>
                        <div className="flex items-start">
                            <HandThumbUpIcon className="w-5 h-5 text-blue-500 mr-2 mt-1" />
                            <div>
                                <p className="font-semibold text-blue-800">{review.clientSentiment.sentiment}</p>
                                <p className="text-sm text-gray-600">{review.clientSentiment.comment}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="font-semibold text-sm text-blue-800">Performance Impact</p>
                        <p className="text-sm text-blue-700">This review impacts your performance as: <span className="font-bold text-lg">+{review.performanceImpact}</span></p>
                    </section>

                </main>
                
                <footer className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Acknowledge Review</button>
                    <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                        <ChatBubbleLeftRightIcon className="w-5 h-5"/>
                        <span>Add Comment</span>
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ReviewDetailModal;