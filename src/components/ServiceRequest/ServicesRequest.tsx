import { UserOutlined, CheckOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography, Card, Avatar, Tag } from 'antd'
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

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');
	const [serviceList, setServiceList] = useState<any>([]);
	const [oridata, setOridata] = useState<any>([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reqObj, setReqObj] = useState({});
	const user = useSelector((store: any) => store.user[0]);

	const navigate = useNavigate();

	const { socket } = useContext(SocketContext);

	const getData = async () => {
		await callGet('/request/get').then((result: any) => {
			let serviceData: any = [];
			const data: any = result?.data?.data;
			setOridata(data);
			for (let i in data) {
				serviceData?.push({
					_id: data[i]._id,
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
			setServiceList(serviceData);
		})
	}
	useEffect(() => {
		getData();
	}, [])

	socket.on('resendRequest', (data: any) => {
		console.log('🚀 ~ file: ServicesRequest.tsx:54 ~ socket.on ~ data', data);
		setServiceList((oldArray: any) => [...oldArray, {
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
			socket.on("sendrequestTrue", (data: any) => {
				console.log('🚀 ~ file: ServicesRequest.tsx:83 ~ socket.on ~ data', data);
				if (data?.status) {
					navigate("/bookings")
				} else {
					setIsModalOpen(false);
				}
			})

		} else {
			user?._id == rowData?.to && (Obj.status = 'reject');
			user?._id == rowData?.by && (Obj.isDeleted = true);
			setReqObj(Obj);
		}
	}

	const handleAcceptRequest = (requestAction: boolean) => {
		socket.emit("requestFalse", reqObj)
		socket.on("sendRequestFalse", (data: any) => {
			if (data?.status) {
				setIsModalOpen(false);
				onModalClose();
				setServiceList([]);
				getData();
			} else {
				setIsModalOpen(false);
			}
		})
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
						<Table rowClassName={(record) => (record?.to == user?._id) ? 'active-row' : ''} dataSource={serviceList} columns={columns} />
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