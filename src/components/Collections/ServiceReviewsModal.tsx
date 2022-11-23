import React, { useEffect, useState } from 'react'
import { List, Avatar, Drawer, Modal } from 'antd'
interface ReviewItemTypes {
    title: String
}

interface ServiceReviewsModalTypes {
    showReviewsModal: boolean,
    setShowReviewsModal(a: boolean): void
}
const ServiceReviewsModal = (props: ServiceReviewsModalTypes) => {

    const [reviews, setReviews] = useState<ReviewItemTypes[]>([])

    useEffect(() => {
        setReviews([
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ])
    })


    let content = <div>
        <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    </div>

    return (
        <div>
            {window.innerWidth <= 768 && <Drawer
                className='reviews'
                title="Rakesh's Reviews"
                placement={"bottom"}
                closable={true}
                onClose={() => { props.setShowReviewsModal(false) }}
                visible={props.showReviewsModal}
            >
                {content}
            </Drawer>}
            {window.innerWidth > 768 && <Modal
                className='reviews'
                title="Reviews"
                visible={props.showReviewsModal}
                onCancel={() => { props.setShowReviewsModal(false) }}
                footer={null}
            >
                {content}
            </Modal>}

        </div>

    )
}

export default ServiceReviewsModal