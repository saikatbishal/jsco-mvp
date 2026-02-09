import React, { useState } from 'react';
import { teamMemberReviewsData, detailedReviewData } from '../constants';
import { TeamMemberReview, DetailedTeamMemberReview, ReviewOutcome } from '../types';
import { HelpIcon, StarIcon, FlagIcon, HandThumbUpIcon, ArrowUpOnSquareIcon } from './icons';
import ReviewDetailModal from './ReviewDetailModal';

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode, iconBgColor: string, iconColor: string }> = ({ title, value, icon, iconBgColor, iconColor }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${iconBgColor} ${iconColor}`}>
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);

const ReviewOutcomeBadge: React.FC<{ outcome: ReviewOutcome }> = ({ outcome }) => {
    const styles = {
        'Approved': 'bg-green-100 text-green-800',
        'Rework': 'bg-orange-100 text-orange-800',
        'Appreciation': 'bg-blue-100 text-blue-800',
        'Callout': 'bg-red-100 text-red-800',
        'Under Review': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[outcome]}`}>{outcome}</span>;
}

const RatingDisplay: React.FC<{ rating: number | null }> = ({ rating }) => {
    if (rating === null) {
        return <span className="text-gray-400">Pending</span>;
    }
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} solid={i < rating} />
            ))}
            <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

const TeamMemberReviews: React.FC = () => {
    const [reviews, setReviews] = useState<TeamMemberReview[]>(teamMemberReviewsData);
    const [selectedReview, setSelectedReview] = useState<DetailedTeamMemberReview | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (review: TeamMemberReview) => {
        // In a real app, you'd fetch the detailed data. Here we use mock data.
        if (review.id === detailedReviewData.id) {
            setSelectedReview(detailedReviewData);
            setIsModalOpen(true);
        } else {
            // For other reviews, show a simplified version or a message
            alert("Detailed view for this review is not available in this demo.");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="space-y-6 -m-8 p-8 bg-gray-50">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">Reviews & Feedback</h1>
                <p className="text-gray-500">Track your performance and feedback history</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Average Rating (30 days)" value="4.3/5.0" icon={<StarIcon className="w-6 h-6" />} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                <StatCard title="Red Flags" value="2" icon={<FlagIcon className="w-6 h-6" />} iconBgColor="bg-red-100" iconColor="text-red-600" />
                <StatCard title="Appreciations" value="8" icon={<HandThumbUpIcon className="w-6 h-6" />} iconBgColor="bg-green-100" iconColor="text-green-600" />
                <StatCard title="Reworks" value="5" icon={<ArrowUpOnSquareIcon className="w-6 h-6" />} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center space-x-2">
                <select className="p-2 border-gray-200 rounded-md bg-white text-sm"><option>Time Period: This Month</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-white text-sm"><option>Reviewer: Team Owner</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-white text-sm"><option>Rating: All Ratings</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-white text-sm"><option>All Projects</option></select>
                <select className="p-2 border-gray-200 rounded-md bg-white text-sm"><option>All Tasks</option></select>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
                <table className="w-full text-sm">
                    <caption className="p-4 text-lg font-semibold text-left bg-white text-gray-800 border-b">
                        Review History
                        <p className="mt-1 text-sm font-normal text-gray-500">Click any row to view detailed feedback</p>
                    </caption>
                    <thead className="text-xs text-gray-500 bg-gray-50">
                        <tr className="border-b">
                            <th className="p-3 text-left font-medium">Task Name</th>
                            <th className="p-3 text-left font-medium">Project Name</th>
                            <th className="p-3 text-left font-medium">Reviewer Role</th>
                            <th className="p-3 text-left font-medium">Review Outcome</th>
                            <th className="p-3 text-left font-medium">Rating</th>
                            <th className="p-3 text-left font-medium">Review Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleOpenModal(review)}>
                                <td className="p-3 font-medium text-gray-800">{review.taskName}</td>
                                <td className="p-3 text-gray-600">{review.projectName}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                        {'Team Owner': 'bg-purple-100 text-purple-800', 'Project Manager': 'bg-blue-100 text-blue-800', 'Quality': 'bg-pink-100 text-pink-800'}[review.reviewerRole]
                                    }`}>{review.reviewerRole}</span>
                                </td>
                                <td className="p-3"><ReviewOutcomeBadge outcome={review.reviewOutcome} /></td>
                                <td className="p-3"><RatingDisplay rating={review.rating} /></td>
                                <td className="p-3 text-gray-600">{review.reviewDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedReview && (
                <ReviewDetailModal review={selectedReview} onClose={handleCloseModal} />
            )}

            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <HelpIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default TeamMemberReviews;