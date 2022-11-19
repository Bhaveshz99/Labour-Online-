import React, { useEffect, useState } from 'react'
import { List, Avatar } from 'antd'
const ServiceReviewsModal = () => {

    interface ReviewItemTypes {
        title: String
    }
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

    return (
        <div>
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
    )
}

export default ServiceReviewsModal