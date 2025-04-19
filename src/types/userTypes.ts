// Interface for a User
export interface User {
    id: string;
    displayName: string;
    email: string;
    bio: string;
    role: 'admin' | 'judge' | 'user'; // Could use an enum for roles too
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    profilePic: string;
    phone: string;
    address: string;
    website: string;
    location: string;
    updatedAt: string;
    createdAt: string;
  }
  
  // Mock Data for an empty user
  export const EMPTY_USER: User = {
    id: '',
    displayName: '',
    email: '',
    bio: '',
    role: 'user',
    status: 'inactive',
    profilePic: '/blank-profile-picture.png',
    phone: '',
    address: '',
    website: '',
    location: '',
    updatedAt: '',
    createdAt: '',
  };
  