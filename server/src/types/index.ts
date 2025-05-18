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

export interface UserParams {
    id: string;
}

export interface CreateUserBody {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserBody {
    name?: string;
    email?: string;
}

export interface PasswordChangeBody {
    oldPassword: string;
    newPassword: string;
}


export interface GetUsersQuery {
    search?: string;
    page?: string;
    limit?: string;
}

export interface PasswordChangeBody {
    oldPassword: string;
    newPassword: string;
}

export interface Pagination {
    totalPage: number;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
}

export interface UserParams {
    id: string;
}

export interface CreateUserBody {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserBody {
    username?: string;
}