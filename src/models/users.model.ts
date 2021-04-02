export interface Users {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string | File,
    permission: string
}