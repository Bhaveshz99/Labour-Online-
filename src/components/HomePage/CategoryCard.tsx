import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
interface categoryCardTypes {
    categoryName: string,
    img: string,
}

const CategoryCard = (props: categoryCardTypes) => {
    return (
        <div className='home_card'>
            <Link to='service-list'>
                <Card >
                    <ImgSrc src={props.img} />
                    <div className='content'>
                        <h3 className='category_name'>{props.categoryName}</h3>
                    </div>
                </Card>
        
            </Link>
        </div>
    )
}

export default CategoryCard