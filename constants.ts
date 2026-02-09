import { Project, Deal, Task, Risk, AuditLogEntry, User, Subtask, ActivityLogEntry, Agency, Company, ChatMessage, TaskForReview, UserRole, Attachment, TaskTemplate, TaskConversationMessage, TaskHistoryEntry, TeamLeadSubtask, SubtaskForReview, TeamMemberOverview, Escalation, AuditAction, Session, RecentActivity, NeedsActionItem, TeamMemberReview, DetailedTeamMemberReview, Invoice, PMActionItem, DeliveryCalendarItem } from './types';
import { ExclamationTriangleIcon, CheckCircleIcon, CreditCardIcon, UserCircleIcon, PlayIcon, PaperAirplaneIcon, PencilSquareIcon, XCircleIcon } from './components/icons';

export const userCredentials: Record<string, UserRole> = {
    'pm@dws.com': 'Project Manager',
    'lead@dws.com': 'Team Lead',
    'member@dws.com': 'Team Member',
    'buadmin@dws.com': 'BU Admin',
    'superadmin@dws.com': 'Super Admin',
    'sales@dws.com': 'Sales',
    'quality@dws.com': 'Quality',
};

export const STATIC_PASSWORD = '123456';

export const projectsData: Project[] = [
  {
    id: 'PRJ-2024-001',
    name: 'Enterprise System Migration',
    company: 'DWS',
    serviceType: 'SEO',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    teamOwner: 'Platform Team',
    status: 'Active',
    health: 'At Risk',
    progress: 35,
    startDate: 'Jan 15, 2024',
    endDate: 'Mar 30, 2024',
    budget: 125000,
    dealId: 'DEAL-001',
  },
   {
    id: 'PRJ-2024-009',
    name: 'ERP Modernization',
    company: 'Innovate Inc.',
    serviceType: 'Development',
    projectOwner: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarahchen' },
    teamOwner: 'Platform Team',
    status: 'Active',
    health: 'On Track',
    progress: 50,
    startDate: 'Jan 15, 2024',
    endDate: 'Jun 30, 2024',
    budget: 300000,
  },
  {
    id: 'PRJ-2024-010',
    name: 'Cloud Migration',
    company: 'Tech Solutions',
    serviceType: 'Infrastructure',
    projectOwner: { name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?u=michaeltorres' },
    teamOwner: 'Infra Team',
    status: 'Active',
    health: 'At Risk',
    progress: 20,
    startDate: 'Feb 01, 2024',
    endDate: 'May 31, 2024',
    budget: 150000,
  },
    {
    id: 'PRJ-2024-011',
    name: 'Security Enhancement',
    company: 'SecureNet',
    serviceType: 'Security',
    projectOwner: { name: 'Lisa Patel', avatar: 'https://i.pravatar.cc/150?u=lisapatel' },
    teamOwner: 'Security Team',
    status: 'On Hold',
    health: 'Delayed',
    progress: 10,
    startDate: 'Mar 01, 2024',
    endDate: 'Jul 31, 2024',
    budget: 200000,
  },
  {
    id: 'PRJ-2024-012',
    name: 'Compliance 2026',
    company: 'AuditFirm',
    serviceType: 'Consulting',
    projectOwner: { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=davidkim' },
    teamOwner: 'Security Team',
    status: 'Active',
    health: 'On Track',
    progress: 15,
    startDate: 'Jan 01, 2026',
    endDate: 'Mar 31, 2026',
    budget: 75000,
  },
  {
    id: 'PRJ-2024-002',
    name: 'Mobile App Redesign',
    company: 'FinanceHub Ltd',
    serviceType: 'Design',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    teamOwner: 'Design Team',
    status: 'Active',
    health: 'On Track',
    progress: 68,
    startDate: 'Feb 01, 2024',
    endDate: 'May 15, 2024',
    budget: 85000,
  },
  {
    id: 'PRJ-2024-003',
    name: 'Data Analytics Platform',
    company: 'RetailMax Co.',
    serviceType: 'Development',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    teamOwner: 'Engineering Team',
    status: 'On Hold',
    health: 'Delayed',
    progress: 42,
    startDate: 'Dec 10, 2023',
    endDate: 'Apr 20, 2024',
    budget: 210000,
  },
  {
    id: 'PRJ-2024-004',
    name: 'Cloud Infrastructure Setup',
    company: 'GlobalTech Solutions',
    serviceType: 'Implementation',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
    teamOwner: 'Infrastructure Team',
    status: 'Active',
    health: 'On Track',
    progress: 55,
    startDate: 'Jan 20, 2024',
    endDate: 'Jun 10, 2024',
    budget: 175000,
  },
  {
    id: 'PRJ-2024-005',
    name: 'Security Audit & Compliance',
    company: 'SecureBank Group',
    serviceType: 'Consulting',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    teamOwner: 'Security Team',
    status: 'Active',
    health: 'At Risk',
    progress: 28,
    startDate: 'Feb 15, 2024',
    endDate: 'Apr 05, 2024',
    budget: 95000,
  },
  {
    id: 'PRJ-2024-006',
    name: 'E-commerce Platform Upgrade',
    company: 'ShopNow Inc.',
    serviceType: 'Development',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
    teamOwner: 'Platform Team',
    status: 'Active',
    health: 'On Track',
    progress: 72,
    startDate: 'Jan 05, 2024',
    endDate: 'May 25, 2024',
    budget: 145000,
  },
  {
    id: 'PRJ-2024-007',
    name: 'Marketing Automation System',
    company: 'AdVenture Media',
    serviceType: 'Implementation',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
    teamOwner: 'Platform Team',
    status: 'Active',
    health: 'Delayed',
    progress: 48,
    startDate: 'Feb 10, 2024',
    endDate: 'May 05, 2024',
    budget: 68000,
  },
  {
    id: 'PRJ-2024-008',
    name: 'Customer Portal Development',
    company: 'ServiceFirst Ltd',
    serviceType: 'Development',
    projectOwner: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d' },
    teamOwner: 'Engineering Team',
    status: 'Active',
    health: 'On Track',
    progress: 82,
    startDate: 'Jan 12, 2024',
    endDate: 'Apr 18, 2024',
    budget: 92000,
  },
];


export const dealsData: Deal[] = [
  {
    id: 'DEAL-ACME-01',
    dealName: 'Acme Corporation',
    company: 'Acme Corporation',
    clientDetails: {
      name: 'Acme Corporation',
      url: 'www.acmecorp.com',
      email: 'contact@acmecorp.com',
      phone: '123-456-7890',
    },
    services: [
        { id: 'serv-01', name: 'SEO', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-02', name: 'Web Redesign', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-03', name: 'Content', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-04', name: 'Support', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
    ],
    saleType: 'New Sale',
    salesPerson: { name: 'Sarah Mitchell', email: 'sarah.mitchell@dws.com' },
    projectManager: { name: 'PM User', email: 'pm@dws.com' },
    budget: 145000,
    startDate: 'Jan 15, 2024',
    advancePayment: 'Paid',
    invoiceId: 'INV-2024-101',
    status: 'New',
    introCallStatus: 'Pending',
    riskLevel: 'High Risk',
    currency: 'USD',
  },
  {
    id: 'DEAL-TECH-02',
    dealName: 'TechStart Inc',
    company: 'TechStart Inc',
    clientDetails: {
      name: 'TechStart Inc',
      url: 'www.techstart.io',
      email: 'contact@techstart.io',
      phone: '123-456-7890',
    },
    services: [
        { id: 'serv-01', name: 'Service 1', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-02', name: 'Service 2', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-03', name: 'Service 3', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
    ],
    saleType: 'New Sale',
    salesPerson: { name: 'Michael Chen', email: 'michael.chen@dws.com' },
    projectManager: { name: 'PM User', email: 'pm@dws.com' },
    budget: 89500,
    startDate: 'Jan 18, 2024',
    advancePayment: 'Paid',
    invoiceId: 'INV-2024-102',
    status: 'New',
    introCallStatus: 'Done',
    introCallDateTime: 'Jan 22, 2024 • 10:00 AM PST',
    riskLevel: 'Medium Risk',
    currency: 'USD',
  },
  {
    id: 'DEAL-GLOBAL-03',
    dealName: 'GlobalTech Solutions',
    company: 'GlobalTech Solutions',
    clientDetails: {
      name: 'GlobalTech Solutions',
      url: 'www.globaltech.com',
      email: 'contact@globaltech.com',
      phone: '123-456-7890',
    },
    services: [
        { id: 'serv-01', name: 'Service 1', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-02', name: 'Service 2', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-03', name: 'Service 3', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-04', name: 'Service 4', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 'serv-05', name: 'Service 5', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
    ],
    saleType: 'Upsell',
    salesPerson: { name: 'Sarah Mitchell', email: 'sarah.mitchell@dws.com' },
    projectManager: { name: 'PM User', email: 'pm@dws.com' },
    budget: 225000,
    startDate: 'Jan 5, 2024',
    advancePayment: 'Paid',
    invoiceId: 'INV-2024-103',
    status: 'Converted',
    introCallStatus: 'Done',
    introCallDateTime: 'Jan 10, 2024 • 2:00 PM EST',
    riskLevel: 'Low Risk',
    currency: 'USD',
  },
  {
    id: 'DEAL-FIN-04',
    dealName: 'FinanceHub Ltd',
    company: 'FinanceHub Ltd',
    clientDetails: {
      name: 'FinanceHub Ltd',
      url: 'www.financehub.co',
      email: 'contact@financehub.co',
      phone: '123-456-7890',
    },
    services: [
        { id: 's1', name: 's1', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's2', name: 's2', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's3', name: 's3', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's4', name: 's4', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's5', name: 's5', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's6', name: 's6', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
    ],
    saleType: 'New Sale',
    salesPerson: { name: 'David Rodriguez', email: 'david.r@dws.com' },
    projectManager: { name: 'PM User', email: 'pm@dws.com' },
    budget: 310000,
    startDate: 'Jan 20, 2024',
    advancePayment: 'Not Paid',
    invoiceId: '-',
    status: 'New',
    introCallStatus: 'Pending',
    riskLevel: 'High Risk',
    currency: 'USD',
  },
  {
    id: 'DEAL-DESIGN-05',
    dealName: 'DesignStudio Pro',
    company: 'DesignStudio Pro',
    clientDetails: {
      name: 'DesignStudio Pro',
      url: 'www.designstudio.pro',
      email: 'contact@designstudio.pro',
      phone: '123-456-7890',
    },
    services: [
        { id: 's1', name: 's1', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
        { id: 's2', name: 's2', description: '', billingType: 'Fixed Price', amount: 0, startDate: '', endDate: '', status: 'Ready' },
    ],
    saleType: 'Winback',
    salesPerson: { name: 'Emily Johnson', email: 'emily.j@dws.com' },
    projectManager: { name: 'PM User', email: 'pm@dws.com' },
    budget: 52000,
    startDate: 'Jan 23, 2024',
    advancePayment: 'Paid',
    invoiceId: 'INV-2024-105',
    status: 'New',
    introCallStatus: 'Done',
    introCallDateTime: 'Jan 25, 2024 • 3:30 PM GMT',
    riskLevel: 'Low Risk',
    currency: 'USD',
  },
];

export const salesNeedsActionData: NeedsActionItem[] = [
  { id: 'na-1', clientName: 'FinanceHub Ltd', issue: 'Missing info', lastUpdated: '2 days ago', dealId: 'DEAL-FIN-04' },
  { id: 'na-2', clientName: 'TechStart Inc', issue: 'Rejected by PM', lastUpdated: '1 day ago', dealId: 'DEAL-TECH-02' },
  { id: 'na-3', clientName: 'Acme Corporation', issue: 'Not submitted', lastUpdated: '5 hours ago', dealId: 'DEAL-ACME-01' },
  { id: 'na-4', clientName: 'GlobalTech Solutions', issue: 'Missing info', lastUpdated: '3 days ago', dealId: 'DEAL-GLOBAL-03' },
  { id: 'na-5', clientName: 'DesignStudio Pro', issue: 'Not submitted', lastUpdated: '1 hour ago', dealId: 'DEAL-DESIGN-05' },
];

export const salesRecentDealsData: Deal[] = dealsData.slice(0, 5);

export const usersData: User[] = [
    { id: 'U-000', name: 'John Anderson', role: 'Team Owner', avatar: 'https://i.pravatar.cc/150?u=lead@dws.com', department: 'Management' },
    { id: 'U-001', name: 'John Davis', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=U-001', department: 'Engineering' },
    { id: 'U-002', name: 'Sarah Chen', role: 'Designer', avatar: 'https://i.pravatar.cc/150?u=U-002', department: 'Design' },
    { id: 'U-003', name: 'Michael Torres', role: 'SEO Specialist', avatar: 'https://i.pravatar.cc/150?u=U-003', department: 'Marketing' },
    { id: 'U-004', name: 'David Park', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=U-004', department: 'Engineering' },
    { id: 'U-005', name: 'Emily Watson', role: 'Security Analyst', avatar: 'https://i.pravatar.cc/150?u=U-005', department: 'Engineering' },
    { id: 'U-006', name: 'Alex Kumar', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=U-006', department: 'Engineering' },
    { id: 'U-007', name: 'Lisa Martinez', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?u=U-007', department: 'Marketing' },
    { id: 'U-008', name: 'Ryan Thompson', role: 'QA Engineer', avatar: 'https://i.pravatar.cc/150?u=U-008', department: 'Engineering' },
    { id: 'U-009', name: 'Sarah Mitchell', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=U-009', department: 'Management'},
    { id: 'U-010', name: 'Marcus Chen', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=U-010', department: 'Engineering'},
    { id: 'U-011', name: 'Marcus Rivera', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=marcusrivera', department: 'Engineering' },
    { id: 'U-012', name: 'James Wilson', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=jameswilson', department: 'Engineering' },
    { id: 'U-013', name: 'Emma Thompson', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=emmathompson', department: 'Engineering' },
    { id: 'U-014', name: 'Ryan Martinez', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=ryanmartinez', department: 'Engineering' },
    { id: 'U-015', name: 'Mike Johnson', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=mikejohnson', department: 'Engineering' },
    { id: 'U-016', name: 'Emily Rodriguez', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=emilyrodriguez', department: 'Engineering' },
    { id: 'U-017', name: 'David Kim', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=davidkimpark', department: 'Engineering' },
];

const findUser = (name: string) => usersData.find(u => u.name === name)!;


export const detailedTasksData: Task[] = [
    { id: 'TSK-2847', name: 'Database Schema Validation', project: 'ERP Modernization', company: 'DWS', assignees: [findUser('Marcus Rivera')], status: 'Blocked', priority: 'High', dueDate: 'Mar 28, 2024', progress: 25, lastUpdated: '2 hours ago', dependencies: {type: 'Blocked', count: 1}},
    { id: 'TSK-2851', name: 'Frontend Component Refactor', project: 'Cloud Migration', company: 'FinanceHub Ltd', assignees: [findUser('James Wilson')], status: 'Submitted for Review', priority: 'High', dueDate: 'Today', progress: 100, lastUpdated: '45 mins ago', dependencies: {type: 'Free', count: 0}},
    { id: 'TSK-2855', name: 'API Rate Limiting', project: 'Security Enhancement', company: 'RetailMax Co.', assignees: [findUser('Emma Thompson')], status: 'Not Started', priority: 'Medium', dueDate: 'Apr 02, 2024', progress: 0, lastUpdated: 'Yesterday', dependencies: {type: 'Free', count: 0}},
    { id: 'TSK-2859', name: 'Load Testing Configuration', project: 'Cloud Migration', company: 'GlobalTech Solutions', assignees: [findUser('Ryan Martinez')], status: 'In Progress', priority: 'High', dueDate: 'Mar 25, 2024', progress: 42, lastUpdated: '5 hours ago', dependencies: {type: 'Free', count: 0}, timeLogged: 27000, attachments: [{id: 'att-1', name: 'Security_Scan_Report.pdf', size: '1.2 MB', type: 'pdf'}, {id: 'att-2', name: 'pentest_results.zip', size: '15.8 MB', type: 'zip'}] },
    { id: 'TSK-2024-1051', name: 'Payment Gateway Integration', project: 'E-commerce Platform Upgrade', company: 'ShopNow Inc.', assignees: [findUser('Ryan Thompson')], status: 'In Progress', priority: 'Medium', dueDate: 'Apr 08, 2024', progress: 78, lastUpdated: '1 hour ago', dependencies: {type: 'Free', count: 0}, timeLogged: 14400 },
    { id: 'TSK-2024-1052', name: 'Email Campaign Setup', project: 'Marketing Automation System', company: 'AdVenture Media', assignees: [findUser('Lisa Martinez')], status: 'Blocked', priority: 'Low', dueDate: 'Apr 15, 2024', progress: 35, lastUpdated: '3 hours ago', dependencies: {type: 'Blocked', count: 1}},
    { id: 'TSK-2024-1053', name: 'UI Component Library', project: 'Customer Portal Development', company: 'ServiceFirst Ltd', assignees: [findUser('David Park')], status: 'Completed', priority: 'Medium', dueDate: 'Mar 22, 2024', progress: 100, lastUpdated: 'Yesterday', dependencies: {type: 'Free', count: 0}, rating: 5, timeLogged: 28800, attachments: [{id: 'att-3', name: 'Component_Designs.png', size: '4.5 MB', type: 'image'}]},
    { id: 'TSK-2024-1054', name: 'Load Testing & Performance Optimization', project: 'Enterprise System Migration', company: 'DWS', assignees: [findUser('John Davis')], status: 'In Progress', priority: 'High', dueDate: 'Today', progress: 52, lastUpdated: '30 mins ago', dependencies: {type: 'Free', count: 0}},
    { id: 'TSK-2024-1055', name: 'Compliance Documentation Review', project: 'Security Audit & Compliance', company: 'SecureBank Group', assignees: [findUser('Emily Watson')], status: 'Not Started', priority: 'Low', dueDate: 'Apr 12, 2024', progress: 0, lastUpdated: '2 days ago', dependencies: {type: 'Blocked', count: 1}},
    { id: 'TSK-2024-1056', name: 'Data Warehouse Configuration', project: 'Data Analytics Platform', company: 'RetailMax Co.', assignees: [findUser('Michael Torres')], status: 'Completed', priority: 'Medium', dueDate: 'Mar 26, 2024', progress: 100, lastUpdated: '4 hours ago', dependencies: {type: 'Free', count: 0}, rating: 4},
    { id: 'TSK-2024-1057', name: 'Deploy to Staging Environment', project: 'E-commerce Platform Upgrade', company: 'ShopNow Inc.', assignees: [findUser('Ryan Thompson')], status: 'Submitted for Review', priority: 'High', dueDate: 'Tomorrow', progress: 100, lastUpdated: '1 hour ago', dependencies: {type: 'Free', count: 0}},
    { id: 'TSK-2024-1058', name: 'Final UAT Sign-off Documentation', project: 'Customer Portal Development', company: 'ServiceFirst Ltd', assignees: [findUser('David Park')], status: 'Submitted for Review', priority: 'Medium', dueDate: 'In 3 days', progress: 100, lastUpdated: 'Yesterday', dependencies: {type: 'Free', count: 0}},
];


// Mock data for a single task detail view
export const subtasksData: Subtask[] = [
    { id: 'ST-01', name: 'Initial research and discovery', status: 'Completed' },
    { id: 'ST-02', name: 'Wireframing and user flows', status: 'Completed' },
    { id: 'ST-03', name: 'High-fidelity UI mockups', status: 'Completed' },
    { id: 'ST-04', name: 'Prototype development', status: 'Completed' },
    { id: 'ST-05', name: 'Frontend development - Phase 1', status: 'Completed' },
    { id: 'ST-06', name: 'Backend API integration', status: 'Completed' },
    { id: 'ST-07', name: 'Performance Optimization & Testing', status: 'In Progress', owner: 'Marcus Chen', dueDate: 'Feb 20, 2024' },
    { id: 'ST-08', name: 'Client feedback and revisions', status: 'Pending' },
    { id: 'ST-09', name: 'Final deployment', status: 'Pending' },
];

export const taskRisksData: Risk[] = [
    { id: 'R-003', type: 'Issue', title: 'API Integration Delays', description: 'Backend API endpoints not ready as per schedule, causing frontend integration delays.', owner: { name: 'Marcus Chen'}, date: 'Feb 8, 2024', assignee: 'Project Lead', status: 'Open' },
    { id: 'R-004', type: 'Risk', title: 'Browser Compatibility Issues', description: 'Layout breaking in Safari 15.5, requires additional testing and fixes.', owner: { name: 'Marcus Chen'}, date: 'Feb 12, 2024', assignee: 'QA Team', status: 'Open' },
]

export const activityLogDataForTask: ActivityLogEntry[] = [
    { id: 'ACT-001', type: 'Issue', icon: ExclamationTriangleIcon, title: 'Issue Raised', description: 'Browser compatibility issue reported by Marcus Chen', timestamp: 'Feb 12, 2024 at 3:45 PM' },
    { id: 'ACT-002', type: 'Subtask', icon: CheckCircleIcon, title: 'Subtask Completed', description: 'Mobile responsive implementation completed', timestamp: 'Feb 11, 2024 at 5:00 PM', author: 'Sarah Mitchell' },
    { id: 'ACT-003', type: 'Invoice', icon: CreditCardIcon, title: 'Invoice Linked', description: 'Invoice INV-2024-234 linked to task', timestamp: 'Feb 10, 2024 at 10:15 AM' },
    { id: 'ACT-004', type: 'Issue', icon: ExclamationTriangleIcon, title: 'Issue Raised', description: 'API response delays reported by Sarah Mitchell', timestamp: 'Feb 8, 2024 at 2:30 PM' },
    { id: 'ACT-005', type: 'OwnerChange', icon: UserCircleIcon, title: 'Owner Changed', description: 'Task owner changed from John Doe to Sarah Mitchell', timestamp: 'Feb 2, 2024 at 11:00 AM' },
    { id: 'ACT-006', type: 'TaskStarted', icon: PlayIcon, title: 'Task Started', description: 'Task status changed to Active', timestamp: 'Jan 15, 2024 at 9:00 AM' },
]
export const recentActivityData: RecentActivity[] = [
  { id: 'act-1', icon: PaperAirplaneIcon, iconBg: 'bg-blue-500', title: 'Task Submitted', description: 'Alex Kumar submitted "API Integration - User Auth Module"', time: '15 mins ago' },
  { id: 'act-2', icon: UserCircleIcon, iconBg: 'bg-purple-500', title: 'Owner Changed', description: 'Task "Database Schema Validation" assigned to Marcus Rivera', time: '1 hour ago' },
  { id: 'act-3', icon: CheckCircleIcon, iconBg: 'bg-green-500', title: 'Task Approved', description: '"Security Audit Documentation" was approved by David Kim', time: '3 hours ago' },
  { id: 'act-4', icon: XCircleIcon, iconBg: 'bg-red-500', title: 'Task Rejected', description: '"API Integration Testing" was rejected for rework', time: 'Yesterday' },
];
export const auditLogData: AuditLogEntry[] = [
    { id: 'ADL-001', type: 'StatusChange', description: 'Project status changed from On Hold to Active.', date: 'Feb 2, 2024 at 11:00 AM' },
    { id: 'ADL-002', type: 'OwnerChange', description: 'Project owner changed from John Doe to Sarah Mitchell.', date: 'Feb 2, 2024 at 11:00 AM' },
    { id: 'ADL-003', type: 'TimelineUpdate', description: 'End date was changed from Mar 15 to Mar 30, 2024.', date: 'Feb 5, 2024 at 2:00 PM' },
    { id: 'ADL-004', type: 'TaskCompleted', description: 'Task "Initial research and discovery" marked as complete.', date: 'Feb 6, 2024 at 4:30 PM' },
    { id: 'ADL-005', type: 'RiskEscalated', description: 'New risk "API Integration Delays" was added.', date: 'Feb 8, 2024 at 9:15 AM' },
    { id: 'ADL-006', type: 'NewTask', description: 'New task "Client feedback and revisions" was added.', date: 'Feb 10, 2024 at 10:00 AM' },
];


export const companiesAndAgenciesData: (Agency | Company)[] = [
  {
    id: 'agency-1',
    name: 'Global Marketing Agency',
    type: 'Agency',
    status: 'Active',
    companyCount: 4,
    dealCount: 12,
    projectCount: 18,
    accountOwner: 'Sarah Johnson',
    totalValue: '$1.8M',
    companies: [
      {
        id: 'comp-1',
        name: 'DWS (Digital Web Solutions)',
        type: 'Company',
        status: 'Active',
        industry: 'Technology & Software',
        dealCount: 3,
        projectCount: 5,
        totalValue: '$580K',
        accountOwner: '',
        deals: [
          {
            id: 'deal-1-1',
            name: 'DEAL-2401: CRM Integration Services',
            status: 'Active',
            signedDate: '10/01/2024',
            duration: '6 months',
            projectCount: 2,
            projects: [
              { id: 'proj-1-1-1', name: 'CRM Integration Phase 1', team: 'Team Alpha', progress: 85, status: 'On Track' },
              { id: 'proj-1-1-2', name: 'CRM Integration Phase 2', team: 'Team Alpha', progress: 65, status: 'On Track' },
            ]
          },
          {
            id: 'deal-1-2',
            name: 'DEAL-2198: Cloud Infrastructure',
            status: 'Active',
            signedDate: '25/01/2024',
            duration: '8 months',
            projectCount: 1,
            projects: []
          },
          {
            id: 'deal-1-3',
            name: 'DEAL-2402: Mobile Development',
            status: 'On Hold',
            signedDate: '12/02/2024',
            duration: '4 months',
            projectCount: 2,
            projects: []
          }
        ]
      },
      { id: 'comp-2', name: 'Digital Dynamics Corp.', type: 'Company', status: 'Active', industry: 'E-commerce', dealCount: 2, projectCount: 3, totalValue: '$420K', accountOwner: '' },
      { id: 'comp-3', name: 'BrandBoost Solutions', type: 'Company', status: 'Active', industry: 'Marketing', dealCount: 4, projectCount: 6, totalValue: '$620K', accountOwner: '' },
      { id: 'comp-4', name: 'Creative Minds Ltd', type: 'Company', status: 'Active', industry: 'Design & Creative', dealCount: 3, projectCount: 4, totalValue: '$280K', accountOwner: '' },
    ]
  },
  {
    id: 'agency-2',
    name: 'Enterprise Solutions Group',
    type: 'Agency',
    status: 'Active',
    companyCount: 3,
    dealCount: 8,
    projectCount: 12,
    accountOwner: 'David Martinez',
    totalValue: '$1.2M',
    companies: [
      { id: 'comp-5', name: 'FinTech Innovations Inc', type: 'Company', status: 'Active', industry: 'Finance & Banking', dealCount: 3, projectCount: 5, totalValue: '$680K', accountOwner: '' },
      { id: 'comp-6', name: 'Healthcare Systems Corp', type: 'Company', status: 'Active', industry: 'Healthcare', dealCount: 2, projectCount: 3, totalValue: '$320K', accountOwner: '' },
      { id: 'comp-7', name: 'Manufacturing Plus Ltd', type: 'Company', status: 'Active', industry: 'Manufacturing', dealCount: 3, projectCount: 4, totalValue: '$200K', accountOwner: '' },
    ]
  },
  { id: 'comp-8', name: 'RetailTech Solutions', type: 'Company', status: 'Active', industry: 'Retail & E-commerce', dealCount: 5, projectCount: 8, totalValue: '$920K', accountOwner: 'Emily Roberts' },
  { id: 'comp-9', name: 'DataStream Analytics', type: 'Company', status: 'On Hold', industry: 'Data & Analytics', dealCount: 2, projectCount: 3, totalValue: '$450K', accountOwner: 'Michael Chen' },
  { id: 'agency-3', name: 'Digital Transformation Partners', type: 'Agency', status: 'Active', companyCount: 2, dealCount: 6, projectCount: 9, totalValue: '$780K', accountOwner: 'Lisa Anderson', companies: [] },
];

export const chatData: ChatMessage[] = [
  {
    id: 'msg-1',
    author: { name: 'Sarah Mitchell', avatar: 'https://i.pravatar.cc/150?u=U-009' },
    message: 'Hey team, just wanted to check on the progress for the on-page optimization tasks. Are we on track to complete by EOD Friday?',
    timestamp: '10:30 AM',
  },
  {
    id: 'msg-2',
    author: { name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    message: 'Hi Sarah, I\'ve completed the keyword mapping for the first 20 pages. The rest should be done by tomorrow afternoon.',
    timestamp: '10:32 AM',
  },
  {
    id: 'msg-3',
    author: { name: 'John Davis', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    message: 'I\'ve hit a small snag with the meta descriptions for the product pages. The current CMS is trimming them. Can someone from the dev team take a look?',
    timestamp: '10:35 AM',
  },
  {
    id: 'msg-4',
    author: { name: 'Sarah Mitchell', avatar: 'https://i.pravatar.cc/150?u=U-009' },
    message: 'Thanks for the update, Michael. @John Davis, let\'s loop in a dev. I\'ll create a sub-task for it now.',
    timestamp: '10:36 AM',
  },
];

export const taskForReviewData: TaskForReview = {
  ...detailedTasksData[1],
  id: 'TASK-2401-042',
  name: 'API Integration - User Authentication Module',
  submittedDate: 'May 15, 2024',
  completionDate: 'May 15, 2024 14:30',
  createdBy: 'Sarah Johnson',
  createdDate: 'April 28, 2024',
  lastModified: 'May 15, 2024 14:30',
  timeTracked: '38.5 hours',
  dependenciesList: [
    { id: 'TASK-2401-038', name: 'Database Schema Setup', status: 'Done' },
    { id: 'TASK-2401-040', name: 'Email Service Integration', status: 'Done' },
  ],
  attachments: [
    { id: 'att-1', name: 'API_Documentation.pdf', size: '2.4 MB', type: 'pdf' },
    { id: 'att-2', name: 'test_results.html', size: '156 KB', type: 'html' },
    { id: 'att-3', name: 'postman_collection.json', size: '48 KB', type: 'json' },
  ],
  reviewActivityLog: [
    { id: 'act-1', icon: PaperAirplaneIcon, text: 'Task submitted for review', time: 'May 15, 2024 14:30' },
    { id: 'act-2', icon: PencilSquareIcon, text: 'Task updated by David Martinez', time: 'May 15, 2024 14:15' },
    { id: 'act-3', icon: CheckCircleIcon, text: 'Tests completed - 95% coverage', time: 'May 14, 2024 16:20' },
    { id: 'act-4', icon: XCircleIcon, text: 'Task rejected - tests required', time: 'May 08, 2024 16:45' },
  ],
  executionSummary: [
    'User authentication API endpoints implemented',
    'JWT token generation and validation completed',
    'Password encryption using bcrypt integrated',
    'Unit tests written with 95% coverage',
    'Documentation updated in Confluence',
  ],
  description: 'Implement user authentication module for the DWS system including login, logout, token management, and password reset functionality. The module should use JWT tokens for session management and integrate with the existing user database. All endpoints must be RESTful and follow the API design guidelines documented in the project wiki.',
  acceptanceCriteria: [
    'Login endpoint returns JWT token on successful authentication',
    'Token validation middleware protects all authenticated routes',
    'Password reset flow sends email with secure token',
    'All passwords stored using bcrypt with minimum 10 rounds',
    'Unit test coverage above 90%',
  ],
  reviewHistory: [
    {
      id: 'rh-1',
      date: 'May 08, 2024 16:45',
      reviewer: 'Sarah Johnson',
      rating: null,
      comment: 'Missing unit tests for password reset flow. Please add comprehensive test coverage.',
      outcome: 'Rejected',
    },
  ],
};

export const taskTemplatesData: TaskTemplate[] = [
    {
        id: 'TPL-001', name: 'Client Dispute Resolution', department: 'Quality', stepCount: 4, typicalDuration: '3 Days', status: 'Active',
        description: 'Standard workflow for handling and timely resolution of customer disputes while maintaining audit compliance.',
        steps: [
            { stepNumber: 1, title: 'Investigate Client Dispute', ownerType: 'Team Owner', estimatedTime: '24 hrs', dependencies: 'No Dependencies', description: 'The client has raised a dispute. Find the reason and try to resolve this. Discuss the case with Management.' },
            { stepNumber: 2, title: 'Create Dispute Case File', ownerType: 'Team Owner', estimatedTime: '12 hrs', dependencies: 'Depends on: Step 1', description: 'Compile all relevant documentation and evidence for the dispute case. Ensure all required documents are collected and properly formatted.', requiredOutputs: ['Client communication PDF', 'Payment receipts PDF', 'Policy / T&C signed copy'] },
            { stepNumber: 3, title: 'Approve Case', ownerType: 'Project Owner', estimatedTime: '8 hrs', dependencies: 'Depends on: Step 2', description: 'Review the compiled case file for completeness and accuracy. Verify all documentation meets quality standards and approve for submission.' },
            { stepNumber: 4, title: 'Submit Case', ownerType: 'Project Owner', estimatedTime: '4 hrs', dependencies: 'Depends on: Step 3', description: 'Submit the approved case file to the appropriate resolution authority or department for final processing and client communication.' },
        ]
    },
    { id: 'TPL-002', name: 'Content Publishing Flow', department: 'Marketing', stepCount: 3, typicalDuration: '2 Days', status: 'Active' },
    { id: 'TPL-003', name: 'Security Incident Response', department: 'Engineering', stepCount: 5, typicalDuration: '1 Day', status: 'Active' },
    { id: 'TPL-004', name: 'Invoice Processing & Payment', department: 'Finance', stepCount: 4, typicalDuration: '5 Days', status: 'Active' },
    { id: 'TPL-005', name: 'Customer Onboarding Process', department: 'Customer Success', stepCount: 6, typicalDuration: '7 Days', status: 'Active' },
    { id: 'TPL-006', name: 'Code Review & Deployment', department: 'Engineering', stepCount: 4, typicalDuration: '1 Day', status: 'Active' },
    { id: 'TPL-007', name: 'Vendor Contract Review', department: 'Operations', stepCount: 5, typicalDuration: '10 Days', status: 'Active' },
    { id: 'TPL-008', name: 'Product Launch Checklist', department: 'Marketing', stepCount: 7, typicalDuration: '14 Days', status: 'Active' },
    { id: 'TPL-009', name: 'Quality Audit Process', department: 'Quality', stepCount: 6, typicalDuration: '4 Days', status: 'Active' },
    { id: 'TPL-010', name: 'Employee Exit Process', department: 'Operations', stepCount: 5, typicalDuration: '3 Days', status: 'Archived' },
];


// --- DATA FOR TEAM LEAD VIEW ---

const getProjectByName = (projectName: string) => {
    return projectsData.find(p => p.name === projectName);
};

export const teamLeadTasksData: Task[] = detailedTasksData.map((task, index) => {
    const project = getProjectByName(task.project);
    const executionStatuses: Task['executionStatus'][] = ['Not Started', 'In Progress', 'Blocked', 'Rework', 'Completed', 'Waiting'];
    const approvalStatuses: Task['approvalStatus'][] = ['Pending', 'Approved', 'Clarification'];
    const reviewStatuses: Task['reviewStatus'][] = ['Not Submitted', 'Submitted', 'Rejected', 'Approved'];
    const timerStatuses: Task['timerStatus'][] = ['Stopped', 'Paused', 'Running'];
    
    let executionStatus: Task['executionStatus'] = 'In Progress';
    if (task.status === 'Not Started') executionStatus = 'Not Started';
    if (task.status === 'Blocked') executionStatus = 'Blocked';
    if (task.status === 'Completed') executionStatus = 'Completed';
    if (index % 5 === 0 && task.status !== 'Completed' && task.status !== 'Not Started') executionStatus = 'Rework';

    let reviewStatus: Task['reviewStatus'] = 'Not Submitted';
    if (task.status === 'Submitted for Review') reviewStatus = 'Submitted';
    if (task.status === 'Completed') reviewStatus = 'Approved';
    if (executionStatus === 'Rework') reviewStatus = 'Rejected';

    // Override first few items to match screenshot
    if (task.id === 'TSK-2847') {
        return {
            ...task,
            pm: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarahchen' },
            approvalStatus: 'Approved',
            executionStatus: 'Blocked',
            timerStatus: 'Stopped',
            timeLogged: 22800, // 6h 20m
        };
    }
    if (task.id === 'TSK-2851') {
         return {
            ...task,
            pm: { name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?u=michaeltorres' },
            approvalStatus: 'Approved',
            executionStatus: 'Rework',
            timerStatus: 'Paused',
            timeLogged: 42300, // 11h 45m
        };
    }
     if (task.id === 'TSK-2855') {
         return {
            ...task,
            assignees: [findUser('Emma Thompson'), findUser('Alex Kumar')],
            pm: { name: 'Lisa Patel', avatar: 'https://i.pravatar.cc/150?u=lisapatel' },
            approvalStatus: 'Pending',
            executionStatus: 'Waiting',
            timerStatus: 'Stopped',
            timeLogged: 15300, // 4h 15m
        };
    }
     if (task.id === 'TSK-2859') {
         return {
            ...task,
            pm: { name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?u=michaeltorres' },
            approvalStatus: 'Approved',
            executionStatus: 'In Progress',
            timerStatus: 'Running',
            timeLogged: 27000, // 7h 30m
        };
    }


    return {
        ...task,
        pm: project ? project.projectOwner : { name: 'N/A', avatar: '' },
        approvalStatus: approvalStatuses[index % approvalStatuses.length],
        executionStatus: executionStatus,
        timerStatus: timerStatuses[index % timerStatuses.length],
        qualityFlag: task.qualityFlag || (index % 4 === 0 ? 'Red' : (index % 7 === 0 ? 'No Flag' : 'Green')),
        reviewStatus: reviewStatus,
    };
});

export const conversationData: TaskConversationMessage[] = [
    { id: 'c1', sender: { name: 'System', role: 'Super Admin' }, timestamp: 'May 16, 2024 at 09:00 AM', message: 'Task submitted for review by Alex Kumar.', type: 'System' },
    { id: 'c2', sender: { name: 'Sarah Johnson', role: 'Project Manager' }, timestamp: 'May 16, 2024 at 10:15 AM', message: '@TeamLead please check the attached API documentation. The client has requested a change in the endpoint structure.', type: 'User' },
    { id: 'c3', sender: { name: 'System', role: 'Super Admin' }, timestamp: 'May 16, 2024 at 11:30 AM', message: 'Review rejected by Quality.', type: 'System' },
    { id: 'c4', sender: { name: 'lead@dws.com', role: 'Team Lead' }, timestamp: 'May 16, 2024 at 11:45 AM', message: '@PM I see the rejection. The team will start rework based on the feedback. The schema definition was incorrect.', type: 'User' },
    { id: 'c5', sender: { name: 'System', role: 'Super Admin' }, timestamp: 'May 16, 2024 at 11:46 AM', message: 'Task status changed to Rework by Team Lead.', type: 'System' },
];

export const taskHistoryData: TaskHistoryEntry[] = [
    { id: 'h1', timestamp: 'May 16, 09:00 AM', description: 'Status changed from In Progress to Submitted for Review', user: 'Alex Kumar' },
    { id: 'h2', timestamp: 'May 16, 11:30 AM', description: 'Review was rejected by Sarah Johnson (Quality)', user: 'System' },
    { id: 'h3', timestamp: 'May 16, 11:46 AM', description: 'Status changed from Submitted for Review to Rework', user: 'Team Lead' },
    { id: 'h4', timestamp: 'May 15, 02:20 PM', description: 'Timer stopped. Logged 02:15:30.', user: 'Alex Kumar' },
    { id: 'h5', timestamp: 'May 15, 12:05 PM', description: 'Timer started.', user: 'Alex Kumar' },
];


const commonTaskFields = {
    company: 'DWS',
    assignees: [findUser('John Anderson')],
    progress: 0,
    lastUpdated: '1d ago',
    dependencies: {type: 'Free' as 'Free', count: 0},
    priority: 'Medium' as 'Medium',
    status: 'Not Started' as 'Not Started',
};

export const myTasksData: Task[] = [
    { ...commonTaskFields, id: 'TSK-3001', name: 'Database Migration Phase 2', project: 'ERP Modernization', pm: { name: 'Sarah Chen', avatar: '' }, approvalStatus: 'Clarification', executionStatus: 'Blocked', timerStatus: 'Stopped', timeLogged: 45000, qualityFlag: 'Red', reviewStatus: 'Not Submitted', dueDate: 'Jan 28, 2026' },
    { ...commonTaskFields, id: 'TSK-3002', name: 'API Integration Testing', project: 'Cloud Migration', pm: { name: 'Michael Torres', avatar: '' }, approvalStatus: 'Approved', executionStatus: 'Rework', timerStatus: 'Paused', timeLogged: 29700, qualityFlag: 'Red', reviewStatus: 'Rejected', dueDate: 'Feb 02, 2026' },
    { ...commonTaskFields, id: 'TSK-3003', name: 'Security Audit Documentation', project: 'Compliance 2026', pm: { name: 'David Kim', avatar: '' }, approvalStatus: 'Approved', executionStatus: 'In Progress', timerStatus: 'Running', timeLogged: 20700, qualityFlag: 'Green', reviewStatus: 'Not Submitted', dueDate: 'Feb 05, 2026' },
    { ...commonTaskFields, id: 'TSK-3004', name: 'User Training Module Creation', project: 'ERP Modernization', pm: { name: 'Sarah Chen', avatar: '' }, approvalStatus: 'Approved', executionStatus: 'Completed', timerStatus: 'Stopped', timeLogged: 58800, qualityFlag: 'Green', reviewStatus: 'Approved', dueDate: 'Jan 25, 2026' },
    { ...commonTaskFields, id: 'TSK-3005', name: 'Performance Optimization Analysis', project: 'Cloud Migration', pm: { name: 'Michael Torres', avatar: '' }, approvalStatus: 'Pending', executionStatus: 'Not Started', timerStatus: 'Stopped', timeLogged: 0, qualityFlag: 'No Flag', reviewStatus: 'Not Submitted', dueDate: 'Feb 08, 2026' },
    { ...commonTaskFields, id: 'TSK-3006', name: 'Code Review - Authentication Module', project: 'Security Enhancement', pm: { name: 'Lisa Patel', avatar: '' }, approvalStatus: 'Approved', executionStatus: 'In Progress', timerStatus: 'Paused', timeLogged: 11400, qualityFlag: 'Green', reviewStatus: 'Not Submitted', dueDate: 'Jan 31, 2026' },
];

export const teamLeadSubtasksData: TeamLeadSubtask[] = [
    {
        id: 'SUB-4721',
        name: 'Map foreign key relationships',
        parentTask: { id: 'TSK-2847', name: 'Database Schema Validation' },
        assignee: findUser('Marcus Rivera'),
        approvalStatus: 'Pending',
        executionStatus: 'In Progress',
        timerStatus: 'Running',
        timeSpent: 9300, // 2h 35m
        qualityFlag: 'Green',
        deadline: 'Jan 28, 2026',
        outputRequirements: [
            { text: 'Complete mapping document of all foreign keys', completed: true },
            { text: 'Validation script for referential integrity', completed: false },
            { text: 'List of cascade rule translations', completed: false },
        ],
        dependencies: 'Must complete after: Export Oracle schema (SUB-4719)',
        attachments: [{ id: 'att-sub-1', name: 'oracle_fk_export.xlsx', size: '256 KB', type: 'xlsx' }],
    },
    {
        id: 'SUB-4724',
        name: 'Validate data integrity rules',
        parentTask: { id: 'TSK-2847', name: 'Database Schema Validation' },
        assignee: findUser('Marcus Rivera'),
        approvalStatus: 'Approved',
        executionStatus: 'Blocked',
        timerStatus: 'Stopped',
        timeSpent: 4800, // 1h 20m
        qualityFlag: 'L1',
        deadline: 'Jan 29, 2026',
        outputRequirements: [],
        dependencies: '',
        attachments: [],
    },
    {
        id: 'SUB-4725',
        name: 'Refactor header component',
        parentTask: { id: 'TSK-2851', name: 'Frontend Component Refactor' },
        assignee: findUser('James Wilson'),
        approvalStatus: 'Approved',
        executionStatus: 'Rework',
        timerStatus: 'Paused',
        timeSpent: 13500, // 3h 45m
        qualityFlag: 'L1',
        deadline: 'Jan 30, 2026',
        outputRequirements: [],
        dependencies: '',
        attachments: [],
    },
    {
        id: 'SUB-4728',
        name: 'Update navigation logic',
        parentTask: { id: 'TSK-2851', name: 'Frontend Component Refactor' },
        assignee: findUser('James Wilson'),
        approvalStatus: 'Approved',
        executionStatus: 'In Progress',
        timerStatus: 'Running',
        timeSpent: 15000, // 4h 10m
        qualityFlag: 'Green',
        deadline: 'Feb 02, 2026',
        outputRequirements: [],
        dependencies: '',
        attachments: [],
    },
    {
        id: 'SUB-4730',
        name: 'Implement request throttling',
        parentTask: { id: 'TSK-2855', name: 'API Rate Limiting' },
        assignee: findUser('Emma Thompson'),
        approvalStatus: 'Approved',
        executionStatus: 'Completed',
        timerStatus: 'Stopped',
        timeSpent: 18000, // 5h
        qualityFlag: 'Green',
        deadline: 'Jan 25, 2026',
        outputRequirements: [],
        dependencies: '',
        attachments: [],
    },
    {
        id: 'SUB-4731',
        name: 'Configure user-level limits',
        parentTask: { id: 'TSK-2855', name: 'API Rate Limiting' },
        assignee: findUser('Emma Thompson'),
        approvalStatus: 'Pending',
        executionStatus: 'Waiting',
        timerStatus: 'Stopped',
        timeSpent: 0,
        qualityFlag: 'No Flag',
        deadline: 'Feb 05, 2026',
        outputRequirements: [],
        dependencies: '',
        attachments: [],
    },
];

export const subtaskReviewData: SubtaskForReview[] = [
    { id: 'SUB-1247', name: 'User Authentication API', parentTask: 'Backend API Development', assignee: findUser('Mike Johnson'), completionDate: 'Jan 15, 2026', completionTime: '2:30 PM', timeSpent: '8.5h', reviewStatus: 'Pending Review', qualityFlag: 'Not Flagged', output: { type: 'files', value: '3 files' }, slaStatus: 'SLA: 2h overdue' },
    { id: 'SUB-1248', name: 'Button Component Design', parentTask: 'UI Component Library', assignee: findUser('Sarah Chen'), completionDate: 'Jan 16, 2026', completionTime: '10:15 AM', timeSpent: '6.0h', reviewStatus: 'Pending Review', qualityFlag: 'Not Flagged', output: { type: 'link', value: 'Figma link' } },
    { id: 'SUB-1249', name: 'Database Schema Update', parentTask: 'Database Migration', assignee: findUser('Emily Rodriguez'), completionDate: 'Jan 14, 2026', completionTime: '4:45 PM', timeSpent: '12.5h', reviewStatus: 'Clarification', qualityFlag: 'Red L1', output: { type: 'files', value: '2 files' } },
    { id: 'SUB-1246', name: 'Payment Gateway Integration', parentTask: 'Backend API Development', assignee: findUser('Alex Kumar'), completionDate: 'Jan 13, 2026', completionTime: '3:30 PM', timeSpent: '15.0h', reviewStatus: 'Approved', qualityFlag: 'Green', output: { type: 'files', value: '5 files' } },
    { id: 'SUB-1245', name: 'Form Validation Logic', parentTask: 'UI Component Library', assignee: findUser('David Kim'), completionDate: 'Jan 12, 2026', completionTime: '1:10 PM', timeSpent: '4.5h', reviewStatus: 'Rejected', qualityFlag: 'Red L2', output: { type: 'files', value: '1 file' } },
];

export const teamOverviewData: TeamMemberOverview[] = [
    { id: 'u1', name: 'Sarah Chen', team: 'Backend Team', avatar: 'https://i.pravatar.cc/150?u=U-002', activeSubtasks: 8, blocked: 2, pendingReviews: 3, overdue: 1 },
    { id: 'u2', name: 'Alex Martinez', team: 'Backend Team', avatar: 'https://i.pravatar.cc/150?u=ryanmartinez', activeSubtasks: 6, blocked: 0, pendingReviews: 2, overdue: 0 },
    { id: 'u3', name: 'David Kim', team: 'API Team', avatar: 'https://i.pravatar.cc/150?u=davidkimpark', activeSubtasks: 10, blocked: 3, pendingReviews: 4, overdue: 2 },
    { id: 'u4', name: 'Emily Rodriguez', team: 'API Team', avatar: 'https://i.pravatar.cc/150?u=emilyrodriguez', activeSubtasks: 7, blocked: 0, pendingReviews: 2, overdue: 0 },
    { id: 'u5', name: 'James Wilson', team: 'Backend Team', avatar: 'https://i.pravatar.cc/150?u=jameswilson', activeSubtasks: 3, blocked: 0, pendingReviews: 1, overdue: 0 },
];

export const openEscalationsRaisedData: Escalation[] = [
    { id: 'e1', title: 'Database Performance Issue', task: 'Task: Backend API Development', raisedDate: 'Jan 14, 2026', status: 'Pending', assignee: 'Sarah Williams' },
    { id: 'e2', title: 'Resource Shortage', task: 'Task: API Integration', raisedDate: 'Jan 15, 2026', status: 'Urgent', assignee: 'Sarah Williams' },
];

export const openEscalationsAgainstData: Escalation[] = [
    { id: 'e3', title: 'Delayed Code Review', task: 'Task: Authentication Module', raisedDate: 'Jan 13, 2026', status: 'In Progress', assignee: 'David Kim' },
];

export const auditActionsData: AuditAction[] = [
    { id: 'a1', action: 'Approved', description: 'Approved Subtask: User Authentication API', timestamp: 'Jan 16, 2026 9:15 AM', ip: '192.168.1.45' },
    { id: 'a2', action: 'Rejected', description: 'Rejected Subtask: Form Validation Logic', timestamp: 'Jan 15, 2026 4:30 PM', ip: '192.168.1.45' },
    { id: 'a3', action: 'Reassigned', description: 'Reassigned Work: Database Schema to Emily Rodriguez', timestamp: 'Jan 15, 2026 2:15 PM', ip: '192.168.1.45' },
    { id: 'a4', action: 'Escalated', description: 'Escalated: Resource Shortage to PM', timestamp: 'Jan 15, 2026 11:00 AM', ip: '192.168.1.45' },
    { id: 'a5', action: 'Approved', description: 'Approved Subtask: Payment Gateway Integration', timestamp: 'Jan 14, 2026 3:45 PM', ip: '192.168.1.45' },
    { id: 'a6', action: 'Flagged', description: 'Flagged Quality Issue: Red L2 on Database Schema', timestamp: 'Jan 14, 2026 1:20 PM', ip: '192.168.1.45' },
    { id: 'a7', action: 'Requested Clarification', description: 'Requested Clarification on Button Component Design', timestamp: 'Jan 13, 2026 5:10 PM', ip: '192.168.1.45' },
    { id: 'a8', action: 'Approved', description: 'Approved Subtask: Email Service Integration', timestamp: 'Jan 13, 2026 2:30 PM', ip: '192.168.1.45' },
    { id: 'a9', action: 'Reassigned', description: 'Reassigned Work: API Testing to Alex Martinez', timestamp: 'Jan 12, 2026 4:00 PM', ip: '192.168.1.45' },
    { id: 'a10', action: 'Rejected', description: 'Rejected Subtask: Login UI Component', timestamp: 'Jan 12, 2026 10:15 AM', ip: '192.168.1.45' },
];

export const sessionHistoryData: Session[] = [
    { id: 's1', type: 'Current', login: 'Jan 16, 2026 9:15 AM', ip: '192.168.1.45', device: 'Chrome on Windows 11', location: 'San Francisco, CA', status: 'Active' },
    { id: 's2', type: 'Previous', login: 'Jan 15, 2026 8:30 AM', logout: 'Jan 15, 2026 6:45 PM', ip: '192.168.1.45', device: 'Chrome on Windows 11', status: 'Ended' },
    { id: 's3', type: 'Mobile', login: 'Jan 14, 2026 7:15 PM', logout: 'Jan 14, 2026 7:45 PM', ip: '192.168.1.78', device: 'Safari on iPhone 15', status: 'Ended' },
];
export const teamMemberTaskDetailData: Task = {
    id: 'TSK-MEMBER-01',
    name: 'Frontend Integration',
    project: 'E-commerce Platform Upgrade',
    company: 'ShopNow Inc.',
    assignees: [findUser('Sarah Chen')],
    status: 'In Progress',
    priority: 'High',
    dueDate: 'In 2 days',
    progress: 60,
    lastUpdated: '3 hours ago',
    dependencies: { type: 'Free', count: 0 },
    manager: { name: 'John Anderson', avatar: 'https://i.pravatar.cc/150?u=lead@dws.com' },
    dependenciesList: [
        { id: 'TSK-2024-1053', name: 'UI Component Library', status: 'Completed', completedDate: 'Mar 22, 2024' },
        { id: 'TSK-2024-1051', name: 'Payment Gateway Integration', status: 'Completed', completedDate: 'Apr 08, 2024' },
    ],
    outputRequirements: [
        { text: 'Integrate header and footer components', completed: true },
        { text: 'Implement product listing page with filtering', completed: true },
        { text: 'Connect shopping cart to backend API', completed: false },
        { text: 'Ensure full mobile responsiveness for all pages', completed: false },
    ],
    attachments: [
        { id: 'att-101', name: 'API_Contract_v2.pdf', size: '2.1 MB', type: 'pdf' },
        { id: 'att-102', name: 'Design_Mockups.zip', size: '24.8 MB', type: 'zip' },
    ]
};

export const frontendIntegrationActivityLog: {icon: 'play' | 'check' | 'assign' | 'change'; text: string; time: string}[] = [
    { icon: 'assign', text: 'You were assigned this task by <strong>John Anderson</strong>.', time: '3 days ago' },
    { icon: 'play', text: 'You started working on this task.', time: '2 days ago' },
    { icon: 'check', text: 'Subtask "Setup project structure" was completed.', time: '2 days ago' },
    { icon: 'change', text: 'The due date was changed from "in 5 days" to "in 2 days" by <strong>John Anderson</strong>.', time: 'Yesterday' },
    { icon: 'check', text: 'Subtask "Implement header and footer" was completed.', time: '10 hours ago' },
];

export const teamMemberDashboardData = {
    workToDo: [
        { name: 'Frontend Integration', project: 'E-commerce Platform Upgrade', priority: 'High', dueDate: 'in 2 days', status: 'In Progress' },
        { name: 'API Documentation', project: 'Customer Portal Development', priority: 'Medium', dueDate: 'in 4 days', status: 'Not Started' },
        { name: 'Mobile Responsiveness', project: 'Mobile App Redesign', priority: 'High', dueDate: 'Feb 3, 2026', status: 'In Progress' },
    ],
    blockedTasks: [
        { name: 'User Profile Page', project: 'Customer Portal Development', reason: 'Waiting for design assets', waitingSince: '2 days' },
    ],
    reviewTasks: [
        { name: 'Database Schema Update', submitted: 'Jan 14, 2026', status: 'Rework Requested' },
        { name: 'Button Component Design', submitted: 'Jan 16, 2026', status: 'Under Review' },
    ],
    alerts: [
        { type: 'new', text: 'New task assigned: <strong>UI Component Library</strong>.', time: '2 hours ago' },
        { type: 'approved', text: 'Your submission for <strong>Payment Gateway Integration</strong> was approved.', time: '5 hours ago' },
        { type: 'rework', text: '<strong>Database Schema Update</strong> was sent back for rework.', time: 'Yesterday' },
        { type: 'deadline', text: 'Deadline for <strong>Mobile Responsiveness</strong> is approaching.', time: 'Yesterday' },
        { type: 'comment', text: '<strong>John Anderson</strong> left a comment on <strong>Frontend Integration</strong>.', time: '2 days ago' },
    ],
};

export const teamMemberMyWorkData: (Partial<Task> & {name: string, project: string, priority: string, dueDate: string, isOverdue: boolean, status: string, timer: string, reviewState: string, action: string})[] = [
    { name: 'Frontend Integration', project: 'E-commerce Platform Upgrade', priority: 'High', dueDate: 'in 2 days', isOverdue: false, status: 'In Progress', timer: '01:34:12', reviewState: '', action: 'Pause' },
    { name: 'API Documentation', project: 'Customer Portal Development', priority: 'Medium', dueDate: 'in 4 days', isOverdue: false, status: 'Not Started', timer: '00:00:00', reviewState: '', action: 'Start' },
    { name: 'Mobile Responsiveness', project: 'Mobile App Redesign', priority: 'High', dueDate: 'Feb 3, 2026', isOverdue: true, status: 'In Progress', timer: '05:12:45', reviewState: '', action: 'Pause' },
    { name: 'User Profile Page', project: 'Customer Portal Development', priority: 'Medium', dueDate: 'in 5 days', isOverdue: false, status: 'Blocked', timer: '02:00:00', reviewState: '', action: 'View Reason' },
    { name: 'Database Schema Update', project: 'Database Migration', priority: 'High', dueDate: 'in 6 days', isOverdue: false, status: 'Not Started', timer: '00:00:00', reviewState: 'Rework Requested', action: 'Start Rework' },
    { name: 'Button Component Design', project: 'UI Component Library', priority: 'Low', dueDate: 'in 7 days', isOverdue: false, status: 'Not Started', timer: '00:00:00', reviewState: 'Under Review', action: 'View' },
];

export const teamMemberReviewsData: TeamMemberReview[] = [
  { id: 'rev-1', taskName: 'Mobile Responsive Layout', projectName: 'Website Relaunch', reviewerRole: 'Team Owner', reviewOutcome: 'Approved', rating: 5.0, reviewDate: 'Feb 4, 2026 10:30 AM' },
  { id: 'rev-2', taskName: 'Dashboard UI Components', projectName: 'E-Commerce Platform', reviewerRole: 'Project Manager', reviewOutcome: 'Under Review', rating: null, reviewDate: 'Feb 3, 2026 2:15 PM' },
  { id: 'rev-3', taskName: 'Backend API Endpoints', projectName: 'Mobile App Redesign', reviewerRole: 'Quality', reviewOutcome: 'Rework', rating: 3.0, reviewDate: 'Feb 2, 2026 4:45 PM' },
  { id: 'rev-4', taskName: 'Search Functionality', projectName: 'E-Commerce Platform', reviewerRole: 'Team Owner', reviewOutcome: 'Appreciation', rating: 5.0, reviewDate: 'Feb 1, 2026 11:20 AM' },
  { id: 'rev-5', taskName: 'User Profile Module', projectName: 'Mobile App Redesign', reviewerRole: 'Project Manager', reviewOutcome: 'Approved', rating: 4.0, reviewDate: 'Jan 31, 2026 3:00 PM' },
  { id: 'rev-6', taskName: 'Data Export Feature', projectName: 'Cloud Migration Project', reviewerRole: 'Quality', reviewOutcome: 'Callout', rating: 2.0, reviewDate: 'Jan 30, 2026 9:15 AM' },
  { id: 'rev-7', taskName: 'Email Notification System', projectName: 'Website Relaunch', reviewerRole: 'Team Owner', reviewOutcome: 'Approved', rating: 4.0, reviewDate: 'Jan 29, 2026 1:45 PM' },
  { id: 'rev-8', taskName: 'Security Patch Implementation', projectName: 'Cloud Migration Project', reviewerRole: 'Project Manager', reviewOutcome: 'Rework', rating: 3.0, reviewDate: 'Jan 28, 2026 10:00 AM' },
];

export const detailedReviewData: DetailedTeamMemberReview = {
  ...teamMemberReviewsData[0],
  submissionDate: 'Feb 1, 2026 9:00 AM',
  deadline: 'Feb 2, 2026 5:00 PM',
  reviewerName: 'Michael Chen',
  feedback: {
      doneWell: ['Excellent implementation of responsive breakpoints. The layout adapts beautifully across all device sizes from mobile to desktop.', 'Clean code structure with proper use of CSS Grid and Flexbox. Performance optimization is outstanding with minimal render-blocking resources.'],
      improvement: ['Consider adding more detailed comments in the CSS file for future maintainability.', 'Some edge cases on tablets in landscape orientation could be refined further. Documentation could be more comprehensive regarding browser compatibility testing results.']
  },
  clientSentiment: {
      sentiment: 'Positive',
      comment: 'Client expressed satisfaction with the responsive design quality and speed of implementation.'
  },
  performanceImpact: 1,
};

export const upcomingTasksData: {id: string; name: string; project: string; company: string; dueDate: string; priority: 'High' | 'Medium' | 'Low'}[] = [
  { id: 'task-1', name: 'Review design mockups', project: 'Website Redesign', company: 'TechCorp Inc', dueDate: 'Today, 5:00 PM', priority: 'High' },
  { id: 'task-2', name: 'Client meeting preparation', project: 'E-commerce Platform', company: 'RetailPro', dueDate: 'Tomorrow, 10:00 AM', priority: 'Medium' },
  { id: 'task-3', name: 'Update project timeline', project: 'Mobile App Development', company: 'StartupHub', dueDate: 'Jan 24, 2024', priority: 'Low' },
  { id: 'task-4', name: 'Invoice approval', project: 'Marketing Campaign', company: 'GrowthAgency', dueDate: 'Jan 25, 2024', priority: 'Medium' },
];

export const financialOverviewData: { totalRevenue: number, revenueChange: number, pendingPayments: number, outstandingInvoices: number, invoices: Invoice[] } = {
  totalRevenue: 485500,
  revenueChange: 18,
  pendingPayments: 127300,
  outstandingInvoices: 9,
  invoices: [
    { id: '1245', company: 'TechCorp Inc', amount: 45000, status: 'Paid' },
    { id: '1246', company: 'RetailPro', amount: 60000, status: 'Pending' },
    { id: '1243', company: 'Creative Studios', amount: 32000, status: 'Overdue', overdueDays: 5 },
  ]
};

export const pmActionsData: PMActionItem[] = [
  {
    id: 'act-1',
    title: 'Invoice Approval - Vendor XYZ',
    priority: 'CRITICAL',
    riskType: 'Finance',
    project: 'API Integration',
    projectColor: 'bg-green-500',
    dueDate: 'Overdue 2 days',
    dueColor: 'text-red-500',
    amount: 45200,
    description: 'Payment to vendor blocked until approval',
    cta: 'APPROVE',
    border: 'border-red-400',
  },
  {
    id: 'act-2',
    title: 'Payment Follow-up - Design Agency',
    priority: 'CRITICAL',
    riskType: 'Finance',
    project: 'Platform Redesign',
    projectColor: 'bg-purple-500',
    dueDate: 'Overdue 5 days',
    dueColor: 'text-red-500',
    amount: 82300,
    description: 'Vendor threatening project suspension',
    cta: 'RESOLVE',
    border: 'border-red-400',
  },
  {
    id: 'act-3',
    title: 'Budget Reallocation Approval',
    priority: 'URGENT',
    riskType: 'Finance',
    project: 'Platform Redesign',
    projectColor: 'bg-purple-500',
    dueDate: 'Due today 3:00 PM',
    dueColor: 'text-orange-500',
    amount: 156000,
    description: 'CFO approval required for Q1 budget shift',
    cta: 'APPROVE',
    border: 'border-yellow-400',
  },
  {
    id: 'act-4',
    title: 'Sprint Milestone Deliverables',
    priority: 'Delivery',
    riskType: 'Delivery',
    project: 'Mobile App v2',
    projectColor: 'bg-yellow-500',
    dueDate: 'Due today 5:00 PM',
    dueColor: 'text-gray-600',
    assignee: 'Alex Martinez',
    description: '8/10 subtasks complete - awaiting final review',
    cta: 'REVIEW',
    border: 'border-blue-400',
  },
    {
    id: 'act-5',
    title: 'API Documentation Review',
    priority: 'Delivery',
    riskType: 'Delivery',
    project: 'API Integration',
    projectColor: 'bg-green-500',
    dueDate: '',
    dueColor: '',
    assignee: 'Sarah Chen',
    description: '',
    cta: 'REVIEW',
    border: 'border-blue-400',
  },
    {
    id: 'act-6',
    title: 'Design System Approval',
    priority: 'Delivery',
    riskType: 'Delivery',
    project: 'Platform Redesign',
    projectColor: 'bg-purple-500',
    dueDate: '',
    dueColor: '',
    assignee: 'Emily Rodriguez',
    description: '',
    cta: 'APPROVE',
    border: 'border-gray-300',
  },
  {
    id: 'act-7',
    title: 'Resource Reallocation - Cloud Infrastructure',
    priority: 'Risk',
    riskType: 'Risk',
    project: 'Cloud Infrastructure',
    projectColor: 'bg-blue-500',
    dueDate: '',
    dueColor: '',
    description: 'Project on hold - budget approval needed',
    cta: 'RESOLVE',
    border: 'border-yellow-400',
  },
  {
    id: 'act-8',
    title: 'Security Compliance Report',
    priority: 'Compliance',
    riskType: 'Compliance',
    project: 'Security Audit',
    projectColor: 'bg-red-500',
    dueDate: '',
    dueColor: '',
    assignee: 'Security Team',
    description: '',
    cta: 'REVIEW',
    border: 'border-gray-300',
  },
];

export const deliveryCalendarData: DeliveryCalendarItem[] = [
    { id: 'cal-1', title: 'Q4 Budget Finalization', project: 'Platform Redesign', projectColor: 'bg-purple-500', status: 'OVERDUE', dueDate: '', dueStatus: '3 days overdue', type: 'Approval' },
    { id: 'cal-2', title: 'Invoice Vendor XYZ', project: 'API Integration', projectColor: 'bg-green-500', status: 'OVERDUE', dueDate: '', dueStatus: '2 days overdue', amount: 45200, type: 'Financial' },
    { id: 'cal-3', title: 'Security Compliance Report', project: 'Security Audit', projectColor: 'bg-red-500', status: 'OVERDUE', dueDate: '', dueStatus: '1 day overdue', type: 'Milestone' },
    { id: 'cal-4', title: 'Sprint Milestone Deliverables', project: 'Mobile App v2', projectColor: 'bg-yellow-500', status: 'AWAITING REVIEW', dueDate: 'Due 5:00 PM', type: 'Review' },
    { id: 'cal-5', title: 'API Documentation', project: 'API Integration', projectColor: 'bg-green-500', status: 'AWAITING REVIEW', dueDate: '', type: 'Review' },
    { id: 'cal-6', title: 'Platform Redesign Phase 1 Completion', project: 'Platform Redesign', projectColor: 'bg-purple-500', status: 'SCHEDULED', dueDate: 'Jan 19 (3 days)', progress: 82, type: 'Milestone' },
    { id: 'cal-7', title: 'Budget Reallocation Approval', project: 'Platform Redesign', projectColor: 'bg-purple-500', status: 'SCHEDULED', dueDate: 'Today 3:00 PM', amount: 156000, type: 'Financial' },
];
