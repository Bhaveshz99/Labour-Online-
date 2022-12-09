import { List, Avatar } from 'antd';
import { UserAddOutlined, IconProvider } from '@ant-design/icons';
import ServiceProviderCard from './ServiceProviderCard'
import './servicelist.scss'
import Icon from '@ant-design/icons/lib/components/AntdIcon';
import { UserProps } from '../../interfaces/user'
const ServiceListPage: React.FC<UserProps> = (props: UserProps) => {

  return (
    <div className='service_list_wrapper'>
      <div className="container">
        <div className='header'>
          <h3>Carpenter</h3>
        </div>
        <div className="list_section">
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
          <ServiceProviderCard labourId={1} />
        </div>
      </div>
      <div className='content'></div>
    </div>
  )
}

export default ServiceListPage