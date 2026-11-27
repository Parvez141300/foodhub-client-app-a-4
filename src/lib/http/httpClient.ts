import { cookieUtils } from "../utils/cookieUtils";
import { axiosInstance } from "../axios/axiosInstance";
import { IApiRequestOptions } from "../axios/axiosTypes";
import { handleAxiosError } from "../axios/handleAxiosError";

const getValidCookieHeader = async () => {
    let sessionToken = await cookieUtils.getCookie("better-auth.session_token");

    const cookiePairs: string[] = [];
    if (sessionToken) cookiePairs.push(`better-auth.session_token=${sessionToken}`);

    return cookiePairs.join("; ");
}

const clientGet = async <TData>(url: string, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();
    try {
        const response = await axiosInstance.get<TData>(url, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            }
        });

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const clientPost = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();
    try {
        const response = await axiosInstance.post(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            }
        });

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const clientPatch = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();
    try {
        const response = await axiosInstance.patch(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            }
        });

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const clientPut = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();
    try {
        const response = await axiosInstance.put(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            }
        });

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const clientDelete = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();
    try {
        const response = await axiosInstance.delete(url, {
            data: data,
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            }
        });

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const httpClient = {
    get: clientGet,
    post: clientPost,
    patch: clientPatch,
    put: clientPut,
    delete: clientDelete,
}