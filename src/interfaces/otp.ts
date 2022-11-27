

export interface IOtp  {
    userId: string
    otp: number
    mobile: number
    messageFor: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}