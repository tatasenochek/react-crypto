import { Typography, Tag, Flex, Divider } from 'antd';

export function ModalContent({ coin }) {
  return (
    <>
    <Flex align='center'>
      <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: '1rem'}} />
      <Typography.Title level={3} style={{margin: 0}}>
        ({coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>
    <Divider />
    <Typography.Paragraph>
      <Typography.Text strong>1 hour: </Typography.Text>
      <Tag style={{marginRight: '1.5em'}} color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
      <Typography.Text strong>1 day: </Typography.Text>
      <Tag style={{marginRight: '1.5rem'}} color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
      <Typography.Text strong>1 week: </Typography.Text>
      <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
    </Typography.Paragraph>

    <Typography.Paragraph>
    <Typography.Text strong>Price: </Typography.Text>
    $ {coin.price.toFixed(2)}
    </Typography.Paragraph>

    <Typography.Paragraph>
    <Typography.Text strong>Price BTC: </Typography.Text>
    {coin.priceBtc}
    </Typography.Paragraph>

    <Typography.Paragraph>
    <Typography.Text strong>Market cap: </Typography.Text>
    $ {coin.marketCap.toFixed(2)}
    </Typography.Paragraph>

    <Typography.Paragraph>
    <Typography.Text strong>Contract address: </Typography.Text>
    {coin.contractAddress}
    </Typography.Paragraph>

    </>
  )
}