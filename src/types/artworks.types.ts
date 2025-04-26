export interface ARTWORK {
    id: string;
    createdBy: string;
    title: string;
    artist: string;
    description: string;
    category: string;
    thumbnail: string;
    date: Date;
    stars: Array<{ userIdentifier: string; rating: number }>;
    claps: Array<{ userIdentifier: string; clap: boolean }>;
    location: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    type: string; // Could use an enum for types too
    // Add any other fields you need
}

export const EMPTY_ARTWORK: ARTWORK = {
    id: "",
    title: "",
    artist: "",
    thumbnail: '/logo2.png',
    date: new Date(),
    location: "",
    description: "",
    category: "",
    price: 0,
    createdBy: "",
    claps: [],
    stars: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active", // Add default value for status
    type: "general"    // Add default value for type
};
