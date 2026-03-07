import { env } from "@/env"
import { createAuthClient } from "better-auth/react"

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: `${NEXT_PUBLIC_BACKEND_URL}`
})