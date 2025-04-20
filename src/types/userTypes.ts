// Interface for a User
export interface User {
    id: string;
    displayName: string;
    email: string;
    bio: string;
    role: 'admin' | 'judge' | 'user'; // Could use an enum for roles too
    type: string; 
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    profilePic: string;
    phone: string;
    address: string;
    website: string;
    location: string;
    updatedAt: Date;
    createdAt: Date;
  }
  
  // Mock Data for an empty user
  export const EMPTY_USER: User = {
    id: '',
    displayName: '',
    email: '',
    bio: '',
    role: 'user',
    type: 'normal',
    status: 'inactive',
    profilePic: '/blank-profile-picture.png',
    phone: '',
    address: '',
    website: '',
    location: '',
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  