import validator from "validator";


type SetBoolean = (value: boolean) => void;
type SetString = (value: string) => void;


type HandleExistsChecker = (
    handle: string
) => (backend: unknown) => Promise<boolean>;


export const validateName = (
    name: string,
    setNameValidateError: SetBoolean,
    setNameValidateErrorMessage: SetString,
    emptyMsg: string,
    realNameMsg: string
): boolean => {
    if (validator.isEmpty(name)) {
        setNameValidateError(true);
        setNameValidateErrorMessage(emptyMsg);
        return false;
    } else if (!name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        setNameValidateError(true);
        setNameValidateErrorMessage(realNameMsg);
        return false;
    } else {
        setNameValidateError(false);
        setNameValidateErrorMessage("");
        return true;
    }
};

/**
 * Validates a handle: must not be empty, must be lowercase alphanumeric,
 * at least 6 characters, and must not already exist.
 */
export const validateHandle = async (
    checkHandleExists: HandleExistsChecker,
    backend: unknown,
    handle: string,
    setHandleValidateError: SetBoolean,
    setHandleValidateErrorMessage: SetString,
    emptyMsg: string,
    lowercaseMsg: string,
    lengthMsg: string,
    takenMsg: string
): Promise<boolean> => {
    const handleExists = await checkHandleExists(handle)(backend);
    if (validator.isEmpty(handle)) {
        setHandleValidateError(true);
        setHandleValidateErrorMessage(emptyMsg);
        return false;
    } else if (
        !validator.isAlphanumeric(handle) ||
        !validator.isLowercase(handle)
    ) {
        setHandleValidateError(true);
        setHandleValidateErrorMessage(lowercaseMsg);
        return false;
    } else if (handle.length < 6) {
        setHandleValidateError(true);
        setHandleValidateErrorMessage(lengthMsg);
        return false;
    } else if (handleExists) {
        setHandleValidateError(true);
        setHandleValidateErrorMessage(takenMsg);
        return false;
    } else {
        setHandleValidateError(false);
        setHandleValidateErrorMessage("");
        return true;
    }
};

/**
 * Validates that a country is not empty.
 */
export const validateCountry = (
    country: string,
    setCountryValidateError: SetBoolean
): boolean => {
    if (validator.isEmpty(country)) {
        setCountryValidateError(true);
        return false;
    } else {
        setCountryValidateError(false);
        return true;
    }
};

/**
 * Validates an organization website: must not be empty, must be a valid URL,
 * and must include the protocol (http:// or https://).
 */
export const validateOrgWebsite = (
    orgWebsite: string,
    setOrgWebsiteValidateError: SetBoolean,
    setOrgWebsiteValidateErrorMessage: SetString
): boolean => {
    if (validator.isEmpty(orgWebsite)) {
        setOrgWebsiteValidateError(true);
        setOrgWebsiteValidateErrorMessage("Please enter a website");
        return false;
    } else if (!validator.isURL(orgWebsite)) {
        setOrgWebsiteValidateError(true);
        setOrgWebsiteValidateErrorMessage("Please provide a valid URL");
        return false;
    } else if (
        !(orgWebsite.includes("https://") || orgWebsite.includes("http://"))
    ) {
        setOrgWebsiteValidateError(true);
        setOrgWebsiteValidateErrorMessage(
            "URL must contain the protocol (https:// or http://)"
        );
        return false;
    } else {
        setOrgWebsiteValidateError(false);
        setOrgWebsiteValidateErrorMessage("");
        return true;
    }
};

/**
 * Validates that a string is not empty.
 */
export const validateIsEmpty = (
    string: string,
    setStringValidateError: SetBoolean,
    setStringValidateErrorMessage: SetString,
    emptyMsg: string
): boolean => {
    if (validator.isEmpty(string)) {
        setStringValidateError(true);
        setStringValidateErrorMessage(emptyMsg);
        return false;
    } else {
        setStringValidateError(false);
        setStringValidateErrorMessage("");
        return true;
    }
};
