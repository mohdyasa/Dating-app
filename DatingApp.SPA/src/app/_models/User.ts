import { Photo } from './Photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    gender: string;
    age: number;
    created: Date;
    lastactive: Date;
    photoUrl: string;
    city: string;
    country: string;
    intrests?: string;
    introduction?: string;
    lookingFor: string;
    photos?: Photo[];
}
