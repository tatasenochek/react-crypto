import {
	Select,
	Space,
	Typography,
	Flex,
	Divider,
	Form,
	Button,
	InputNumber,
	DatePicker,
	Result,
} from "antd";
import { useContext, useState, useForm, useRef } from "react";
import CryptoContext from "../context/crypto-context";

export function DrawerContent({onClose}) {
	const [form] = Form.useForm();
	const { crypto, addAsset } = useContext(CryptoContext);
	const [coin, setCoin] = useState(null);
	const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef()

	if (submitted) {
		return (
			<Result
				status="success"
				title="New asset added"
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type="primary" key="console" onClick={onClose}>
						Ok
					</Button>
				]}
			/>
		);
	}

	if (!coin) {
		return (
			<Select
				onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
				style={{
					width: "clamp(330px, 20vw, 20%)",
					textAlign: "start",
				}}
				placeholder="Select coin"
				optionLabelProp="label"
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.label}
						/>{" "}
						{option.data.label}
					</Space>
				)}
			/>
		);
	}

	const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date()
    }
    assetRef.current = newAsset
		setSubmitted(true)
    addAsset(newAsset)
	};

	const hendleAmmoutChange = (value) => {
		const price = form.getFieldValue("price");
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		});
	};

	const hendlePriceChange = (value) => {
		const amount = form.getFieldValue("amount");
		form.setFieldsValue({
			total: +(value * amount).toFixed(2),
		});
	};

	const validateMessages = {
		required: "${label} is required!",
		types: {
			number: "${label} is not valid number",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};

	return (
		<Form
			layout="vertical"
			form={form}
			labelCol={{
				span: 11,
			}}
			wrapperCol={{
				span: 24,
			}}
			style={{
				width: "100%",
			}}
			initialValues={{
				price: +coin.price.toFixed(2),
			}}
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<Flex align="center">
				<img
					src={coin.icon}
					alt={coin.name}
					style={{ width: 25, marginRight: "1rem" }}
				/>
				<Typography.Title level={4} style={{ margin: 0 }}>
					{coin.name}
				</Typography.Title>
			</Flex>
			<Divider />

			<Form.Item
				label="Amount"
				name="amount"
				rules={[
					{
						type: "number",
						min: 0,
					},
				]}
			>
				<InputNumber
					placeholder="Enter coin amount"
					onChange={hendleAmmoutChange}
					style={{ width: "100%" }}
				/>
			</Form.Item>

			<Form.Item label="Data" name="dateTime">
				<DatePicker showTime style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item label="Price" name="price">
				<InputNumber
					disabled
					onChange={hendlePriceChange}
					style={{ width: "100%" }}
				/>
			</Form.Item>

			<Form.Item label="Total" name="total">
				<InputNumber disabled style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item>
				<Button
					style={{ margin: "0 auto", width: "100%" }}
					type="primary"
					htmlType="submit"
				>
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	);
}
