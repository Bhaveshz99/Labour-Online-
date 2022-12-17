import React from 'react'
import { Card, Carousel } from 'antd'
import { Link } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
interface categoryCardTypes {
    categoryId: string,
    categoryName: string,
    imgs: string[],
}

const CategoryCard = ({ categoryId, imgs, categoryName }: categoryCardTypes) => {

    return (
        <div className='home_card'>
            <Link to={`service-list/${categoryId}`}>

                <Card >
                    <Carousel style={{
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                    }}
                        dotPosition={"bottom"} autoplay autoplaySpeed={3000} draggable={true} touchMove={true}
                    >
                        {imgs.map((img) => {
                            return (
                                <div className='img'>
                                    <ImgSrc src={img} />
                                </div>
                            )
                        })}

                    </Carousel>

                    <div className='content'>
                        <h3 className='category_name'>{categoryName}</h3>
                    </div>
                </Card>
            </Link>

        </div>
    )
}

export default CategoryCard