import { Layout, Typography } from "antd";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
import { PortfolioCarts } from "../PortfolioCarts";
import { AssetsTable } from "../AssetsTable";

const contentStyle = {
	textAlign: "center",
	minHeight: "calc(100vh - 60px)",
	color: "#fff",
	backgroundColor: "#001529",
  padding: '1rem',
};

export function AppContent() {
	const {assets, crypto} = useContext(CryptoContext)
	
	const cryptoPriceMap = crypto.reduce((acc, c) => {
		acc[c.id] = c.price
		return acc
	}, {})

	return <Layout.Content style={contentStyle}>
		<Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
			Portfolio:{' '}$
			{assets
				.map((asset) => asset.amount * cryptoPriceMap[asset.id])
				.reduce((acc, v) => (acc += v), 0)
				.toFixed(2)
			}
		</Typography.Title>
		<PortfolioCarts />
		<AssetsTable />
	</Layout.Content>;
}
