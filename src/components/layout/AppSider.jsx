import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { toUpperCase } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
	textAlign: "start",
	color: "#fff",
	backgroundColor: "#001529",
	padding: "1rem",
};

export function AppSider() {
	const {assets} = useContext(CryptoContext)

	return (
		<Layout.Sider width="clamp(360px, 25vw, 25%)" style={siderStyle}>
			{assets.map((asset) => (
				<Card key={asset.id} bordered={false} style={{ marginBottom: "1rem" }}>
					<Statistic
						suffix="$"
						title={toUpperCase(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{
							color: asset.grow ? "#3f8600" : "#cf1322",
						}}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						
					/>
					<List
						size="small"
						dataSource={[
							{ title: "Общая прибыль", value: asset.totalProfit, withTag: true },
							{ title: "Сумма актива", value: asset.amount, isPlain: true },
						]}
						renderItem={(item) => (
							<List.Item>
								<p>{item.title}</p>
								<p>
									{item.withTag && (
										<Tag color={asset.grow ? "green" : "red"}>
											{asset.growPercent} %
										</Tag>
									)}
									{item.isPlain && item.value}
									{!item.isPlain && <Typography.Text type={asset.grow ? "success" : "denger"}>$ {item.value.toFixed(2)}</Typography.Text>}
								</p>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	);
}
