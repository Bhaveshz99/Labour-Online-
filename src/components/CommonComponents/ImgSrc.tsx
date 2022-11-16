import React from 'react'

interface PropTypes {
    src: string,
}

const ImgSrc = (props: PropTypes) => {
    return (
        <div className='img'><img src={props.src} alt='' /></div>
    )
}

export default ImgSrc