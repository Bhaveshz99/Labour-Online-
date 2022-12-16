import React, { useState, useEffect } from 'react'
import { UserOutlined, CheckOutlined, CloseOutlined, EyeOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography, Card, Avatar } from 'antd'
import { UserProps } from '../../interfaces/user'
import { callPost } from '../../services/Apis'
import './bookings.scss'

const { Paragraph, Text } = Typography
const { Meta } = Card;
const Bookings: React.FC<UserProps> = (props: UserProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [modelType, setModalType] = useState<string>('');
    const [bookingsData, setBookingsData] = useState<any[]>([]);

    interface DataType {
        avatar: JSX.Element,
        name: string,
        date_time: DataType,
        address: string,
        price: number,
        status: string
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = () => {
        callPost('/orders/get', {}).then((res: any) => {
            console.log(res);
            setBookingsData(res.data.data)
        })
    }

    const handleRequestAction = (rowData: any, confirmRequest: boolean, ind: number) => {
        setSelectedIndex(ind)
        setModalType(confirmRequest ? 'accept' : 'cancel')
    }

    const handleAcceptRequest = (requestAction: boolean) => {

    }

    const onModalClose = () => {
        setSelectedIndex(-1);
        setModalType('')
    }



    let data = [
        {
            avatar: <UserOutlined />,
            name: 'Rahul',
            date_time: '12/12/2022',
            price: 300,
            address: 'London No. 1 Lake Park',
            status: 'pending'
        }
    ]
    let columns = [
        {
            dataIndex: "avatar",
            title: ""
        },
        {
            dataIndex: "name",
            title: "Customer name",
        },
        {
            dataIndex: "date_time",
            title: "Date Time",
        },
        {
            dataIndex: "price",
            title: "Price",
        },
        {
            dataIndex: "address",
            title: "Address",
        },
        {
            dataIndex: "",
            title: "Actions",
            render: (text: any, record: any, index: any) => (
                <>
                    <div onClick={() => { handleRequestAction(record, false, index) }} > <EyeOutlined />  </div>
                </>
            )
        },

    ]

    return (
        <div className='bookings_wrapper'>
            <div className="container">
                <div className='header'>
                    <h3> Bookings List </h3>
                </div>
                <div className="content">
                    <div className='xs-hide'>
                        <Table dataSource={data} columns={columns} />
                    </div>
                    <div className="xs-show">
                        <div className="service-requests">
                            {data.length > 0 && data.map((item, i) => {
                                return (
                                    <Card
                                        className='request-card'
                                    // actions={[
                                    //     <div className='accept-requests' onClick={() => { handleRequestAction(item, true, i) }}> Accept </div>,
                                    //     <div className='reject-requests' onClick={() => { handleRequestAction(item, false, i) }}> Reject </div>,
                                    // ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={`${item.name}`}
                                            description={
                                                <div>
                                                    <div>
                                                        <label> Date :-</label> <label>{item.date_time}</label>
                                                    </div>
                                                    <div>
                                                        <label> Price :-</label> <label>{item.price}</label>

                                                    </div>
                                                    <div>
                                                        <label> Address :-</label> <label>{item.address}</label>
                                                    </div>
                                                </div>
                                            }
                                        />

                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {selectedIndex >= 0 && modelType === 'cancel' && <>
                <Modal
                    className='reviews'
                    title="Cancel Service Request"
                    closable={true}
                    onCancel={onModalClose}
                    visible={selectedIndex > -1}
                    // onOk={<></>}
                    footer={null}
                >
                    <Result
                        status="error"
                        title="Cancel Service Request"
                        subTitle="Are you sure you want to Cancel this Service Request."
                        extra={[
                            <Button type="primary" key="console" onClick={() => { handleAcceptRequest(false) }}>
                                Cancel
                            </Button>
                        ]}
                    >
                        <div className="desc">
                            <Paragraph>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    The content you submitted has the following error:
                                </Text>
                            </Paragraph>
                            <Paragraph>
                                <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
                                frozen.
                            </Paragraph>
                            <Paragraph>
                                <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
                                eligible to apply.
                            </Paragraph>
                        </div>
                    </Result>

                </Modal>
            </>}

            {selectedIndex >= 0 && modelType === 'accept' && <>

            </>}
        </div>
    )
}

export default Bookings