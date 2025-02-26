import jwt from 'jsonwebtoken';

export function decodeJwt(token: string) {
    try {
        const decoded = jwt.decode(token);
        return decoded ? (decoded as { email: string }).email : null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}
