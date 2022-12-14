import React, { useState } from 'react'
import MobileBanner from '../../assets/images/HomeMobileBanner.png'
import ImgSrc from '../CommonComponents/ImgSrc'
import CategorySection from './CategorySection'
import { Carousel } from 'antd';
import type { DotPosition } from 'antd/es/carousel';
import { UserProps } from '../../interfaces/user'
import TrendingCategories from './TrendingCategories'
import './home.scss'
const HomeScreen : React.FC<UserProps> = (props: UserProps) => {

    const contentStyle: React.CSSProperties = {
        height: '400px',
        // width: 'auto',
        lineHeight: '160px',
        textAlign: 'center',
        // background: '#364d79',
    };

    window.innerWidth <= 768 && (contentStyle.height = "200px")

    const [dotPosition, setDotPosition] = useState<DotPosition>('top');

    const imgArr = [
        "./assets/Carousel/img3.jpg",
        "./assets/Carousel/img1.jpg",
        "./assets/Carousel/img2.jpg",
        "./assets/Carousel/img4.jpg",
        "./assets/Carousel/img5.jpg",
    ]

    return (
        <div className='home_wrapper'>
            <div className='banner'>
                <Carousel dotPosition={"bottom"} autoplay autoplaySpeed={3000} draggable={true} touchMove={true}>
                    {
                        imgArr.map((src: string) => {
                            return <div>
                                <img style={contentStyle} src={src} />
                            </div>
                        })
                    }
                </Carousel>
            </div>
            <div className='container'>
                <CategorySection />
            </div>
            {/* <TrendingCategories /> */}
        </div>
    )
}

export default HomeScreen