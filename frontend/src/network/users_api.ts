import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    } else{
        const errorBody = await response.json();
        const errorMessage = errorBody.message;
        throw Error(errorMessage);
    }
}

export async function getLogInUser(): Promise<User>{
    const response = await fetchData(`/api/users`, {method: "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User>{
    const response = await fetchData(`/api/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export async function logIn(credentials: LoginCredentials): Promise<User>{
    const response = await fetchData(`/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logOut(): Promise<void>{
    await fetchData(`/api/users/logout`, {method: "POST"});
}