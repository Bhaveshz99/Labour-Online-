import React, { useEffect, useState } from 'react'
import { List } from 'antd'
const ServiceReviewsModal = () => {

    const [reviews, setReviews] = useState<String[]>([])

    useEffect(() => {
        setReviews(['Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.'])
    })

    return (
        <div>
            <List
                size="small"
                bordered
            >
                {reviews.map((x, i) => {
                    return (<List.Item key={i}> {x} </List.Item>)
                })}
            </List>
        </div>
    )
}

export default ServiceReviewsModal