

export interface IOrder  {
    by: string
    to: string
    status: string
    byIsConformed: boolean
    toIsConformed: boolean
    price: number
    paymentMethod: string
    categoryId: string
    rate: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}