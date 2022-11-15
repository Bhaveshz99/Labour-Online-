import React from 'react'
import { Card } from 'antd'
import ImgSrc from '../CommonComponents/ImgSrc'
interface categoryCardTypes {
    categoryName: string,
    img: string,
}

const CategoryCard = (props: categoryCardTypes) => {
    return (
        <div className='home_card'>
            <Card >
                <ImgSrc src={props.img} />
                <div>
                    <h5 className='category_name'>{props.categoryName}</h5>
                </div>
            </Card>
        </div>
    )
}

export default CategoryCard