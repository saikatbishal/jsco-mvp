import React from 'react';
import { Screen } from '../App';
import {
  DashboardIcon,
  BriefcaseIcon,
  CheckSquareIcon,
  DocumentIcon,
  CreditCardIcon,
  UsersIcon,
  FolderIcon,
  ShieldCheckIcon,
  CogIcon,
  PlusIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  ListBulletIcon,
  ChartBarIcon,
  UserCircleIcon,
  CalendarIcon,
} from './icons';
import { detailedTasksData } from '../constants';
import { AuthenticatedUser } from '../types';

interface SidebarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
  currentUser: AuthenticatedUser;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
  isSales?: boolean;
}> = ({ icon, label, isActive, onClick, badge, isSales }) => {
    const activeClasses = isSales ? 'bg-gray-200 text-gray-900' : 'bg-blue-600 text-white';
    const inactiveClasses = isSales ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700';
    const badgeClasses = isSales
        ? (isActive ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800')
        : (isActive ? 'bg-white text-blue-600' : 'bg-blue-200 text-blue-800');

    return (
        <li>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                className={`flex items-center p-2 text-base font-normal rounded-lg transition-colors ${
                    isActive ? activeClasses : inactiveClasses
                }`}
            >
            {icon}
            <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className={`inline-flex items-center justify-center w-5 h-5 ml-3 text-xs font-semibold ${badgeClasses} rounded-full`}>
                    {badge}
                </span>
            )}
            </a>
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen, currentUser, onLogout }) => {
  const tasksToReviewCount = detailedTasksData.filter(
    (task) => task.status === 'Submitted for Review'
  ).length;

  const handleNavClick = (screen: Screen) => {
      setActiveScreen(screen);
  };
  
  const isSales = currentUser.role === 'Sales';
  const isTeamLead = currentUser.role === 'Team Lead';
  const isTeamOwner = currentUser.role === 'Team Owner';
  const isTeamMember = currentUser.role === 'Team Member';
  
  const salesNavItems = [
    { id: Screen.SalesDashboard, label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'DEALS_SECTION', label: 'DEALS', isSection: true },
    { id: Screen.DealList, label: 'Deal List', icon: <ListBulletIcon className="w-5 h-5" />, isSubItem: true },
    { id: Screen.CreateDeal, label: 'Create New Deal', icon: <PlusIcon className="w-5 h-5" />, isSubItem: true },
    { id: 'MANAGEMENT_SECTION', label: 'MANAGEMENT', isSection: true },
    { id: Screen.Clients, label: 'Clients', icon: <UsersIcon className="w-5 h-5" />, isSubItem: true },
    { id: Screen.MeetingsIntroCalls, label: 'Meetings / Intro Calls', icon: <CalendarIcon className="w-5 h-5" />, isSubItem: true },
    { id: 'COMPANIES_SECTION', label: 'Companies', isSection: true },
    { id: Screen.Companies, label: 'Company List', icon: <ListBulletIcon className="w-5 h-5" />, isSubItem: true },
    { id: Screen.AddNewCompany, label: 'Add New Company', icon: <PlusIcon className="w-5 h-5" />, isSubItem: true },
    { id: 'AGENCIES_SECTION', label: 'Agencies', isSection: true },
    { id: Screen.AgencyList, label: 'Agency List', icon: <ListBulletIcon className="w-5 h-5" />, isSubItem: true },
    { id: Screen.AddNewAgency, label: 'Add New Agency', icon: <PlusIcon className="w-5 h-5" />, isSubItem: true },
  ];

  const pmNavItems = [
    { id: Screen.Dashboard, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 'DEAL_MANAGEMENT', label: 'Deal Management', icon: <BriefcaseIcon className="w-6 h-6" />, isSection: true },
    { id: Screen.DealList, label: 'Deal list', icon: <BriefcaseIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.CreateDeal, label: 'Create deal', icon: <PlusIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'PROJECT_MANAGEMENT', label: 'Project Management', icon: <FolderIcon className="w-6 h-6" />, isSection: true },
    { id: Screen.ProjectList, label: 'Project List', icon: <BriefcaseIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.TaskList, label: 'Task Management', icon: <CheckSquareIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.TaskReviewList, label: 'Review of Tasks', icon: <EyeIcon className="w-6 h-6" />, isSubItem: true, badge: tasksToReviewCount },
    { id: Screen.TaskTemplates, label: 'Task Templates', icon: <DocumentIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'FINANCIAL', label: 'Financial', icon: <CreditCardIcon className="w-6 h-6" />, isSection: true },
    { id: 'INVOICES', label: 'Invoices', icon: <DocumentIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'PAYMENTS', label: 'Payments', icon: <CreditCardIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'ORGANIZATION', label: 'Organization', icon: <UsersIcon className="w-6 h-6" />, isSection: true },
    { id: Screen.Companies, label: 'Company List', icon: <BriefcaseIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.AddNewCompany, label: 'Add New Company', icon: <PlusIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.AgencyList, label: 'Agency List', icon: <BriefcaseIcon className="w-6 h-6" />, isSubItem: true },
    { id: Screen.AddNewAgency, label: 'Add New Agency', icon: <PlusIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'PORTFOLIO_VIEW', label: 'Portfolio View', icon: <FolderIcon className="w-6 h-6" />, isSubItem: true },
    { id: 'QUALITY_REVIEW', label: 'Quality & Review', icon: <ShieldCheckIcon className="w-6 h-6" />, isSection: true },
  ];

  const teamLeadNavItems = [
    { id: Screen.Dashboard, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: Screen.MyTasks, label: 'Tasks Request', icon: <ListBulletIcon className="w-6 h-6" /> },
    { id: Screen.TeamTasks, label: 'Team Tasks', icon: <UsersIcon className="w-6 h-6" /> },
    { id: Screen.Subtasks, label: 'Subtasks', icon: <CheckSquareIcon className="w-6 h-6" /> },
    { id: Screen.SubtaskReviews, label: 'Reviews', icon: <EyeIcon className="w-6 h-6" />, badge: tasksToReviewCount },
    { id: Screen.MyTasks, label: 'Performance', icon: <ChartBarIcon className="w-6 h-6" /> }, // Placeholder
    { id: Screen.TeamLeaderProfile, label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];

  const teamOwnerNavItems = [
    { id: Screen.TeamOwnerDashboard, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: Screen.MyTasks, label: 'My Tasks', icon: <ListBulletIcon className="w-6 h-6" /> },
    { id: Screen.TeamTasks, label: 'Team Tasks', icon: <UsersIcon className="w-6 h-6" /> },
    { id: Screen.Subtasks, label: 'Subtasks', icon: <CheckSquareIcon className="w-6 h-6" /> },
    { id: Screen.SubtaskReviews, label: 'Reviews', icon: <EyeIcon className="w-6 h-6" />, badge: tasksToReviewCount },
    { id: Screen.MyTasks, label: 'Performance', icon: <ChartBarIcon className="w-6 h-6" /> }, // Placeholder
    { id: Screen.TeamLeaderProfile, label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];
  
  const teamMemberNavItems = [
      { id: Screen.TeamMemberDashboard, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
      { id: Screen.TeamMemberMyWork, label: 'My Work', icon: <BriefcaseIcon className="w-6 h-6" /> },
      { id: Screen.TeamMemberReviews, label: 'Reviews & Feedback', icon: <EyeIcon className="w-6 h-6" /> },
      { id: Screen.TeamMemberProfile, label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];

  const getNavItems = () => {
    if (isSales) return salesNavItems;
    if (isTeamOwner) return teamOwnerNavItems;
    if (isTeamLead) return teamLeadNavItems;
    if (isTeamMember) return teamMemberNavItems;
    return pmNavItems;
  }

  return (
    <aside className={`w-64 transition-all duration-300 ${isSales ? 'bg-gray-50 border-r' : 'bg-gray-800'}`} aria-label="Sidebar">
      <div className={`overflow-y-auto h-full py-4 px-3 ${isSales ? 'text-gray-700' : 'text-white'} flex flex-col`}>
        <div className="flex items-center pl-2.5 mb-5 h-8">
            <h1 className={`text-xl font-bold ${isSales ? 'text-gray-800' : 'text-white'}`}>DWS</h1>
        </div>
        <ul className="space-y-2 flex-1">
          {isTeamLead || isTeamOwner || isTeamMember ? (
            getNavItems().map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeScreen === item.id}
                onClick={() => handleNavClick(item.id as Screen)}
                badge={item.badge}
              />
            ))
          ) : (
            getNavItems().map((item) => {
              if (item.isSubItem) {
                const subItemActiveClasses = isSales ? 'bg-gray-200 text-gray-900' : 'bg-blue-600 text-white';
                const subItemInactiveClasses = isSales ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700';

                return (
                  <li key={item.id} className="pl-4">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.id as Screen);
                        }}
                        className={`flex items-center p-2 text-sm font-normal rounded-lg transition-colors ${
                          activeScreen === item.id ? subItemActiveClasses : subItemInactiveClasses
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
                         {item.badge && item.badge > 0 && (
                          <span className={`inline-flex items-center justify-center w-5 h-5 ml-3 text-xs font-semibold ${activeScreen === item.id ? 'bg-white text-blue-600' : 'bg-blue-200 text-blue-800'} rounded-full`}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </li>
                );
              }
              if (item.isSection) {
                return (
                  <li key={item.id}>
                      <span className={`px-2 pt-4 pb-2 text-xs font-bold ${isSales ? 'text-gray-400' : 'text-gray-400'} uppercase`}>
                          {item.label}
                      </span>
                  </li>
                );
              }
              return <NavItem key={item.id} icon={item.icon} label={item.label} isActive={activeScreen === item.id} onClick={() => handleNavClick(item.id as Screen)} isSales={isSales} />
            })
          )}
        </ul>
        <div className="mt-auto">
          <ul className="space-y-1">
             { !isTeamMember && <NavItem icon={<UserCircleIcon className="w-5 h-5" />} label="Profile" isActive={false} onClick={() => {}} isSales={isSales} /> }
            <NavItem icon={<LogoutIcon className="w-5 h-5" />} label="Logout" isActive={false} onClick={onLogout} isSales={isSales} />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
