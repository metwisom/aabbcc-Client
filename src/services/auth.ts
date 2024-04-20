


export interface User {
    token: string;
}

export interface LoginResponse {
    token: string;
}

export interface LoginRequest {
    login: string;
    password: string;
}


export interface RegisterResponse {
    result: string;
}