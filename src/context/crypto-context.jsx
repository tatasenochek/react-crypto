import { createContext, useEffect, useState } from "react";
import { fetchAssets, fetchCoinData } from "../api";
import { persentDifference } from "../utils";

const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
});

export function CryptoContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [crypto, setCrupto] = useState([]);
	const [assets, setAssets] = useState([]);

	function mapAssets(asset, result) {
		return asset.map((asset) => {
			const coin = result.find((c) => c.id === asset.id);
			return {
				grow: asset.price < coin.price,
				growPercent: persentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			};
		});
	}

	useEffect(() => {
		async function preload() {
			setLoading(true);
			const { result } = await fetchCoinData();
			const assets = await fetchAssets();

			setAssets(mapAssets(assets, result));

			setCrupto(result);

			setLoading(false);
		}
		preload();
	}, []);

	function addAsset(newAsset) {
		setAssets((prev) => mapAssets([...prev, newAsset], crypto));
	}

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
			{children}
		</CryptoContext.Provider>
	);
}

export default CryptoContext;
