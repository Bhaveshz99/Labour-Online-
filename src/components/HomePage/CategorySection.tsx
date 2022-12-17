import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import CategoryImage1 from '../../assets/images/CategoryImage1.png'
import { callPost } from '../../services/Apis'
const CategorySection = () => {

    const [categoryData, setCategoryData] = useState<any[]>([])

    useEffect(() => {
        fetchCategoriesData();
    }, [])

    const fetchCategoriesData = () => {
        callPost('/category/get', {
            page: 1,
            limit: 6
        }).then((res: any) => {
            setCategoryData(res.data.data)
        })
    }

    return (
        <div className='category_section'>
            <h3 className='title'>Categories</h3>
            <div className='category_list'>
                {categoryData.map((category) => {
                    return (
                        <CategoryCard categoryId={category?._id} categoryName={category?.name} imgs={category?.img} />
                    )
                })}
            </div>
        </div>
    )
}

export default CategorySection