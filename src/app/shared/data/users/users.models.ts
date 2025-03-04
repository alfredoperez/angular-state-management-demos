export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export const usersColumnDefs = [
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'title', headerName: 'Title' },
  { field: 'team', headerName: 'Team' },
  { field: 'projects', headerName: 'Projects' },
];



export interface UserViewModel {
  id: string;
  name: string;
  email: string;
  title: string;
  team: string;
  projects: string;
  createdAt: string;
  updatedAt: string;
}