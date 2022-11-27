

export interface IWorkHistory  {
    userId: string
    location: string
    img: string[]
    comment: Array<{ userId: string, comment: string }>
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}