import React from 'react'
import CategoryCard from './CategoryCard'
import CategoryImage1 from '../../assets/images/CategoryImage1.png'
const CategorySection = () => {
    return (
        <div className='category_section'>
            <h3 className='title'>Categories</h3>
            <div className='category_list'>
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
                <CategoryCard categoryName='Carpenter' img={CategoryImage1} />
            </div>
        </div>
    )
}

export default CategorySection