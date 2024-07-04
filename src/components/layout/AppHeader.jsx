import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/crypto-context";
import { ModalContent } from "../ModalContent";
import { DrawerContent } from "../DrawerContent";

const headerStyle = {
	width: '100vw',
	textAlign: "center",
	color: "#fff",
	height: 60,
	padding: "1rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: '1rem'
};

export function AppHeader() {
	const [select, setSelect] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [coin, setCoin] = useState(null)
	const { crypto } = useContext(CryptoContext);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === "/") {
				setSelect((prev) => !prev);
			}
		};
		document.addEventListener("keypress", keypress);
		return () => document.removeEventListener("keypress", keypress);
	}, []);

	function handleSelect(value) {
		setCoin(crypto.find(c => c.id === value))
		setIsModalOpen(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				onSelect={handleSelect}
				open={select}
				onClick={() => setSelect((prev) => !prev)}
				style={{
					width: "clamp(330px, 20vw, 20%)",
					textAlign: "start",
				}}
				value="press / to open"
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
			<Button type="primary" onClick={() => setOpen(true)}>Add Asset</Button>
			<Modal
				open={isModalOpen}
				footer={false}
				onCancel={() => setIsModalOpen(false)}
			>
				<ModalContent coin={coin}/>
			</Modal>
			<Drawer destroyOnClose title="Add Asset" onClose={() => setOpen(false)} open={open}>
        <DrawerContent onClose={() => setOpen(false)}/>
      </Drawer>
		</Layout.Header>
	);
}
