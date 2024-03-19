import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const [weatherInput, setWeatherInput] = useState("");
	const [forecastData, setForecastData] = useState(null);

	return (
		<AppContext.Provider
			value={{ weatherInput, setWeatherInput, forecastData, setForecastData }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppContextProvider };
