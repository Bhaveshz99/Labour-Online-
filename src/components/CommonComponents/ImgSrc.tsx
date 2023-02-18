import React from 'react'
import { StateToString } from 'redux-logger'

interface PropTypes {
    src: string,
    width?: string,
    height?: string,
    alt?: string,
}

const ImgSrc = ({ src, ...rest }: PropTypes) => {
    return (
        <div className='img'><img src={`${src}`} {...rest} /></div>
    )
}

export default ImgSrc