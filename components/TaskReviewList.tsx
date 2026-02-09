

import React from 'react';
import { Task } from '../types';
import { detailedTasksData } from '../constants';
import { Screen } from '../App';
import { HelpIcon } from './icons';

interface TaskReviewListProps {
    setActiveScreen: (screen: Screen) => void;
    setSelectedTask: (task: Task) => void;
}

const TaskReviewList: React.FC<TaskReviewListProps> = ({ setActiveScreen, setSelectedTask }) => {
    const tasksForReview = detailedTasksData.filter(task => task.status === 'Submitted for Review');

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Tasks Submitted for Review ({tasksForReview.length})</h2>
                    <p className="text-sm text-gray-500">Select a task to begin the review process.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-3 text-left">Task Name</th>
                                <th className="p-3 text-left">Project</th>
                                <th className="p-3 text-left">Task Owner</th>
                                <th className="p-3 text-left">Due Date</th>
                                <th className="p-3 text-left">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksForReview.map(task => (
                                <tr key={task.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTask(task)}>
                                    <td className="p-3 font-medium text-gray-800">{task.name}</td>
                                    <td className="p-3">{task.project}</td>
                                    <td className="p-3 flex items-center space-x-2 pt-3">
                                        {/* FIX: Property 'taskOwner' does not exist on type 'Task'. Using 'assignees' array instead. */}
                                        <img src={task.assignees[0].avatar} className="w-6 h-6 rounded-full"/>
                                        <span>{task.assignees[0].name}</span>
                                    </td>
                                    <td className={`p-3 font-medium ${task.dueDate === 'Today' ? 'text-red-600' : ''}`}>{task.dueDate}</td>
                                    <td className="p-3">{task.lastUpdated}</td>
                                </tr>
                            ))}
                             {tasksForReview.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center p-6 text-gray-500">
                                        No tasks are currently submitted for review.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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

export default TaskReviewList;