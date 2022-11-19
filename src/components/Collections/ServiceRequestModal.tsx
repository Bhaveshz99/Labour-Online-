import React, { useState } from 'react'
import { Button, Radio, Modal, Form, DatePicker, TimePicker, Drawer } from 'antd';
import moment from 'moment';

interface ServiceRequestModalTypes {
  showReviewsModal: boolean,
  setShowReviewsModal(a: boolean): VoidFunction
}

const ServiceRequestModal = (props: ServiceRequestModalTypes) => {
  const [bookingStep, setBookingStep] = useState('address')
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressMode, setAddressMode] = useState('selection')

  const onSaveAddress = () => {

  }

  let component = (<div>
    {bookingStep === 'address' &&
      <div>
        {addressMode === 'selection' && <div>
          <h4>Select Address</h4>
          <div>
            <span className='add_address'> + add </span>
            <Radio.Group className='address_selection' value={selectedAddress}>
              <Radio value={1}> B/203 Hariom Avenue, Sardarnagar, Ahmedabad Pincode- 382475</Radio>
              <Radio value={2}> B/203 Hariom Avenue, Sardarnagar, Ahmedabad Pincode- 382475</Radio>
            </Radio.Group>
          </div>
          <Button onClick={() => { setBookingStep('selectDateTime') }}
          // disabled={selectedAddress ? false : true} 
          > Proceed </Button>
        </div>}

        {addressMode === 'addition' && <div>
          <h4>Add Address</h4>
          <Form>

          </Form>
          <Button onClick={() => { onSaveAddress() }} >
            Save
          </Button>

        </div>

        }
      </div>
    }
    {bookingStep === 'selectDateTime' &&
      <div>
        <DatePicker defaultValue={moment(new Date)} format={'DD/MM/YYYY'} />
        <TimePicker use12Hours={true} format="HH" />
      </div>
    }
  </div>)

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
        {component}
      </Drawer>}
      {window.innerWidth > 768 && <Modal
        className='reviews'
        title="Reviews"
        visible={props.showReviewsModal}
        onCancel={() => { props.setShowReviewsModal(false) }}
      // onOk={this.hideModal}
      >
        {component}
      </Modal>}

    </div>
  )
}

export default ServiceRequestModal