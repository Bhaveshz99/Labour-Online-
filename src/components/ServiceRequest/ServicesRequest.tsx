import { UserOutlined, CheckOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, List, Table, Modal, Result, Typography } from 'antd'
import React, { useState } from 'react'

const { Paragraph, Text } = Typography
const ServicesRequest = () => {

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [modelType, setModalType] = useState<string>('');

	interface DataType {
		avatar: JSX.Element,
		customer_name: string,
		date_time: DataType,
		address: string,
		price: number,
		status: string
	}

	const handleRequestAction = (rowData: any, confirmRequest: boolean, ind: number) => {
		console.log(rowData);
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
			customer_name: 'Rahul',
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
			dataIndex: "customer_name",
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
					<Button type="primary" onClick={() => { handleRequestAction(record, true, index) }}> <CheckOutlined /> </Button>
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
						<Table dataSource={data} columns={columns} />
					</div>
					<div className="xs-show">
						<List
							itemLayout="horizontal"
							dataSource={data}
							renderItem={(item, i) => (
								<List.Item>
									<List.Item.Meta
										avatar={<UserOutlined />}
										title={<a href="https://ant.design">{item.customer_name}</a>}
										description={<div>
											<label> Date :-</label>	<p>{item.date_time}</p>
											<label> Price :-</label>	<p>{item.price}</p>

										</div>}
									/>
									<div>
										<div>
											<label> Address :-</label>	<p>{item.address}</p>

										</div>
										<div>
											<Button type="primary" onClick={() => { handleRequestAction(item, true, i) }}> <CheckOutlined /> </Button>
											<Button type="primary" onClick={() => { handleRequestAction(item, false, i) }} > <CloseOutlined />  </Button>

										</div>
									</div>
								</List.Item>
							)}
						/>
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

export default ServicesRequest