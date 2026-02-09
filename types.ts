import type { ComponentType } from 'react';

export interface Project {
  id: string;
  name: string;
  company: string;
  serviceType: string;
  projectOwner: { name: string; avatar: string };
  teamOwner: string;
  status: 'Active' | 'On Hold' | 'Completed';
  health: 'On Track' | 'At Risk' | 'Delayed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  dealId?: string;
}

export interface ServiceInDeal {
  id: string;
  name: string;
  description: string;
  billingType: 'Fixed Price' | 'Milestone' | 'Retainer' | '';
  amount: number | string; // string for per-month values
  startDate: string;
  endDate: string;
  status: 'Ready' | 'Not Converted';
  configuration?: ProjectConfiguration; // Store configuration here
  saleType?: 'New Sale' | 'Upsell' | 'Winback' | 'ER to Sub' | '';
  currency?: string;
}

export interface ProjectConfiguration {
  projectName: string;
  department: string;
  assignedPeople: string[];
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string;
  endDate: string;
  teamOwner: string;
  complexity: 'Low' | 'Medium' | 'High';
  dependencies: string[];
  internalNotes: string;
}

export type SalesDealStatus = 'Draft' | 'Submitted to PM' | 'Intro Call Scheduled' | 'Intro Call Done' | 'Converted';

export interface Deal {
  id: string;
  dealName: string;
  company: string;
  services: ServiceInDeal[];
  saleType: 'New Sale' | 'Upsell' | 'Winback' | 'ER to Sub';
  salesPerson: {
    name: string;
    email: string;
  };
  projectManager?: {
    name: string;
    email: string;
  };
  budget: number;
  startDate: string;
  advancePayment: 'Paid' | 'Not Paid';
  invoiceId: string;
  status: 'New' | 'Converted' | 'On Hold' | SalesDealStatus;
  clientDetails?: {
    name: string;
    url: string;
    email: string;
    phone: string;
  };
  contractValue?: number;
  currency?: string;
  createdDate?: string;
  salesNotes?: string;
  clientRisk?: {
    tags: string[];
    comments: string;
  };
  introCallStatus: 'Pending' | 'Done';
  introCallDateTime?: string;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk';
  assignedPM?: string;
}

export interface NeedsActionItem {
  id: string;
  clientName: string;
  issue: 'Missing info' | 'Rejected by PM' | 'Not submitted';
  lastUpdated: string;
  dealId: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'html' | 'json' | 'image' | 'doc' | 'zip' | 'xlsx';
}

export interface Task {
  id: string;
  name: string;
  project: string;
  company: string;
  assignees: User[];
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Blocked' | 'Submitted for Review';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  progress: number;
  lastUpdated: string;
  dependencies: { type: 'Free' | 'Blocked', count: number };
  rating?: number;
  // Fields for detail view
  timeLogged?: number; // in seconds
  projectId?: string;
  dealId?: string;
  serviceType?: string;
  startDate?: string;
  daysLeft?: number;
  scheduleStatus?: 'Late' | 'On Track';
  scheduleOffset?: string;
  qualityFlag?: 'No Flag' | 'Green' | 'Red' | 'Yellow' | 'Red Flag' | 'Green Flag';
  qualityConcerns?: string;
  paymentStatus?: 'Linked' | 'Not Linked';
  invoiceId?: string;
  attachments?: Attachment[];
  dependenciesList?: { id: string; name: string; status: 'Done' | 'Pending' | 'Completed'; completedDate?: string }[];
  outputRequirements?: { text: string; completed: boolean }[];
  // Fields for Team Lead View
  pm?: { name: string; avatar: string };
  manager?: { name: string; avatar?: string };
  approvalStatus?: 'Pending' | 'Approved' | 'Clarification';
  executionStatus?: 'Not Started' | 'In Progress' | 'Blocked' | 'Rework' | 'Completed' | 'Waiting' | 'Not Taken Up';
  timerStatus?: 'Running' | 'Paused' | 'Stopped' | 'Not Started';
  reviewStatus?: 'Not Submitted' | 'Submitted' | 'Rejected' | 'Approved';
  timeSpent?: { logged: number; allocated: number; }; // in seconds
  action?: 'View Reason' | 'Start Rework' | 'Take Up' | 'View' | 'Waiting Approval' | 'Respond' | 'Waiting' | 'Start' | 'Pause';
}

export interface Subtask {
    id: string;
    name: string;
    status: 'Completed' | 'Pending' | 'In Progress';
    owner?: string;
    dueDate?: string;
}

export interface TeamLeadSubtask {
  id: string;
  name: string;
  parentTask: { id: string; name: string; };
  assignee: User;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  executionStatus: 'In Progress' | 'Blocked' | 'Rework' | 'Paused' | 'Completed' | 'Not Started' | 'Waiting' | 'Not Taken Up';
  timerStatus: 'Running' | 'Paused' | 'Stopped' | 'Not Started';
  timeSpent: number; // seconds
  qualityFlag: 'Green' | 'L1' | 'L2' | 'No Flag' | 'Green Flag';
  deadline: string;
  outputRequirements: { text: string; completed: boolean; }[];
  dependencies: string;
  attachments: Attachment[];
}

export interface SubtaskForReview {
    id: string;
    name: string;
    parentTask: string;
    assignee: User;
    completionDate: string;
    completionTime: string;
    timeSpent: string;
    reviewStatus: 'Pending Review' | 'Clarification' | 'Approved' | 'Rejected';
    qualityFlag: 'Not Flagged' | 'Red L1' | 'Red L2' | 'Green';
    output: { type: 'files' | 'link', value: string };
    slaStatus?: string;
}


export interface Risk {
    id: string;
    type: 'Risk' | 'Issue' | 'Resolved';
    date: string;
    title: string;
    description: string;
    assignee: string;
    owner?: { name: string };
    status?: 'Open' | 'Closed';
}

export interface ActivityLogEntry {
  id: string;
  type: 'Issue' | 'Subtask' | 'Invoice' | 'OwnerChange' | 'TaskStarted' | 'Submitted' | 'Updated' | 'Completed' | 'Rejected';
  icon: ComponentType<{className: string}>;
  title: string;
  description: string;
  timestamp: string;
  author?: string;
}

export interface RecentActivity {
    id: string;
    icon: ComponentType<{ className: string }>;
    iconBg: string;
    title: string;
    description: string;
    time: string;
}


export interface AuditLogEntry {
    id: string;
    type: 'StatusChange' | 'OwnerChange' | 'TimelineUpdate' | 'TaskCompleted' | 'RiskEscalated' | 'NewTask';
    description: string;
    date: string;
}

export interface User {
    id: string;
    name: string;
    role: string;
    avatar: string;
    department?: string;
}

export interface CompanyProject {
  id: string;
  name: string;
  team: string;
  progress: number;
  status: 'On Track' | 'At Risk';
}

export interface CompanyDeal {
  id: string;
  name: string;
  status: 'Active' | 'On Hold';
  signedDate: string;
  duration: string;
  projectCount: number;
  projects: CompanyProject[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  dealCount: number;
  projectCount: number;
  totalValue: string;
  deals?: CompanyDeal[];
  type: 'Company';
  status: 'Active' | 'On Hold';
  accountOwner: string;
}

export interface Agency {
  id: string;
  name: string;
  companyCount: number;
  dealCount: number;
  projectCount: number;
  totalValue: string;
  companies: Company[];
  type: 'Agency';
  status: 'Active' | 'On Hold';
  accountOwner: string;
}

export interface ChatMessage {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
}

export interface ReviewHistoryItem {
  id: string;
  date: string;
  reviewer: string;
  rating: number | null;
  comment: string;
  outcome: 'Approved' | 'Rejected';
}

export interface TaskForReview extends Task {
    submittedDate: string;
    completionDate: string;
    createdBy: string;
    createdDate: string;
    timeTracked: string;
    dependenciesList: { id: string; name: string; status: 'Done' | 'Pending' }[];
    attachments: Attachment[];
    reviewActivityLog: { id: string; icon: any; text: string; time: string }[];
    executionSummary: string[];
    description: string;
    acceptanceCriteria: string[];
    reviewHistory: ReviewHistoryItem[];
    lastModified?: string;
}

export type UserRole = 'Project Manager' | 'Team Lead' | 'Team Member' | 'BU Admin' | 'Super Admin' | 'Sales' | 'Quality' | 'Team Owner';

export interface AuthenticatedUser {
    username: string;
    role: UserRole;
}

export interface TemplateStep {
  stepNumber: number;
  title: string;
  description: string;
  ownerType: 'Team Owner' | 'Project Owner';
  estimatedTime: string;
  dependencies: string;
  requiredOutputs?: string[];
}

export interface TaskTemplate {
  id: string;
  name: string;
  department: string;
  stepCount: number;
  typicalDuration: string;
  status: 'Active' | 'Archived';
  description?: string;
  steps?: TemplateStep[];
}

export interface TaskConversationMessage {
  id: string;
  sender: {
    name: string;
    role: UserRole;
  };
  timestamp: string;
  message: string;
  type: 'System' | 'User';
}

export interface TaskHistoryEntry {
  id:string;
  timestamp: string;
  description: string;
  user: string;
}

export interface TeamMemberOverview {
    id: string;
    name: string;
    team: string;
    avatar: string;
    activeSubtasks: number;
    blocked: number;
    pendingReviews: number;
    overdue: number;
}

export interface Escalation {
    id: string;
    title: string;
    task: string;
    raisedDate: string;
    status: 'Pending' | 'Urgent' | 'In Progress';
    assignee: string;
}

export interface AuditAction {
    id: string;
    action: 'Approved' | 'Rejected' | 'Reassigned' | 'Escalated' | 'Flagged' | 'Requested Clarification';
    description: string;
    timestamp: string;
    ip: string;
}

export interface Session {
    id: string;
    type: 'Current' | 'Previous' | 'Mobile';
    login: string;
    logout?: string;
    ip: string;
    device: string;
    location?: string;
    status: 'Active' | 'Ended';
}

export type ReviewOutcome = 'Approved' | 'Rework' | 'Appreciation' | 'Callout' | 'Under Review';

export interface TeamMemberReview {
  id: string;
  taskName: string;
  projectName: string;
  reviewerRole: 'Team Owner' | 'Project Manager' | 'Quality';
  reviewOutcome: ReviewOutcome;
  rating: number | null;
  reviewDate: string;
}

export interface DetailedTeamMemberReview extends TeamMemberReview {
  submissionDate: string;
  deadline: string;
  reviewerName: string;
  feedback: {
      doneWell: string[];
      improvement: string[];
  };
  clientSentiment: {
      sentiment: 'Positive' | 'Neutral' | 'Negative';
      comment: string;
  };
  performanceImpact: number;
}

export interface Invoice {
  id: string;
  company: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  overdueDays?: number;
}

export interface PMActionItem {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'URGENT' | 'Delivery' | 'Risk' | 'Compliance';
  riskType: 'Finance' | 'Delivery' | 'Compliance' | 'Risk';
  project: string;
  projectColor: string;
  dueDate: string;
  dueColor: string;
  amount?: number;
  description: string;
  assignee?: string;
  cta: 'APPROVE' | 'RESOLVE' | 'REVIEW';
  border: string;
}

export interface DeliveryCalendarItem {
  id: string;
  title: string;
  project: string;
  projectColor: string;
  status: 'OVERDUE' | 'AWAITING REVIEW' | 'SCHEDULED';
  dueDate: string;
  dueStatus?: string; // e.g., '3 days overdue'
  amount?: number;
  type: 'Approval' | 'Financial' | 'Milestone' | 'Review';
  progress?: number;
}
