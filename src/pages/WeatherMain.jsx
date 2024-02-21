import React from "react";
import Footer from "../components/footer";
import navigate from "../inc/scripts/utilities";
import Spinner from "../components/spinner";
import WindIcon from "./../assets/icons/wind.svg";
import PressureIcon from "./../assets/icons/pressure.svg";
import HumidityIcon from "./../assets/icons/humidity.png";
import { db } from "../backend/app_backend";
const WeatherMain = (props) => {
	const navigateHome = () => {
		navigate("/weather");
	};
	const customTextStyle = {
		display: "block",
		transform: "translateX(-7px)",
	};
	return (
		<React.Fragment>
			<Spinner />
			<section
				className="container-fluid d-flex flex-column py-2 width-toggle-5 m-auto"
				style={{ overflowX: "hidden" }}>
				<section className="app-header d-flex justify-content-between">
					<div className="toggle-btn ">
						<svg
							height={"30"}
							id="Layer_1"
							version="1.1"
							onClick={navigateHome}
							viewBox="0 0 512 512"
							width={"30"}
							xmlns="http://www.w3.org/2000/svg">
							<polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
						</svg>
					</div>
					<section className="city-locaton">
						<h5 className="fw-bold fs-5">
							{db.get("WEATHER_LOCATION") || "Lagos, 9ja"}
						</h5>
					</section>
					<div className="toggle-btn ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={"30px"}
							height={"30px"}
							viewBox="0 0 24 24"
							className="d-block">
							<path fill="white" d="M0 0h24v24H0V0z" />
							<path
								fill="lightskyblue"
								d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"
							/>
						</svg>
					</div>
				</section>

				<section className="current-weather-value-container d-flex align-items-center justify-content-center flex-column my-4">
					<section className="d-flex ">
						<h1 className="current-weather-value fw-bold brand-large-text">
							{Math.ceil(db.get("WEATHER_DEG")) || "30"}
						</h1>

						<sup className="fw-bold brand-medium-text current-weather-unit">
							o
						</sup>
					</section>

					<p
						className="text-muted text-start brand-small-text text-capitalize"
						style={customTextStyle}>
						{db.get("WEATHER_DESCRIPTION") || "clear sky"}
					</p>
				</section>
				<section className="rounded-3 shadow my-5 py-2 current-weather-assets d-flex align-items-center justify-content-around">
					<section className="current-weather-wind-speed d-flex flex-column align-items-center justify-content-center">
						<section className="wind-icon py-1">
							<div className="indicator">
								<img
									src={WindIcon}
									height={"30"}
									width={"30"}
									alt="wind-icon"
								/>
							</div>
						</section>
						<p
							className="wind-value fw-bold brand-small-text text-center py-1 m-0 indicator-value"
							id="wind-value">
							{db.get("SUB_WEATHER_WIND_VALUE") || "2.90 м/с"}
						</p>
						<p className="m-0 wind-text text-muted text-capitalize brand-small-text-2 weather-text text-center indicator-name">
							Ветер
						</p>
					</section>

					<section className="current-weather-humidity-degree d-flex flex-column align-items-center ">
						<section className="humidity-icon py-1">
							<div className="indicator">
								<img
									src={HumidityIcon}
									height={"30"}
									width={"30"}
									alt="humidity-icon"
								/>
							</div>
						</section>
						<p
							className="humidity-value fw-bold brand-small-text  text-center py-1 m-0 indicator-value"
							id="humidity-value">
							{db.get("SUB_WEATHER_HUMIDITY_VALUE") || "98%"}
						</p>
						<p className="m-0 humidity-text text-muted text-capitalize text-center brand-small-text-2 weather-text  indicator-name">
							Влажность
						</p>
					</section>

					<section className="current-weather-rain-degree d-flex flex-column align-items-center">
						<section className="rain-icon py-1">
							<div className="indicator">
								<img
									src={PressureIcon}
									height={"30"}
									width={"30"}
									alt="rain-icon"
								/>
							</div>
						</section>
						<p
							className="rain-value fw-bold brand-small-text  text-center py-1 m-0 indicator-value "
							id="pressure-value">
							{db.get("SUB_WEATHER_PRESSURE_VALUE") || "1000 hPa"}
						</p>
						<p className="m-0 rain-text text-muted text-capitalize text-center brand-small-text-2 weather-text  indicator-name">
							Давление
						</p>
					</section>
				</section>
				<Footer />
			</section>
		</React.Fragment>
	);
};

export default WeatherMain;
