import { UserOutlined, CheckOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { Button, List, Table, Modal, Result, Typography, Card, Avatar, Tag } from 'antd'
=======
import { Button, List, Table, Modal, Result, Typography, Card, Avatar, Tag, message } from 'antd'
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserProps } from '../../interfaces/user'
import moment from 'moment';
import SocketContext from "../../context/socket/socketContext";
import './request-list.scss'
import { useSelector } from "react-redux";
import { callGet } from '../../services/Apis';
import type { ColumnsType } from 'antd/es/table';
const { Paragraph, Text } = Typography
const { Meta } = Card;
const ServicesRequest: React.FC<UserProps> = (props: UserProps) => {

<<<<<<< HEAD
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');
	const [serviceList, setserviceList] = useState<any>([]);
	const [oridata, setOridata] = useState<any>([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reqObj, setReqObj] = useState({});
	const user = useSelector((store: any) => store.user[0]);

	const navigate = useNavigate();
	let serviceData: any = [];

	const { socket } = useContext(SocketContext);

	const getData = async () => {
		await callGet('/request/get').then((result: any) => {
=======
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const { socket } = useContext(SocketContext);
	const user = useSelector((store: any) => store.user[0]);

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');
	const [serviceList, setServiceList] = useState<any>([]);
	const [oridata, setOridata] = useState<any>([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reqObj, setReqObj] = useState({});

	const Message = (type: any, content: any) => {
		messageApi.open({
			type,
			content
		})
	}


	const getData = async () => {
		await callGet('/request/get').then((result: any) => {
			let serviceData: any = [];
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
			const data: any = result?.data?.data;
			setOridata(data);
			for (let i in data) {
				serviceData?.push({
					_id: data[i]._id,
					by: data[i]?.by?._id,
					to: data[i]?.to?._id,
					avatar: data[i]?.to?.avatar || <UserOutlined />,
<<<<<<< HEAD
					name: user?._id == data[i]?.by?._id ? data[i]?.to?.fullName : data[i]?.by?.fullName,
					date: moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss'),
					address: data[i]?.addressId?.address,
=======
					name: user?._id === data[i]?.by?._id ? data[i]?.to?.fullName : data[i]?.by?.fullName,
					date: moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss'),
					address: data[i]?.addressId?.address,
					category: data[i]?.categoryId?.name,
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
					price: data[i]?.to?.price,
					status: data[i]?.status
				});
			}
<<<<<<< HEAD
			setserviceList(serviceData);
=======
			setServiceList(serviceData);
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
		})
	}
	useEffect(() => {
		getData();
	}, [])

<<<<<<< HEAD
	socket.on('resendRequest', (data: any) => {
		setserviceList((oldArray: any) => [...oldArray, {
			_id: data?._id,
			by: data?.by?._id,
			to: data?.to?._id,
			avatar: data?.to?.avatar || <UserOutlined />,
			name: user?._id == data?.by?._id ? data?.to?.fullName : data?.by?.fullName,
			date: moment(data?.date).format('DD/MM/YYYY HH:mm:ss'),
			address: data?.addressId?.address,
			price: data?.to?.price,
			status: data?.status
		}]);
		serviceData?.push({
			_id: data?._id,
			by: data?.by?._id,
			to: data?.to?._id,
			avatar: data?.to?.avatar || <UserOutlined />,
			name: user?._id == data?.by?._id ? data?.to?.fullName : data?.by?.fullName,
			date: moment(data?.date).format('DD/MM/YYYY HH:mm:ss'),
			address: data?.addressId?.address,
			price: data?.to?.price,
			status: data?.status
		});
=======
	socket.off('resendRequest').on('resendRequest', ({ status, data }: any) => {
		if (status) {
			setServiceList((oldArray: any) => oldArray.concat({
				_id: data?._id,
				by: data?.by?._id,
				to: data?.to?._id,
				avatar: (user?._id === data?.by?._id ? data?.to?.avatar : data?.by?.avatar) || <UserOutlined />,
				name: user?._id === data?.by?._id ? data?.to?.fullName : data?.by?.fullName,
				date: moment(data?.date).format('DD/MM/YYYY HH:mm:ss'),
				address: data?.addressId?.address,
				category: data?.categoryId?.name,
				price: data?.to?.price,
				status: data?.status
			}));
		} else {
			Message('error', 'Something went wrong')
		}
	})

	socket.off('requestTrue').on('requestTrue', ({ status, data }: any) => {
		console.log('🚀 ~ file: ServicesRequest.tsx:81 ~ socket.off ~ data', data);
		if (status) {
			setServiceList(serviceList.filter((item: any) => item?._id !== data?._id));
		} else {
			Message('error', 'Something went wrong')
		}

	})

	socket.off('requestFalse').on('requestFalse', ({ status, data }: any) => {
		console.log('🚀 ~ file: ServicesRequest.tsx:90 ~ socket.off ~ data', data);
		if (status) {
			setServiceList(serviceList.filter((item: any) => item?._id !== data?._id));
		} else {
			Message('error', 'Something went wrong')
		}

>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
	})

	const handleRequestAction = (rowData: any, confirmRequest: boolean, ind: number) => {
		setSelectedIndex(ind)
		setModalType(confirmRequest ? 'accept' : 'cancel')
		let Obj: any = {
			_id: rowData?._id,
			date: oridata[ind]?.date,
			by: rowData?.by,
			to: rowData?.to,
			price: rowData?.price,
			categoryId: oridata[ind]?.categoryId?._id,
			addressId: oridata[ind]?.addressId?._id,
		};
		if (confirmRequest) {
			socket.emit("requestTrue", Obj)
<<<<<<< HEAD
			socket.on("sendrequestTrue", (data: any) => {
				if (data?.status) {
					navigate("/bookings")
				} else {
					setIsModalOpen(false);
				}
			})

		} else {
			user?._id == rowData?.to && (Obj.status = 'reject');
			user?._id == rowData?.by && (Obj.isDeleted = true);
=======

		} else {
			user?._id === rowData?.to && (Obj.status = 'reject');
			user?._id === rowData?.by && (Obj.isDeleted = true);
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
			setReqObj(Obj);
		}
	}

	socket.off('sendrequestTrue').on("sendrequestTrue", (data: any) => {
		console.log('🚀 ~ file: ServicesRequest.tsx:83 ~ socket.on ~ data', data);
		if (data?.status) {
			navigate("/bookings")
		} else {
			setIsModalOpen(false);
		}
	})

	const handleAcceptRequest = (requestAction: boolean) => {
		socket.emit("requestFalse", reqObj)
<<<<<<< HEAD
		socket.on("sendRequestFalse", (data: any) => {
			if (data?.status) {
				setIsModalOpen(false);
				onModalClose();
				setserviceList([]);
				getData();
			} else {
				setIsModalOpen(false);
			}
		})
=======
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
	}

	socket.off('sendRequestFalse').on("sendRequestFalse", (data: any) => {
		if (data?.status) {
			setIsModalOpen(false);
			onModalClose();
			setServiceList([]);
			getData();
		} else {
			setIsModalOpen(false);
		}
	})

	const onModalClose = () => {
		setSelectedIndex(-1);
		setModalType('')
	}

	interface DataType {
		by: string
		to: string
		avatar: string
		name: string
		date: number
		address: string
		price: number
		status: string
	}

	let columns: ColumnsType<DataType> = [
		{
			dataIndex: "avatar",
			key: "avatar",
			title: "Image"
		},
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
<<<<<<< HEAD
					{record?.status == "pending" && <Tag color='yellow'>{record?.status}</Tag>}
					{record?.status == "success" && <Tag color='green'>{record?.status}</Tag>}
					{record?.status == "reject" && <Tag color='red'>{record?.status}</Tag>}
=======
					{record?.status === "pending" && <Tag color='yellow'>{record?.status}</Tag>}
					{record?.status === "success" && <Tag color='green'>{record?.status}</Tag>}
					{record?.status === "reject" && <Tag color='red'>{record?.status}</Tag>}
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
				</>
			),
		},
		{
			dataIndex: "",
			key: "actions",
			title: "Actions",
			render: (text: any, record: any, index: any) => (
				<>
<<<<<<< HEAD
					{record?.to == user?._id ? <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { handleRequestAction(record, true, index) }}> <CheckOutlined /> </Button> : ''}
=======
					{record?.to === user?._id ? <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { handleRequestAction(record, true, index) }}> <CheckOutlined /> </Button> : ''}
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
					<Button type="primary" onClick={() => { handleRequestAction(record, false, index) }} > <CloseOutlined />  </Button>
				</>
			)
		},

	]

	return (
		<div className='request_list_wrapper'>
			{contextHolder}
			<div className="container">
				<div className='header'>
					<h3> Service Requests </h3>
				</div>
				<div className="content">
					<div className='xs-hide'>
<<<<<<< HEAD
						<Table rowClassName={(record) => (record?.to == user?._id) ? 'active-row' : ''} dataSource={serviceList || serviceData} columns={columns} />
=======
						<Table rowClassName={(record) => (record?.to === user?._id) ? 'active-row' : ''} dataSource={serviceList} columns={columns} />
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
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
					</Result>
				</Modal>
			</>}

			{selectedIndex >= 0 && modelType === 'accept' && <></>}
		</div>
	)
}

export default ServicesRequest