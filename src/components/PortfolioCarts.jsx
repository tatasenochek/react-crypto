import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import CryptoContext from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

const stylePortfolioCarts = {
	display: "flex",
	marginBottom: "1rem",
	justifyContent: "center",
	height: 400,
};

export function PortfolioCarts() {
	const { assets } = useContext(CryptoContext);

	const data = {
		labels: assets.map((a) => a.name),
		datasets: [
			{
				label: "$",
				data: assets.map((a) => a.totalAmount),
				backgroundColor: [
          "rgb(0, 128, 255)",  // Яркий голубой
          "rgb(128, 0, 255)",  // Фиолетовый
          "rgb(255, 0, 128)",  // Яркий розовый
          "rgb(0, 255, 128)",  // Бирюзовый
          "rgb(255, 128, 0)",  // Оранжевый
          "rgb(128, 255, 0)",  // Салатовый
          "rgb(0, 255, 255)",  // Голубой
          "rgb(255, 0, 255)",  // Фуксия
          "rgb(128, 128, 255)", // Светло-фиолетовый
          "rgb(255, 255, 0)"   // Желтый
      ],
			},
			
		],
	};

	return (
		<div style={stylePortfolioCarts}>
			<Pie data={data} />
		</div>
	);
}
