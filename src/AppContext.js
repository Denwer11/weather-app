import React, { createContext, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const [weatherInput, setWeatherInput] = useState("");
	const [forecastData, setForecastData] = useState(null);

	return (
		<AppContext.Provider
			value={{ weatherInput, setWeatherInput, forecastData, setForecastData }}>
			{children}
			<SpeedInsights />;
		</AppContext.Provider>
	);
};

export { AppContext, AppContextProvider };
