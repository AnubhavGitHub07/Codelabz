/**
 * Handles SIGN_UP_FAIL, SIGN_IN_FAIL, SEND_RESET_EMAIL_FAIL and INITIAL_SETUP_FAIL error messages.
 */

export interface AuthError {
    readonly code: string;
    readonly message?: string;
}

/**
 * Transforms Firebase auth error payloads into user-friendly messages.
 * @param payload - The error payload from Firebase auth operations
 * @returns A user-friendly error message string, or the original payload if unrecognized
 */
export const modifyAuthErrorMsg = (
    payload: AuthError
): string | AuthError => {
    switch (payload.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "The email and/or the password seems to be incorrect.";

        case "auth/email-already-in-use":
            return "An account with the same email already exists.";

        case "auth/too-many-requests":
            return "Logging in has been disabled temperorily due to too many unsuccessful attempts. Please check back in a few minutes.";

        case "auth/missing-email":
            return "The email address is badly formatted.";

        default:
            return payload.message || payload;
    }
};
