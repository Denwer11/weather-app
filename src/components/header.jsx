import React from "react";
import { db } from "../backend/app_backend";
import Logo from "../assets/icons/logo.svg";
import { useTheme } from "../hooks/useTheme";
import ThemeLight from "./../assets/icons/theme-light.svg";
import ThemeDark from "./../assets/icons//theme-dark.svg";
import { getCurrentDate } from "../inc/scripts/utilities";
import { Link } from "react-router-dom";

const Header = () => {
	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme == "light" ? "dark" : "light");
	};

	return (
		<section className="app-header d-flex justify-content-between px-2 flex-row-reverse flex-wrap">
			<section className="city-location">
				<h5 className="fw-bold fs-5" id="weatherLocation">
					{db.get("WEATHER_LOCATION") || "Москва"}
				</h5>
				<p className="date-time brand-small-text">{getCurrentDate()}</p>
			</section>
			<Link to="/" className="text-decoration-none">
				<div className="d-flex">
					<img src={Logo} alt="logo" />
					<div className="logo-title">WeatherWatch</div>
				</div>
			</Link>
			<div className="change-theme">
				<img
					onClick={changeTheme}
					src={theme == "light" ? ThemeLight : ThemeDark}
					alt="change-theme icon"
					id="change-theme"
					className="change-theme-icon"
				/>
			</div>
		</section>
	);
};

export default Header;
