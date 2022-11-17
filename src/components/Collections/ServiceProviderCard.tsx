import React, { useState } from 'react'
import { Avatar, Card, Col, Row, Rate, Button, Drawer, Modal } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
import ServiceReviewsModal from './ServiceReviewsModal'
import ServiceRequestModal from './ServiceRequestModal'

interface serviceProviderCardTypes {
    labourId: Number
}

const ServiceProviderCard = (props: serviceProviderCardTypes) => {

    const [showRequestModal, setShowRequestModal] = useState(false)
    const [showReviewsModal, setShowReviewsModal] = useState(false)

    const onServiceRequest = () => {

    }

    return (
        <section className='service_provider_card'>
            <Row>
                <Col lg={8} xs={24} sm={24} md={8}>
                    <ImgSrc src='https://www.energosindia.com/images/plumber.jpg' />
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
                                    <Button onClick={() => { setShowRequestModal(true) }}>
                                        Request
                                    </Button>
                                    <p className='reviews' onClick={() => { setShowReviewsModal(true) }}> <u> Reviews </u> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            {window.innerWidth < 768 && showRequestModal &&
                <Drawer
                    className='booking'
                    title="Booking"
                    placement={"bottom"}
                    closable={true}
                    onClose={() => { setShowRequestModal(false) }}
                    visible={showRequestModal}
                >
                    <ServiceRequestModal />
                </Drawer>}
            {window.innerWidth < 768 && showReviewsModal &&
                <Drawer
                    className='reviews'
                    title="Rakesh's Reviews"
                    placement={"bottom"}
                    closable={true}
                    onClose={() => { setShowReviewsModal(false) }}
                    visible={showReviewsModal}
                >
                    <ServiceReviewsModal />
                </Drawer>}
            {window.innerWidth >= 768 && showRequestModal &&
                <Modal
                    className='booking'
                    title="Booking"
                    visible={showRequestModal}
                    // onOk={this.hideModal}
                    onCancel={() => { setShowRequestModal(false) }}

                >
                    <ServiceRequestModal />
                </Modal>
            }
            {window.innerWidth >= 768 && showReviewsModal &&
                <Modal
                    className='reviews'
                    title="Reviews"
                    visible={showReviewsModal}
                    onCancel={() => { setShowReviewsModal(false) }}
                // onOk={this.hideModal}
                >
                    <ServiceReviewsModal />
                </Modal>
            }

        </section>
    )
}

export default ServiceProviderCard