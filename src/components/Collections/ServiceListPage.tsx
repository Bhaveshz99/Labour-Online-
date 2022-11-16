import React from 'react'
import ServiceProviderCard from './ServiceProviderCard'
import './servicelist.scss'

const ServiceListPage = () => {
  return (
    <div className='service_list_wrapper'>
      <div className="container">
        <div className='header'>
          <h3>Carpenter</h3>
        </div>
        <div className="list_section">
          <ServiceProviderCard labourId={1} />
        </div>
      </div>
      <div className='content'></div>
    </div>
  )
}

export default ServiceListPage