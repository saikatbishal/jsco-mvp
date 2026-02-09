import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SalesDashboard from './components/SalesDashboard';
import ProjectList from './components/ProjectList';
import Header from './components/Header';
import DealList from './components/DealList';
import CreateProjectFromDeal from './components/CreateProjectFromDeal';
import CreateDeal from './components/CreateDeal';
import SalesHeader from './components/DealDetail'; // repurposed for SalesHeader
import ProjectDetail from './components/ProjectDetail';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import Companies from './components/Companies';
import CreateCompany from './components/CreateCompany';
import CreateAgency from './components/CreateAgency';
import TaskReview from './components/TaskReview';
import TaskReviewList from './components/TaskReviewList';
import TaskTemplates from './components/TaskTemplates';
import LoginScreen from './components/LoginScreen';
import MyTasksScreen from './components/MyTasksScreen';
import TeamTasksScreen from './components/TeamTasksScreen';
import SubtasksScreen from './components/SubtasksScreen';
import SubtaskReviewsScreen from './components/SubtaskReviewsScreen';
import TeamLeaderProfileScreen from './components/TeamLeaderProfileScreen';
import TeamOwnerDashboard from './components/TeamOwnerDashboard';
import TeamOwnerHeader from './components/TeamOwnerHeader';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import TeamMemberMyWork from './components/TeamMemberMyWork';
import TeamMemberTaskDetail from './components/TeamMemberTaskDetail';
import TeamMemberReviews from './components/TeamMemberReviews';
import { Project, Task as TaskType, AuthenticatedUser, TeamLeadSubtask, TaskForReview, Deal, Agency, Company } from './types';
import { projectsData, detailedTasksData, userCredentials, STATIC_PASSWORD, teamMemberTaskDetailData, dealsData, companiesAndAgenciesData, teamLeadSubtasksData, usersData } from './constants';
import Dashboard from './components/Dashboard';


export enum Screen {
  Dashboard = 'DASHBOARD',
  SalesDashboard = 'SALES_DASHBOARD',
  ProjectList = 'PROJECT_LIST',
  DealList = 'DEAL_LIST',
  CreateProjectFromDeal = 'CREATE_PROJECT_FROM_DEAL',
  CreateDeal = 'CREATE_DEAL',
  ProjectDetail = 'PROJECT_DETAIL',
  CreateTask = 'CREATE_TASK',
  TaskList = 'TASK_LIST',
  TaskDetail = 'TASK_DETAIL',
  Companies = 'COMPANIES',
  Clients = 'CLIENTS',
  MeetingsIntroCalls = 'MEETINGS_INTRO_CALLS',
  AgencyList = 'AGENCY_LIST',
  AddNewCompany = 'ADD_NEW_COMPANY',
  AddNewAgency = 'ADD_NEW_AGENCY',
  TaskReviewList = 'TASK_REVIEW_LIST',
  TaskReview = 'TASK_REVIEW',
  TaskTemplates = 'TASK_TEMPLATES',
  MyTasks = 'MY_TASKS',
  TeamTasks = 'TEAM_TASKS',
  Subtasks = 'SUBTASKS',
  SubtaskReviews = 'SUBTASK_REVIEWS',
  TeamLeaderProfile = 'TEAM_LEADER_PROFILE',
  TeamOwnerDashboard = 'TEAM_OWNER_DASHBOARD',
  TeamMemberDashboard = 'TEAM_MEMBER_DASHBOARD',
  TeamMemberMyWork = 'TEAM_MEMBER_MY_WORK',
  TeamMemberReviews = 'TEAM_MEMBER_REVIEWS',
  TeamMemberProfile = 'TEAM_MEMBER_PROFILE',
  TeamMemberTaskDetail = 'TEAM_MEMBER_TASK_DETAIL',
}

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Dashboard);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedSubtask, setSelectedSubtask] = useState<TeamLeadSubtask | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Centralized state
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [deals, setDeals] = useState<Deal[]>(dealsData);
  const [tasks, setTasks] = useState<TaskType[]>(detailedTasksData);
  const [companiesAndAgencies, setCompaniesAndAgencies] = useState<(Agency | Company)[]>(companiesAndAgenciesData);
  const [subtasks, setSubtasks] = useState<TeamLeadSubtask[]>(teamLeadSubtasksData);

  const handleAddDeal = (newDeal: Deal) => {
    setDeals(prevDeals => [newDeal, ...prevDeals]);
    setActiveScreen(Screen.DealList);
  };
  
  const handleUpdateDeal = (updatedDeal: Deal) => {
    setDeals(prevDeals => prevDeals.map(d => d.id === updatedDeal.id ? updatedDeal : d));
  };
  
  const handleCreateProjectsFromDeal = (newProjects: Project[]) => {
    setProjects(prevProjects => [...newProjects, ...prevProjects]);
    const updatedDealId = newProjects[0]?.dealId;
    if (updatedDealId) {
      setDeals(prevDeals => prevDeals.map(d => d.id === updatedDealId ? { ...d, status: 'Converted' } : d));
    }
    setActiveScreen(Screen.ProjectList);
  };

  const handleAddTask = (newTask: TaskType) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setActiveScreen(Screen.TaskList);
  };

  const handleAddSubtask = (newSubtask: TeamLeadSubtask) => {
    setSubtasks(prevSubtasks => [newSubtask, ...prevSubtasks]);
  };

  const handleAddCompany = (newCompany: Company) => {
    setCompaniesAndAgencies(prev => [newCompany, ...prev]);
    setActiveScreen(Screen.Companies);
  };
  
  const handleAddAgency = (newAgency: Agency) => {
    setCompaniesAndAgencies(prev => [newAgency, ...prev]);
    setActiveScreen(Screen.AgencyList);
  };


  const handleLogin = async (username: string, password: string): Promise<string | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalizedUsername = username.toLowerCase();
    const role = userCredentials[normalizedUsername];

    if (!role) {
      return "Invalid user credentials";
    }

    if (password !== STATIC_PASSWORD) {
      return "Incorrect password";
    }

    setCurrentUser({ username: normalizedUsername, role });
    
    if (role === 'Sales') {
      setActiveScreen(Screen.SalesDashboard);
    } else if (role === 'Team Lead') {
      setActiveScreen(Screen.TeamTasks);
    } else if (role === 'Team Owner') {
      setActiveScreen(Screen.TeamOwnerDashboard);
    } else if (role === 'Team Member') {
      setActiveScreen(Screen.TeamMemberDashboard);
    } else {
      setActiveScreen(Screen.Dashboard);
    }

    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveScreen(Screen.Dashboard); 
  };

  const handleSetSelectedProject = (project: Project) => {
    setSelectedProject(project);
    setActiveScreen(Screen.ProjectDetail);
  };

  const handleSetSelectedTask = (task: TaskType) => {
    setSelectedTask(task);
    if (currentUser?.role === 'Team Member') {
      const taskForDetail = tasks.find(t => t.id === task.id) || task;
      setSelectedTask(taskForDetail.name === 'Frontend Integration' ? teamMemberTaskDetailData : taskForDetail);
      setActiveScreen(Screen.TeamMemberTaskDetail);
    } else if (task.status === 'Submitted for Review') {
      setActiveScreen(Screen.TaskReview);
    } else {
      setActiveScreen(Screen.TaskDetail);
    }
  }
  
  const handleSetSelectedSubtask = (subtask: TeamLeadSubtask) => {
    setSelectedSubtask(subtask);
  }

  const handleSetSelectedDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setActiveScreen(Screen.CreateProjectFromDeal);
  };


  const renderScreen = () => {
    const isSales = currentUser?.role === 'Sales';
    const isTeamMember = currentUser?.role === 'Team Member';
    const assignableUsers = usersData.filter(u => !['Project Manager', 'BU Admin', 'Super Admin', 'Sales', 'Team Owner'].includes(u.role));
    const companies = companiesAndAgencies.filter(item => item.type === 'Company') as Company[];


    if (isTeamMember) {
       switch (activeScreen) {
        case Screen.TeamMemberDashboard:
            return <TeamMemberDashboard setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
        case Screen.TeamMemberMyWork:
            return <TeamMemberMyWork setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
        case Screen.TeamMemberTaskDetail:
            return selectedTask ? <TeamMemberTaskDetail task={selectedTask} setActiveScreen={setActiveScreen} /> : <TeamMemberDashboard setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
        case Screen.TeamMemberReviews:
            return <TeamMemberReviews />;
        case Screen.TeamMemberProfile:
            return <div className="p-4 bg-white rounded-md shadow">Profile screen is not yet implemented.</div>;
        default:
            return <TeamMemberDashboard setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
       }
    }

    switch (activeScreen) {
      case Screen.SalesDashboard:
        return <SalesDashboard setActiveScreen={setActiveScreen} />;
      case Screen.Dashboard:
        return isSales ? <SalesDashboard setActiveScreen={setActiveScreen} /> : <Dashboard setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
      case Screen.TeamOwnerDashboard:
        return <TeamOwnerDashboard />;
      case Screen.ProjectList:
        return <ProjectList projects={projects} setActiveScreen={setActiveScreen} setSelectedProject={handleSetSelectedProject} />;
      case Screen.DealList:
        return <DealList deals={deals} onUpdateDeal={handleUpdateDeal} setActiveScreen={setActiveScreen} setSelectedDeal={handleSetSelectedDeal} />;
      case Screen.CreateProjectFromDeal:
        return <CreateProjectFromDeal deal={selectedDeal} onCreateProjects={handleCreateProjectsFromDeal} setActiveScreen={setActiveScreen} />;
      case Screen.CreateDeal:
        return <CreateDeal setActiveScreen={setActiveScreen} onAddDeal={handleAddDeal} companies={companies} />;
      case Screen.ProjectDetail:
        return selectedProject ? <ProjectDetail project={selectedProject} setActiveScreen={setActiveScreen} /> : <ProjectList projects={projects} setActiveScreen={setActiveScreen} setSelectedProject={handleSetSelectedProject} />;
       case Screen.CreateTask:
        return selectedProject ? <CreateTask project={selectedProject} setActiveScreen={setActiveScreen} /> : <ProjectList projects={projects} setActiveScreen={setActiveScreen} setSelectedProject={handleSetSelectedProject} />;
      case Screen.TaskList:
        return <TaskList tasks={tasks} setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
      case Screen.TaskDetail:
        return selectedTask ? <TaskDetail task={selectedTask} setActiveScreen={setActiveScreen} /> : <TaskList tasks={tasks} setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
      case Screen.Companies:
        return <Companies companiesAndAgencies={companiesAndAgencies} />;
       case Screen.TaskReviewList:
        return <TaskReviewList setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
       case Screen.TaskReview:
        return selectedTask ? <TaskReview task={selectedTask as TaskForReview} setActiveScreen={setActiveScreen} /> : <TaskReviewList setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
      case Screen.TaskTemplates:
        return <TaskTemplates setActiveScreen={setActiveScreen} />;
      case Screen.MyTasks:
         return <MyTasksScreen />;
      case Screen.TeamTasks:
          return <TeamTasksScreen />;
      case Screen.Subtasks:
          return <SubtasksScreen subtasks={subtasks} teamMembers={assignableUsers} allTasks={tasks} onCreateSubtask={handleAddSubtask} />;
      case Screen.SubtaskReviews:
          return <SubtaskReviewsScreen />;
      case Screen.TeamLeaderProfile:
          return <TeamLeaderProfileScreen setActiveScreen={setActiveScreen} />;
      case Screen.AgencyList:
        return <Companies companiesAndAgencies={companiesAndAgencies} />;
      case Screen.AddNewCompany:
          return <CreateCompany setActiveScreen={setActiveScreen} onAddCompany={handleAddCompany} />
      case Screen.AddNewAgency:
          return <CreateAgency setActiveScreen={setActiveScreen} onAddAgency={handleAddAgency} />
      case Screen.Clients:
      case Screen.MeetingsIntroCalls:
          return <div className="p-4 bg-white rounded-md shadow">This screen is not yet implemented.</div>
      default:
        return isSales ? <SalesDashboard setActiveScreen={setActiveScreen} /> : <Dashboard setActiveScreen={setActiveScreen} setSelectedTask={handleSetSelectedTask} />;
    }
  };
  
  const getHeaderTitle = () => {
    switch (activeScreen) {
      case Screen.SalesDashboard:
        return 'Sales Executive Dashboard';
      case Screen.Dashboard:
        if (currentUser?.role === 'Project Manager') return 'Command Center';
        if (currentUser?.role === 'Team Member') return 'Dashboard';
        return 'Project Manager Dashboard';
      case Screen.TeamMemberDashboard:
        return 'Dashboard';
      case Screen.TeamMemberMyWork:
        return 'My Work';
      case Screen.TeamMemberReviews:
        return 'Reviews & Feedback';
      case Screen.TeamMemberProfile:
        return 'Profile';
      case Screen.TeamOwnerDashboard:
        return 'Team Owner Dashboard';
      case Screen.ProjectList:
        return 'Project Portfolio';
      case Screen.DealList:
        return 'Deals (PM View)';
      case Screen.CreateProjectFromDeal:
        return 'Deal Handoff';
      case Screen.CreateDeal:
        return 'Create Deal';
       case Screen.CreateTask:
        return 'Tasks';
       case Screen.TaskList:
        return 'Task Monitor';
       case Screen.TaskDetail:
        return selectedTask ? `Task Details - ${selectedTask.id}`: 'Task Details';
      case Screen.TaskReviewList:
        return 'Tasks for Review';
      case Screen.TaskReview:
        return `Tasks`;
      case Screen.TaskTemplates:
        return 'Task Templates';
      case Screen.ProjectDetail:
        return selectedProject ? `${selectedProject.name} - ${selectedProject.company}` : 'Project Detail';
      case Screen.Companies:
        return 'Company List';
      case Screen.AgencyList:
        return 'Agency List';
      case Screen.AddNewCompany:
        return 'Add New Company';
      case Screen.AddNewAgency:
        return 'Add New Agency';
      case Screen.MyTasks:
        return 'Tasks Request';
      case Screen.TeamTasks:
          return 'Team Tasks';
      case Screen.Subtasks:
          return 'Subtasks';
      case Screen.SubtaskReviews:
          return 'Subtask Reviews';
      case Screen.TeamLeaderProfile:
          return 'Team Leader Profile';
      default:
        return 'Dashboard';
    }
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }
  
  const isTeamOwner = currentUser.role === 'Team Owner';
  const isTeamMember = currentUser.role === 'Team Member';
  const isSales = currentUser.role === 'Sales';
  const isPMCommandCenter = currentUser.role === 'Project Manager' && activeScreen === Screen.Dashboard;
  const teamMemberScreens = [Screen.TeamMemberDashboard, Screen.TeamMemberMyWork, Screen.TeamMemberReviews, Screen.TeamMemberProfile];
  const screensWithNoDefaultHeader = [Screen.Companies, Screen.AgencyList, Screen.TaskReview, Screen.TaskTemplates, Screen.TeamTasks, Screen.MyTasks, Screen.Subtasks, Screen.SubtaskReviews, Screen.TeamLeaderProfile, Screen.TeamMemberTaskDetail];
  const teamLeadScreens = [Screen.TeamTasks, Screen.MyTasks, Screen.Subtasks, Screen.SubtaskReviews, Screen.TeamLeaderProfile];

  return (
    <div className={`flex h-screen ${isTeamOwner || isPMCommandCenter ? 'bg-white' : isTeamMember ? 'bg-white' : 'bg-gray-100'} font-sans`}>
      <Sidebar 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {isSales ? (
            <SalesHeader currentUser={currentUser} onLogout={handleLogout} />
        ) : isTeamOwner ? (
            <TeamOwnerHeader title={getHeaderTitle()} currentUser={currentUser} onLogout={handleLogout} />
        ) : (
            !screensWithNoDefaultHeader.includes(activeScreen) ? <Header title={getHeaderTitle()} currentUser={currentUser} onLogout={handleLogout} /> : null
        )}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${teamLeadScreens.includes(activeScreen) || teamMemberScreens.includes(activeScreen) || activeScreen === Screen.CreateProjectFromDeal ? 'bg-gray-50' : (isTeamOwner || isPMCommandCenter) ? 'bg-white' : 'bg-gray-100'} ${isPMCommandCenter ? '' : 'p-4 sm:p-6 lg:p-8'}`}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;
