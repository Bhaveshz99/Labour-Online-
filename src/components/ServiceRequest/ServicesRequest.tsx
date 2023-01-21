import { UserOutlined, CheckOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography, Card, Avatar, Tag } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
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

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');
	const [serviceList, setserviceList] = useState<any>([]);
	const user = useSelector((store: any) => store.user[0]);
	let serviceData: any = [];

	const { socket } = useContext(SocketContext);
	useEffect(() => {
		callGet('/request/get').then((result: any) => {
			const data: any = result?.data?.data;
			console.log("🚀 ~ file: ServicesRequest.tsx:25 ~ callGet ~ data", data)
			for (let i in data) {
				serviceData?.push({
					by: data[i]?.by?._id,
					to: data[i]?.to?._id,
					avatar: data[i]?.to?.avatar || <UserOutlined />,
					name: user?._id == data[i]?.by?._id ? data[i]?.to?.fullName : data[i]?.by?.fullName,
					date: moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss'),
					address: data[i]?.addressId?.address,
					price: data[i]?.to?.price,
					status: data[i]?.status
				});
			}
			setserviceList(serviceData);
		})
	}, [])

	socket.on('resendRequest', (data: any) => {
		console.log("🚀 ~ file: ServicesRequest.tsx:43 ~ socket.on ~ data -------->", data)
		setserviceList((oldArray: any) => [...oldArray, {
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
			by: data?.by?._id,
			to: data?.to?._id,
			avatar: data?.to?.avatar || <UserOutlined />,
			name: user?._id == data?.by?._id ? data?.to?.fullName : data?.by?.fullName,
			date: moment(data?.date).format('DD/MM/YYYY HH:mm:ss'),
			address: data?.addressId?.address,
			price: data?.to?.price,
			status: data?.status
		});
	})

	const handleRequestAction = (rowData: any, confirmRequest: boolean, ind: number) => {
		console.log("🚀 ~ file: ServicesRequest.tsx:23 ~ handleRequestAction ~ rowData:-", rowData, "confirmRequest:-", confirmRequest, "ind:-", ind)
		setSelectedIndex(ind)
		setModalType(confirmRequest ? 'accept' : 'cancel')
		let Obj: any = {};
		if (confirmRequest) {

		} else {
			user?._id == rowData?.to && (Obj.status = 'reject');;
			user?._id == rowData?.by && (Obj.isDeleted = true);
			socket.emit("requestFalse", Obj)
			socket.on("sendRequestFalse", (data: any) => {
				console.log("🚀 ~ file: ServicesRequest.tsx:63 ~ socket.on ~ data", data)
			})
		}
	}

	const handleAcceptRequest = (requestAction: boolean) => {

	}

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
					{record?.status == "pending" && <Tag color='yellow'>{record?.status}</Tag>}
					{record?.status == "success" && <Tag color='green'>{record?.status}</Tag>}
					{record?.status == "reject" && <Tag color='red'>{record?.status}</Tag>}
				</>
			),
		},
		{
			dataIndex: "",
			key: "actions",
			title: "Actions",
			render: (text: any, record: any, index: any) => (
				<>
					{record?.to == user?._id ? <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { handleRequestAction(record, true, index) }}> <CheckOutlined /> </Button> : ''}
					<Button type="primary" onClick={() => { handleRequestAction(record, false, index) }} > <CloseOutlined />  </Button>
				</>
			)
		},

	]

	return (
		<div className='request_list_wrapper'>
			<div className="container">
				<div className='header'>
					<h3> Service Requests </h3>
				</div>
				<div className="content">
					<div className='xs-hide'>
						<Table rowClassName={(record) => (record?.to == user?._id) ? 'active-row' : ''} dataSource={serviceList || serviceData} columns={columns} />
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