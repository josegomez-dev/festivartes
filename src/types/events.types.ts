export interface EVENTS {
    id: string;
    createdBy: string;
    name: string;
    description: string;
    location: string;
    thumbnail: string;
    date: Date;
    stars: Array<{ userIdentifier: string; rating: number }>;
    claps: Array<{ userIdentifier: string; clap: boolean }>;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    type: string; // Could use an enum for types too
    upcoming: boolean; // Indicates if the event is upcoming or not
}

export const EMPTY_EVENT: EVENTS = {
    id: "",
    name: "",
    thumbnail: '/logo2.png',
    date: new Date(),
    location: "",
    description: "",
    upcoming: false,
    price: 0,
    createdBy: "",
    claps: [],
    stars: [
        // {
        //     userIdentifier: "",
        //     rating: 3.5
        // }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active", // Add default value for status
    type: "general"    // Add default value for type
};