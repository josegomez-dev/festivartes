interface ARTWORK {
    id: string;
    createdBy: string;
    title: string;
    artist: string;
    description: string;
    category: string;
    thumbnail: string;
    date: Date;
    stars: number;
    location: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    type: string; // Could use an enum for types too
    // Add any other fields you need
}
