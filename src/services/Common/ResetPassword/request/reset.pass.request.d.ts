export interface ResestPasswordRequest{
    email: string
}

export interface VerifyTokenRequest{
    email:string
    token: string
}

export interface ChangePasswordOnResetRequest{
    id: string
    password: string
    confirmPassword: string
}