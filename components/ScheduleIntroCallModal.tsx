import React, { useState } from 'react';
import { Deal } from '../types';
import { XMarkIcon, CalendarIcon, UsersIcon } from './icons';

interface ScheduleIntroCallModalProps {
    deal: Deal;
    onClose: () => void;
    onSchedule: (dealId: string, dateTime: string) => void;
}

const ScheduleIntroCallModal: React.FC<ScheduleIntroCallModalProps> = ({ deal, onClose, onSchedule }) => {
    const [date, setDate] = useState('2026-02-04');
    const [time, setTime] = useState('23:40');
    const [timezone, setTimezone] = useState('PST');
    const [meetingPlatform, setMeetingPlatform] = useState('google');
    const [meetingLink, setMeetingLink] = useState('');

    const handleSubmit = () => {
        if (!meetingLink) {
            alert('Please generate a meeting link first.');
            return;
        }
        const dateObj = new Date(date + 'T' + time);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const formattedDateTime = `${formattedDate} • ${formattedTime} ${timezone}`;
        onSchedule(deal.id, formattedDateTime);
    };

    const generateMeetingLink = () => {
        if (meetingPlatform === 'google') {
            setMeetingLink(`https://meet.google.com/${Math.random().toString(36).substring(2, 12)}`);
        } else { // zoom
            setMeetingLink(`https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`);
        }
    };

    const attendees = [
        { role: 'Client', email: deal.clientDetails?.email },
        { role: 'Sales', email: deal.salesPerson.email },
        { role: 'PM', email: deal.projectManager?.email },
    ].filter(a => a.email);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-sans">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Schedule Intro Call</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XMarkIcon className="w-5 h-5 text-gray-600" /></button>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-sm text-gray-500 mb-2 flex items-center"><UsersIcon className="w-4 h-4 mr-2"/> Attendees (auto-fetched)</p>
                        <div className="p-3 bg-gray-50 rounded-md border space-y-1">
                            {attendees.map(att => (
                                <div key={att.role} className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-700">{att.email}</span>
                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{att.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                             <input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                        <select id="timezone" value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                            <option value="PST">PST - Pacific Standard Time</option>
                            <option value="EST">EST - Eastern Standard Time</option>
                            <option value="GMT">GMT - Greenwich Mean Time</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Meeting Platform</label>
                        <div className="flex items-center space-x-2 mt-1">
                            <select id="meeting-platform" value={meetingPlatform} onChange={e => setMeetingPlatform(e.target.value)} className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="google">Google Meet</option>
                                <option value="zoom">Zoom</option>
                            </select>
                            <button onClick={generateMeetingLink} className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Create Link</button>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="meeting-link" className="block text-sm font-medium text-gray-700">Meeting Link</label>
                        <input id="meeting-link" type="text" value={meetingLink} readOnly placeholder="Generate a link above" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Send Invite</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleIntroCallModal;