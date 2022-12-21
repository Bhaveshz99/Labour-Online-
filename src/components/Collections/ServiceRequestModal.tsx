import React, { useContext, useEffect, useState } from 'react'
import { Button, Radio, Modal, Form, DatePicker, TimePicker, Drawer } from 'antd';
import SocketContext from "../../context/socket/socketContext";

interface ServiceRequestModalTypes {
  showRequestModal: boolean,
  setShowRequestModal(a: boolean): void,
  _id?: string
}

const ServiceRequestModal = (props: ServiceRequestModalTypes) => {
  const [bookingStep, setBookingStep] = useState('address')
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressMode, setAddressMode] = useState('selection');
  const [selectDateAndTime, setSelectDateAndTime] = useState(Date.now());

  const { socket } = useContext(SocketContext)


  useEffect(() => {
    fetchAddress()
  }, [])

  const fetchAddress = () => {

  }

  const onSaveAddress = () => {
    setAddressMode('selection')
  }

  const disabledDate = (current: any) => {
    return current && current.valueOf() < Date.now();
  }

  const handleSendRequest = (selectDateAndTime: any) => {
    socket.emit('getResult', { request: "request send for labour", Date: selectDateAndTime })
    // socket.on('sendRequest', (data: any) => {
    //   console.log('🚀 ~ file: ServiceRequestModal.tsx:38 ~ socket.on ~ data', data);
    // });
    // props.setShowRequestModal(false)
  }

  let component = (<div>
    {bookingStep === 'address' &&
      <div>
        {addressMode === 'selection' && <div>
          <h4>Select Address</h4>
          <div>
            <span className='add_address' onClick={() => { setAddressMode('addition') }}> + add </span>
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
            {/* <Form.Item >

            </Form.Item> */}
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
        <DatePicker showTime={{ format: "HH:mm" }} onChange={(date: any) => {
          console.log("e.target.value dfgdg", date?._d)
          setSelectDateAndTime(date?._d)
        }} disabledDate={disabledDate} />

        <Button type="primary" style={{ marginTop: "10px" }} onClick={() => { handleSendRequest(selectDateAndTime) }} block>
          Conform
        </Button>
      </div>
    }
  </div>)

  return (

    <div>
      {window.innerWidth <= 768 && <Drawer
        className='request'
        title="Request Service"
        placement={"bottom"}
        closable={true}
        onClose={() => { props.setShowRequestModal(false) }}
        visible={props.showRequestModal}
      >
        {component}
      </Drawer>}
      {window.innerWidth > 768 && <Modal
        className='request'
        title="Reviews"
        visible={props.showRequestModal}
        onCancel={() => { props.setShowRequestModal(false) }}
        footer={null}
      >
        {component}
      </Modal>}

    </div>
  )
}

export default ServiceRequestModal