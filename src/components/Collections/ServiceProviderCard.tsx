import React, { useState } from 'react'
import { Avatar, Card, Carousel, Col, Row, Rate, Button, Drawer, Modal, Space } from 'antd'
import { UserAddOutlined, } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ImgSrc from '../CommonComponents/ImgSrc'
import ServiceReviewsModal from './ServiceReviewsModal'
import ServiceRequestModal from './ServiceRequestModal'
import { getTokenPass, errorToast } from '../../utils'
import { IUser } from "../../interfaces/user";
interface serviceProviderCardTypes extends IUser {
    labourId: Number
}

const ServiceProviderCard = (props: any, key: number) => {

    const { data } = props;

    let hasToken = getTokenPass()
    const [showRequestModal, setShowRequestModal] = useState<boolean>(false)
    const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <section className='service_provider_card'>
            <Row>
                <Col lg={8} xs={24} sm={24} md={8}>
                    <ImgSrc src='https://img.freepik.com/premium-photo/positive-rep…own-apron-ready-house-renovation_176532-11139.jpg' alt='' />
                </Col>
                <Col className='content_area' xs={24} sm={24} lg={16} md={16}>
                    <div>
                        <div className='name_area'>
                            <div className='avatar'>
                                <Avatar size="large" icon={<UserAddOutlined />} />
                            </div>
                            <div className='name_section'>
                                <h3 className='name'>{data?.fullName}</h3>
                                <div className='rate_review'>
                                    <Rate value={3} />
                                    <span > 218 Reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div>

                                {data?.price && <p> <label>Rate :-</label> ₹ {data?.price}/Day </p>}
                                <p> <label>Mother Tongue :- </label> English </p>
                                <p> <label > Service Locations :- </label> {
                                    data?.needsLocationId?.map((d: any, i: number) => {
                                        return (
                                            <span key={'d' + i}>{d?.name},{d?.state} </span>
                                        )
                                    })
                                } </p>
                                <div className='actions'>
                                    <Space>
                                        <Button onClick={showModal}>Show Details</Button>
                                        <Button onClick={() => {
                                            if (hasToken) setShowRequestModal(true)
                                            else {
                                                errorToast('Please Login')
                                                navigate('/login')
                                            }
                                        }}>
                                            Request
                                        </Button>
                                    </Space>
                                    <p className='reviews' onClick={() => { setShowReviewsModal(true) }}> <u> Reviews </u> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <p><b>Full Name : </b> {data?.fullName}</p>
                <p><b>Email : </b>{data?.email}</p>
                <p><b>Mobile : </b> <a href={`tel:${data?.mobile}`}>{data?.mobile} </a></p>
                {data?.price && <p><b>Price : </b>{data?.price}</p>}
                {/* <p><b>Price : </b>{data?.price}</p> */}

            </Modal>
            {showReviewsModal &&
                <ServiceReviewsModal showReviewsModal={showReviewsModal} setShowReviewsModal={setShowReviewsModal} />
            }
            {showRequestModal &&
                <ServiceRequestModal data={data} showRequestModal={showRequestModal} setShowRequestModal={setShowRequestModal} />
            }

        </section>
    )
}

export default ServiceProviderCard