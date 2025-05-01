export interface ARTWORK {
    id: string;
    createdBy: string;
    title: string;
    artist: string;
    description: string;
    category: string;
    thumbnail: string;
    date: Date;
    document: string; // HTML content
    stars: Array<{ userIdentifier: string; rating: number }>;
    claps: Array<{ userIdentifier: string; clap: boolean }>;
    rates: Array<{ userIdentifier: string; ratingForm: Object }>;
    location: string;
    price: number;
    audio: string; // URL to the audio file
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    privacy: 'public' | 'private'; // Could use an enum for privacy too
    type: string; // Could use an enum for types too
    // Add any other fields you need
}

export const EMPTY_ARTWORK: ARTWORK = {
    id: "",
    title: "",
    artist: "",
    thumbnail: '/logo2.png',
    date: new Date(),
    document: "",
    audio: "",
    location: "",
    description: "",
    category: "",
    price: 0,
    privacy: "public", // Add default value for privacity
    createdBy: "",
    claps: [],
    stars: [],
    rates: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active", // Add default value for status
    type: "general"    // Add default value for type
};
