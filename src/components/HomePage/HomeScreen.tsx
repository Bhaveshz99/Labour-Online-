import React from 'react'
import MobileBanner from '../../assets/images/HomeMobileBanner.png'
import ImgSrc from '../CommonComponents/ImgSrc'
import CategorySection from './CategorySection'
import TrendingCategories from './TrendingCategories'
import './home.scss'
const HomeScreen = () => {

    return (
        <div className='home_wrapper'>
            <div className='banner'>
                <ImgSrc src={MobileBanner} />
            </div>
            <div className='container'>
                <CategorySection />
            </div>
            {/* <TrendingCategories /> */}
        </div>
    )
}

export default HomeScreen