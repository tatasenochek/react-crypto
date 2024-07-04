import { Table } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../context/crypto-context';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export function AssetsTable() {
  const {crypto, assets} = useContext(CryptoContext)
  
  const onChange = (sorter, extra) => {
    console.log('params', sorter, extra);
  };

  const data = assets.map((a) => ({
      key: a.id,
      name: a.name,
      price: a.price,
      amount: a.amount,
  }))

  return (
    <Table
    style={{width: '100%'}}
    pagination={false}
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
  />
  )
}