interface EVENTS {
    id: string;
    createdBy: string;
    name: string;
    description: string;
    location: string;
    thumbnail: string;
    date: Date;
    stars: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'banned'; // Could use an enum for statuses too
    type: string; // Could use an enum for types too
    upcoming: boolean; // Indicates if the event is upcoming or not
}