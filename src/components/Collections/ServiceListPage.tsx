import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { UserAddOutlined, IconProvider } from '@ant-design/icons';
import ServiceProviderCard from './ServiceProviderCard'
import './servicelist.scss'
import Icon from '@ant-design/icons/lib/components/AntdIcon';
import { UserProps } from '../../interfaces/user';
import { Alert, Space, Spin } from 'antd';
import { callPost } from '../../services/Apis';
const ServiceListPage: React.FC<UserProps> = (props: UserProps) => {

  const [data, setData] = useState<any>([1, 2, 3, 4, 5]);
  const [loader, setLoader] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    callPost('/user/getLabourContractorList', { id, page: 1, limit: 20 }).then((res: any) => {
      setData(res?.data?.data);
      setLoader(true);
      // console.log('🚀 ~ file: ServiceListPage.tsx:25 ~ callPost ~ res', res);
    }).catch((error: any) => {
      console.log('🚀 ~ file: ServiceListPage.tsx:24 ~ callPost ~ error', error);
    })
  }, [])


  return (
    <div className='service_list_wrapper'>
      <div className="container">
        <div className='header'>
          <h3>Carpenter</h3>
        </div>
        <div className="list_section">

          {data.length == 0 ? <Spin style={{ height: "100vh" }} tip="Loading" size="large">
            <div className="content" />
          </Spin>
            :
            data?.map((data: any, i: number) => {
              return <ServiceProviderCard key={i} data={data} />
            })
          }
        </div>
      </div>
      <div className='content'></div>
    </div>
  )
}

export default ServiceListPage