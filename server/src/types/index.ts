export interface IUser {
    username: string;
    email: string;
    image?: string;
    password: string;
    isAdmin?: boolean;
    isBenned?: boolean;
}
