export interface Team {
  id: string;
  name: string;
  description: string;
  lead: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
}

export const teamsColumnDefs = [
  { field: 'name', headerName: 'Name' },
  { field: 'description', headerName: 'Description' },
  { field: 'lead', headerName: 'Team Lead' },
  { field: 'techStack', headerName: 'Tech Stack' },
];
