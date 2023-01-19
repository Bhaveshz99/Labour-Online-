import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import CategoryImage1 from '../../assets/images/CategoryImage1.png'
import { callGet } from '../../services/Apis'
import { Pagination } from "antd";
const CategorySection = () => {

    const [categoryData, setCategoryData] = useState<any[]>([])

    useEffect(() => {
        // fetchCategoriesData();
        // const handlePagination = (page: number, limit: number) => {
        callGet('/category/get/1/6').then((res: any) => {
            setCategoryData(res.data.data)
        })
        // }
    }, [])

    // const fetchCategoriesData = () => {
    //     callGet('/category/get/1/6').then((res: any) => {
    //         setCategoryData(res.data.data)
    //     })
    // }

    const handlePagination = (page: number, limit: number) => {
        callGet(`/category/get/${page}/${limit}`).then((res: any) => {
            setCategoryData(res.data.data)
        })
    }

    return (
        <div className='category_section'>
            <h3 className='title'>Categories</h3>
            <div className='category_list'>
                {categoryData.map((category: any, i: number) => {
                    return (
                        <CategoryCard key={'d' + i} categoryId={category?._id} categoryName={category?.name} imgs={category?.img} />
                    )
                })}

            </div>
            <Pagination className='category_list' onChange={handlePagination} defaultCurrent={1} defaultPageSize={6} total={127} />
        </div>
    )
}

export default CategorySection