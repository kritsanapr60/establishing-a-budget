export interface Notification {
    _id: string,
    dateTime: Date,
    type: string,
    status: string,
    detail: string,
    note: string,
    readStatus: boolean,
    userId: string,
    creator: string
}