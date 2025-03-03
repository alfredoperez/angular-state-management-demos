export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  teamId: string;
  startDate: string;
  endDate?: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
}

export const projectsColumnDefs = [
  { field: 'name', headerName: 'Name' },
  { field: 'description', headerName: 'Description' },
  { field: 'status', headerName: 'Status' },
  { field: 'teamId', headerName: 'Team' },
  { field: 'startDate', headerName: 'Start Date' },
  { field: 'techStack', headerName: 'Tech Stack' },
];
