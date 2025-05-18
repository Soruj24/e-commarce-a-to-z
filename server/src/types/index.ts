export interface IUser {
    username: string;
    email: string;
    image?: string;
    password: string;
    isAdmin?: boolean;
    isBenned?: boolean;
}

export interface PaginationQueryParams {
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
}
 
export interface HttpError extends Error {
    status?: number;
    statusCode?: number;
}