import React, { useContext, useEffect, useState } from 'react'
import { Button, Radio, Modal, Form, DatePicker, TimePicker, Drawer, message, Input, RadioChangeEvent } from 'antd';
import SocketContext from "../../context/socket/socketContext";
import moment from "moment";
import { callGet, callPost } from '../../services/Apis';
import { useParams } from 'react-router-dom';

interface ServiceRequestModalTypes {
  showRequestModal: boolean,
  setShowRequestModal(a: boolean): void,
  data?: any
}

const ServiceRequestModal = (props: ServiceRequestModalTypes) => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [bookingStep, setBookingStep] = useState('address')
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressMode, setAddressMode] = useState('selection');
  const [selectDateAndTime, setSelectDateAndTime] = useState(Date.now());
  const [addressList, setAddressList] = useState([1, 2, 3]);
  const [addressSave, setAddressSave] = useState<string>('');

  const { socket } = useContext(SocketContext)


  useEffect(() => {
    fetchAddress()
  }, [])

  const fetchAddress = () => {
    callGet('/address/get').then((res: any) => {
      setAddressList(res?.data);
    })
  }

  const onSaveAddress = () => {
    callPost('/address/post', { address: addressSave }).then((res) => {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
    }).catch((error: any) => {
      messageApi.open({
        type: 'error',
        content: 'This is an error message',
      });
    })
    // setAddressMode('selection')
  }

  const setAddress = () => {
    setBookingStep('selectDateTime')
  }

  const disabledDate = (current: any) => {
    return current && current.valueOf() < Date.now();
  }

  const handleSendRequest = (selectDateAndTime: any) => {
    const Obj = {
      to: props?.data?.id,
      categoryId: id,
      date: selectDateAndTime,
      price: props?.data?.price
    }

    socket.emit('createRequest', { data: Obj });
    socket.on('resendRequest', (data: any) => {
      console.log('🚀 ~ file: ServiceRequestModal.tsx:72 ~ socket.on ~ data', data);
    });
    props.setShowRequestModal(false)
  }

  let component = (<div>
    {bookingStep === 'address' &&
      <div>
        {addressMode === 'selection' && <div>
          <h4>Select Address</h4>
          <div>
            <span className='add_address' onClick={() => setAddressMode('addition')}> + add </span>
            <Radio.Group className='address_selection' onChange={(e: RadioChangeEvent) => setSelectedAddress(e.target.value)} value={addressList[0]}>
              {
                addressList?.map((d: any, i: any) => {
                  return <Radio value={i}> {d?.address}</Radio>
                })
              }
            </Radio.Group>
          </div>
          <Button onClick={() => { setAddress() }}
          // disabled={selectedAddress ? false : true} 
          > Proceed </Button>
        </div>}

        {addressMode === 'addition' && <div>
          <h4>Add Address</h4>
          <Form>
            <Input size="small" type="text" onChange={(e: any) => setAddressSave(e.target.value)} />
          </Form>
          <Button style={{ marginTop: '10px' }} onClick={onSaveAddress} >
            Save
          </Button>

        </div>

        }
      </div>
    }
    {bookingStep === 'selectDateTime' &&
      <div>
        <DatePicker showTime={{ format: "HH:mm" }} onChange={(date: any) => {
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