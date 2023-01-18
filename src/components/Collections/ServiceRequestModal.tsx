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
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [addressMode, setAddressMode] = useState('selection');
  const [selectDateAndTime, setSelectDateAndTime] = useState(Date.now());
  const [addressList, setAddressList] = useState<any>([]);
  const [addressSave, setAddressSave] = useState<string>('');
  const [value, setValue] = useState(0);

  const { socket } = useContext(SocketContext)


  useEffect(() => {
    fetchAddress()
  }, [])

  const fetchAddress = () => {
    callGet('/address/get').then((res: any) => {
      setAddressList(res?.data?.data);
    })
  }

  const onSaveAddress = () => {
    callPost('/address/add', { address: addressSave }).then((res) => {
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
      to: props?.data?._id,
      categoryId: id,
      addressId: selectedAddressId,
      date: selectDateAndTime,
      price: props?.data?.price
    }
    console.log("🚀 ~ file: ServiceRequestModal.tsx:70 ~ handleSendRequest ~ Obj", Obj)

    socket.emit('createRequest', Obj);
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
            <Radio.Group className='address_selection' onChange={(e: RadioChangeEvent) => setSelectedAddressId(addressList[e.target.value]?._id)}>
              {
                addressList?.map((d: any, i: any) => {
                  return <Radio key={'d' + i} value={i}> {d?.address}</Radio>
                })
              }
            </Radio.Group>
          </div>
          <Button onClick={() => { setAddress() }}
            disabled={selectedAddressId == '' ? true : false}
          > Proceed </Button>
        </div>}

        {addressMode === 'addition' && <div>
          <h4>Add Address</h4>
          <Form>
            <Input size="small" type="text" onChange={(e: any) => setAddressSave(e.target.value)} />
          </Form>
          <Button style={{ marginTop: '10px' }} onClick={onSaveAddress}>
            Save
          </Button>

        </div>

        }
      </div>
    }
    {bookingStep === 'selectDateTime' &&
      <div>
        <DatePicker showTime={{ format: "HH:mm" }} onChange={(date: any) => {
          let data = date?._d, d = data.replace('(India Standard Time)', '');
          setSelectDateAndTime(d)
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