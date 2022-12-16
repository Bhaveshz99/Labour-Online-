import React from 'react'
import { Card, Carousel } from 'antd'
import { Link } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
interface categoryCardTypes {
    categoryName: string,
    imgs: string[],
}

const CategoryCard = (props: categoryCardTypes) => {
    return (
        <div className='home_card'>
            <Link to='service-list'>

                <Card >
                    <Carousel style={{
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                    }}
                        dotPosition={"bottom"} autoplay autoplaySpeed={3000} draggable={true} touchMove={true}
                    >
                        {props.imgs.map((img) => {
                            return (
                                <div className='img'>
                                    <ImgSrc src={img} />
                                </div>
                            )
                        })}

                    </Carousel>

                    <div className='content'>
                        <h3 className='category_name'>{props.categoryName}</h3>
                    </div>
                </Card>
            </Link>

        </div>
    )
}

export default CategoryCard