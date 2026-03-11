/**
 * Validation rule definitions for form fields.
 * Used with Ant Design-style form validation.
 */

export interface ValidationRule {
    readonly required?: boolean;
    readonly message: string;
    readonly pattern?: RegExp;
    readonly type?: string;
    readonly min?: number;
    readonly max?: number;
}

// --- Organization validation ---

export const orgWebsiteValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the website of the organization"
    },
    {
        pattern: new RegExp(
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{ 1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
        ),
        message: "Please provide a valid URL"
    },
    {
        pattern: new RegExp(/^(http:\/\/|https:\/\/)/),
        message: "URL must contain the protocol (https:// or http://)"
    }
];

export const orgSMValidation: readonly ValidationRule[] = [
    {
        required: false,
        message: "Please enter the website of the organization"
    }
];

export const orgHandleValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter your organization handle"
    },
    {
        pattern: new RegExp(/^[a-z0-9]{1,}$/),
        message:
            "Organization handle can only contain lowercase alphanumeric characters"
    },
    {
        pattern: new RegExp(/^[a-z0-9]{6,}$/),
        message: "Organization handle cannot be less than 6 characters"
    }
];

export const orgNameValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the organization name"
    },
    {
        type: "string",
        message: "Please provide a valid organization name"
    }
];

// --- User validation ---

export const userHandleValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter your user handle"
    },
    {
        pattern: new RegExp(/^[a-z0-9]{1,}$/),
        message: "User handle can only contain lowercase alphanumeric characters"
    },
    {
        min: 6,
        message: "User handle cannot be less than 6 characters"
    }
];

export const userWebsiteValidation: readonly ValidationRule[] = [
    {
        pattern: new RegExp(
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{ 1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
        ),
        message: "Please provide a valid URL"
    },
    {
        pattern: new RegExp(/^(http:\/\/|https:\/\/)/),
        message: "URL must contain the protocol (https:// or http://)"
    }
];

// --- Tutorial validation ---

export const tutorialTitleNameValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the tutorial title"
    },
    {
        type: "string",
        message: "Please provide a valid tutorial title"
    }
];

export const tutorialOwnerValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the owner of the tutorial"
    }
];

// --- Add new step validation ---

export const addNewStepNameValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the title of the step"
    },
    {
        type: "string",
        message: "Please provide a valid title of the step"
    }
];

export const addNewStepTimeValidation: readonly ValidationRule[] = [
    {
        required: true,
        message: "Please enter the step time"
    },
    {
        type: "number",
        min: 0,
        max: 999,
        message: "Please provide a valid time in minutes"
    }
];
