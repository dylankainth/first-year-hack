import jwt from "jsonwebtoken";
import { defineEventHandler, getQuery, setCookie } from "h3";

export default defineEventHandler(async (event) => {
    const { token } = getQuery(event) as { token: string };

    if (!token) {
        throw createError({ statusCode: 400, statusMessage: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as { email: string };

        // Set authentication cookie
        setCookie(event, "auth_token", token, {  secure: true, path: "/" });

        return { success: true, message: "Logged in!", email: decoded.email };
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
    }
});
