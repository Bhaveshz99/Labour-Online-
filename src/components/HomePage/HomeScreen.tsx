import React, { useState } from 'react'
import MobileBanner from '../../assets/images/HomeMobileBanner.png'
import ImgSrc from '../CommonComponents/ImgSrc'
import CategorySection from './CategorySection'
import { Carousel } from 'antd';
import type { DotPosition } from 'antd/es/carousel';
import TrendingCategories from './TrendingCategories'
import './home.scss'
const HomeScreen = () => {

    const contentStyle: React.CSSProperties = {
        height: '350px',
        lineHeight: '160px',
        textAlign: 'center',
        // background: '#364d79',
    };

    const [dotPosition, setDotPosition] = useState<DotPosition>('right');


    return (
        <div className='home_wrapper'>
            <div className='banner'>
                {/* <ImgSrc src={MobileBanner} /> */}
                <Carousel dotPosition={dotPosition} autoplay>
                    <div>
                        <img style={contentStyle} src="./assets/Carousel/img3.jpg" />
                    </div>
                    <div>
                        {/* <h3 style={contentStyle}>2</h3> */}
                        <img style={contentStyle} src="./assets/Carousel/img2.jpg" />
                    </div>
                    <div>
                        <img style={contentStyle} src="./assets/Carousel/img1.jpg" />
                        {/* <h3 style={contentStyle}>3</h3> */}
                    </div>
                    <div>
                        <img style={contentStyle} src="./assets/Carousel/img4.jpg" />
                        {/* <h3 style={contentStyle}>4</h3> */}
                    </div>
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