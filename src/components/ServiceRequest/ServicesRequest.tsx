import { UserOutlined, CheckOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography, Card, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserProps } from '../../interfaces/user'
import moment from 'moment';
import './request-list.scss'
import { useSelector } from "react-redux";
import { callGet } from '../../services/Apis';
const { Paragraph, Text } = Typography
const { Meta } = Card;
const ServicesRequest: React.FC<UserProps> = (props: UserProps) => {

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');
	const [serviceList, setserviceList] = useState<any>([]);
	const user = useSelector((store: any) => store.user[0]);

	useEffect(() => {
		callGet('/request/get').then((result: any) => {
			const data: any = result?.data?.data;
			for (let i in data) {
				setserviceList([...serviceList, {
					userId: user?._id,
					avatar: data[i]?.to?.avatar || <UserOutlined />,
					name: data[i]?.to?.fullName,
					date: moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss'),
					address: data[i]?.addressId?.address,
					price: data[i]?.to?.price,
					status: data[i]?.status
				}]);
			}
		})
	}, [])

	const handleRequestAction = (rowData: any, confirmRequest: boolean, ind: number) => {
		console.log("🚀 ~ file: ServicesRequest.tsx:23 ~ handleRequestAction ~ rowData:-", rowData, "confirmRequest:-", confirmRequest, "ind:-", ind)
		setSelectedIndex(ind)
		setModalType(confirmRequest ? 'accept' : 'cancel')
	}

	const handleAcceptRequest = (requestAction: boolean) => {

	}

	const onModalClose = () => {
		setSelectedIndex(-1);
		setModalType('')
	}

	let columns = [
		{
			dataIndex: "avatar",
			title: "Image"
		},
		{
			dataIndex: "name",
			title: "Name",
		},
		{
			dataIndex: "date",
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
					{record.userId == user?._id ? <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { handleRequestAction(record, true, index) }}> <CheckOutlined /> </Button> : ''}
					<Button type="primary" onClick={() => { handleRequestAction(record, false, index) }} > <CloseOutlined />  </Button>
				</>
			)
		},

	]
	// moment(data[i]?.date).format('DD/MM/YYYY HH:mm:ss')
	return (
		<div className='request_list_wrapper'>
			<div className="container">
				<div className='header'>
					<h3> Service Requests </h3>
				</div>
				<div className="content">
					<div className='xs-hide'>
						<Table rowClassName={(record) => record.userId == user?._id ? 'active-row' : ''} dataSource={serviceList} columns={columns} />
					</div>
					<div className="xs-show">

						{/* <div className="service-requests">
							{serviceList.length > 0 && serviceList.map((item: any, i: number) => {
								return (
									<Card key={'d' + i}
										className='request-card'
										actions={[
											<div className='accept-requests' onClick={() => { handleRequestAction(item, true, i) }}> Accept </div>,
											<div className='reject-requests' onClick={() => { handleRequestAction(item, false, i) }}> Reject </div>,
										]}
									>
										<Meta
											avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
											title={`${item.name}`}
											description={
												<div>
													<div>
														<label> Date :-</label> <label>{item.date}</label>

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
						</div> */}
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

			{selectedIndex >= 0 && modelType === 'accept' && <>

			</>}
		</div>
	)
}

export default ServicesRequest