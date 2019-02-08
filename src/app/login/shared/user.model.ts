export interface User {
    id?: string;
    email?: string;
    name?: string;
    surname?: string;
    university?: string;
    department?: string;
    fieldOfStudy?: string;
    password?: string;
    confirmPassword?: string;
    isFriend?: boolean;
    isBlocked?: boolean;
}