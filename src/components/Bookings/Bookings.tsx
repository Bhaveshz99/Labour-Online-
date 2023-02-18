import React, { useState, useEffect, useContext } from 'react'
import { UserOutlined, CheckOutlined, CloseOutlined, EyeOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography, Card, Avatar, Tag, message } from 'antd'
import { UserProps } from '../../interfaces/user'
import moment from 'moment';
import SocketContext from "../../context/socket/socketContext";
import { useSelector } from "react-redux";
import './bookings.scss';
import type { ColumnsType } from 'antd/es/table';
import { callGet } from '../../services/Apis';

const { Paragraph, Text } = Typography
const { Meta } = Card;
const Bookings: React.FC<UserProps> = (props: UserProps) => {

    const [messageApi, contextHolder] = message.useMessage();
    const { socket } = useContext(SocketContext);
    const user = useSelector((store: any) => store.user[0]);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [modelType, setModalType] = useState<string>('');
    const [bookingList, setBookingList] = useState<any>([]);
    const [tableData, setTableData] = useState([]);
    const [tempObj, setTempObj] = useState<any>({});

    const Message = (type: any, content: any) => {
        messageApi.open({
            type,
            content
        })
    }

    interface DataType {
        avatar: JSX.Element,
        name: string,
        date_time: DataType,
        address: string,
        price: number,
        status: string
    }

    const getBookingList = async () => {
        await callGet('/order/get').then((result: any) => {
            let data = result?.data?.data, serviceArr: any = [];
            setBookingList(data);
            for (let i in data) {
                serviceArr.push({
                    _id: data?.[i]?._id,
                    by: data[i]?.by?._id,
                    to: data[i]?.to?._id,
                    name: user?._id === data[i]?.by?._id ? data[i]?.to?.fullName : data[i]?.by?.fullName,
                    date: moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss'),
                    address: data[i]?.addressId?.address,
                    price: data[i]?.to?.price,
                    category: data[i]?.categoryId?.name,
                    status: data[i]?.status
                })
            }
            setTableData(serviceArr);
        });
    }

    useEffect(() => {
        getBookingList();
    }, [])

    const handleOrderAction = (rowData: any, confirmOrder: boolean, ind: number) => {
        setSelectedIndex(ind)
        setModalType(confirmOrder ? 'accept' : 'cancel')
        if (confirmOrder) {
            socket.emit('orderTrue', { _id: rowData?._id, userId: user?._id });
        } else {
            setTempObj(rowData);
        }
    }

    socket.off('sendOrderTrue').on('sendOrderTrue', ({ status, data }: any) => {
        console.log('🚀 ~ file: Bookings.tsx:88 ~ socket.off ~ status, data ', status, data);
        if (status) {
            setTableData(tableData.filter((item: any) => item?._id !== data?._id));
            const ind: number = tableData.findIndex((i: any) => i?._id == data?._id);
            let tem: any = tableData;
            tem[ind] = data;
            setTableData(tem);
        } else {
            Message('error', 'Something went wrong')
        }
    })

    socket.off('sendOrderFalse').on('sendOrderFalse', ({ status, data }: any) => {
        console.log('🚀 ~ file: Bookings.tsx:88 ~ socket.off ~ status, data ', status, data);
        if (status) {
            setTableData(tableData.filter((item: any) => item?._id !== data?._id));
        } else {
            Message('error', 'Something went wrong')
        }
    })

    const handleCancleOrder = (OrderAction: boolean) => {
        socket.emit("orderFalse", { _id: tempObj?._id });
    }

    const onModalClose = () => {
        setSelectedIndex(-1);
        setModalType('')
    }

    let columns: ColumnsType<DataType> = [
        {
            dataIndex: "name",
            key: "name",
            title: "Name",
        },
        {
            dataIndex: "date",
            key: "date",
            title: "Date Time",
        },
        {
            dataIndex: "price",
            key: "price",
            title: "Price",
        },
        {
            dataIndex: "category",
            key: "category",
            title: "Category",
        },
        {
            dataIndex: "address",
            key: "address",
            title: "Address",
        },
        {
            dataIndex: "status",
            key: "status",
            title: "Status",
            render: (_, record: DataType) => (
                <>
                    {record?.status === "progress" && <Tag color='yellow'>{record?.status}</Tag>}
                    {record?.status === "complete" && <Tag color='green'>{record?.status}</Tag>}
                </>
            ),
        },
        {
            dataIndex: "",
            key: "actions",
            title: "Actions",
            render: (text: any, record: any, index: any) => (
                <>
                    <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { handleOrderAction(record, true, index) }}> <CheckOutlined /> </Button>
                    <Button type="primary" onClick={() => { handleOrderAction(record, false, index) }} > <CloseOutlined />  </Button>
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
                        <Table dataSource={tableData} columns={columns} />
                    </div>
                </div>
            </div>
            {selectedIndex >= 0 && modelType === 'cancel' && <>
                <Modal
                    className='reviews'
                    title="Cancel Service Order"
                    closable={true}
                    onCancel={onModalClose}
                    visible={selectedIndex > -1}
                    // onOk={<></>}
                    footer={null}
                >
                    <Result
                        status="error"
                        title="Cancel Booking "
                        subTitle="Are you sure you want to Cancel this Booking."
                        extra={[
                            <Button type="primary" key="console" onClick={() => { handleCancleOrder(false) }}>
                                Cancel
                            </Button>
                        ]}
                    >
                    </Result>

                </Modal>
            </>}

            {selectedIndex >= 0 && modelType === 'accept' && <>

            </>}
        </div>
    )
}

export default Bookings