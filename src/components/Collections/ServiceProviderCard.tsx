import React, { useState } from 'react'
import { Avatar, Card, Carousel, Col, Row, Rate, Button, Drawer, Modal } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ImgSrc from '../CommonComponents/ImgSrc'
import ServiceReviewsModal from './ServiceReviewsModal'
import ServiceRequestModal from './ServiceRequestModal'
import { getTokenPass, errorToast } from '../../utils'

interface serviceProviderCardTypes {
    labourId: Number
}

const ServiceProviderCard = (props: serviceProviderCardTypes) => {
    let hasToken = getTokenPass()
    const [showRequestModal, setShowRequestModal] = useState<boolean>(false)
    const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false)

    const user = useSelector((store: any) => store.users);
    const navigate = useNavigate();
    const onServiceRequest = () => {

    }

    // const handle

    return (
        <section className='service_provider_card'>
            <Row>
                <Col lg={8} xs={24} sm={24} md={8}>
                    <Carousel style={{
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                    }}
                        dotPosition={"bottom"} autoplay autoplaySpeed={3000} draggable={true} touchMove={true}
                    >
                        <div>
                            <ImgSrc src='https://www.energosindia.com/images/plumber.jpg' />
                        </div>

                        <div>
                            <ImgSrc src='https://www.energosindia.com/images/plumber.jpg' />
                        </div>

                        <div>
                            <ImgSrc src='https://www.energosindia.com/images/plumber.jpg' />
                        </div>
                    </Carousel>
                </Col>
                <Col className='content_area' xs={24} sm={24} lg={16} md={16}>
                    <div>
                        <div className='name_area'>
                            <div className='avatar'>
                                <Avatar size="large" icon={<UserAddOutlined />} />
                            </div>
                            <div className='name_section'>
                                <h3 className='name'>Rakesh Ojha</h3>
                                <div className='rate_review'>
                                    <Rate value={3} />
                                    <span > 218 Reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div>

                                <p> <label>Rate :-</label> ₹ 400/Day </p>
                                <p> <label>Mother Tongue :- </label> Gujarati </p>
                                <p> <label > Service Locations :- </label> Ghatloadia, Satellite, Vejalpur </p>
                                <div className='actions'>
                                    <Button onClick={() => {
                                        if (hasToken) { setShowRequestModal(true) }
                                        else {
                                            errorToast('Please Login')
                                            navigate('/login')
                                        }
                                    }}>
                                        Request
                                    </Button>
                                    <p className='reviews' onClick={() => { setShowReviewsModal(true) }}> <u> Reviews </u> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            {showReviewsModal &&
                <ServiceReviewsModal showReviewsModal={showReviewsModal} setShowReviewsModal={setShowReviewsModal} />
            }
            {showRequestModal &&
                <ServiceRequestModal showRequestModal={showRequestModal} setShowRequestModal={setShowRequestModal} />
            }

        </section>
    )
}

export default ServiceProviderCard