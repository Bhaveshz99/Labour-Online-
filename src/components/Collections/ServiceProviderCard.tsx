import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
interface serviceProviderCardTypes {
    labourId: Number
}

const ServiceProviderCard = (props: serviceProviderCardTypes) => {
    return (
        <section className=''>
            <Link to='service/ab'>
                <Card >
                    <ImgSrc src={''} />
                    <div className='content'>
                        <h3 className='category_name'></h3>
                        <p className='price'>Rs. 400 Onwards</p>
                    </div>
                </Card>

            </Link>
        </section>
    )
}

export default ServiceProviderCard