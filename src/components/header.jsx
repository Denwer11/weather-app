import React from "react";
import { db } from "../backend/app_backend";
import Logo from "../assets/icons/logo.svg";
import { useTheme } from "../hooks/useTheme";
import ThemeLigth from "./../assets/icons/theme-ligth.svg";
import ThemeDark from "./../assets/icons//theme-dark.svg";
import { getCurrentDate } from "../inc/scripts/utilities";

const Header = () => {
	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme === "ligth" ? "dark" : "ligth");
	};
	return (
		<section className="app-header d-flex justify-content-between px-2 flex-row-reverse flex-wrap">
			<section className="city-location">
				<h5 className="fw-bold fs-5" id="weatherLocation">
					{db.get("WEATHER_LOCATION") || "Москва"}
				</h5>
				<p className="date-time brand-small-text">{getCurrentDate()}</p>
			</section>
			<div className="d-flex">
				<img src={Logo} alt="logo" />
				<div className="logo-title">WeatherWatch</div>
			</div>
			<div className="change-theme" onClick={changeTheme}>
				<img
					src={theme === "ligth" ? ThemeLigth : ThemeDark}
					alt="change-theme icon"
					id="change-theme"
					className="change-theme-icon"
				/>
			</div>
		</section>
	);
};

export default Header;
