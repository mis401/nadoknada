export interface JWT{
    sub: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
}