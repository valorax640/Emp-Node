export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'User registered successfully',
    DATA_FETCH_SUCCESS: 'Data fetched successfully',
    DATA_CREATED: 'Data created successfully',
    DATA_UPDATED: 'Data updated successfully',
    DATA_DELETED: 'Data deleted successfully'
};

export const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    USER_ALREADY_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    TOKEN_EXPIRED: 'Token expired',
    INVALID_TOKEN: 'Invalid token',
    EMAIL_ALREADY_EXISTS: 'Email already exists'
};

export const VALIDATION_MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email format is invalid',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN: 'Password must be at least 6 characters',
    FIRST_NAME_REQUIRED: 'First name is required',
    FIRST_NAME_MIN: 'First name must be at least 2 characters',
    FIRST_NAME_MAX: 'First name must be at most 50 characters',
    LAST_NAME_REQUIRED: 'Last name is required',
    LAST_NAME_MIN: 'Last name must be at least 2 characters',
    LAST_NAME_MAX: 'Last name must be at most 50 characters',
    
    DEPARTMENT_NAME_REQUIRED: 'Department name is required',
    DEPARTMENT_NAME_MIN: 'Department name must be at least 2 characters',
    DEPARTMENT_NAME_MAX: 'Department name must be at most 100 characters'
};
