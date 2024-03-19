import React, { useState, useEffect, useContext, useCallback } from "react";
import jQuery from "jquery";
import Button from "./../components/button";
import Footer from "../components/footer";
import FutureWeatherComponent from "../components/futureWeatherComponent";
import navigate from "../inc/scripts/utilities";
import Spinner from "../components/spinner";
import Ripple from "./../assets/images/ripple.gif";
import Location from "./../assets/images/map.png";
import * as formHandler from "./../apis/getCurrentWeather";
import { db } from "../backend/app_backend";
import getGeolocation from "../apis/getGeolocation";
import OvercastCloud from "./../assets/icons/overcast-clouds.svg";
import WindIcon from "./../assets/icons/wind.svg";
import HumidityIcon from "./../assets/icons/humidity.png";
import PressureIcon from "./../assets/icons/pressure.svg";
import Header from "../components/header";
import { AppContext } from "../AppContext";
import { debounce } from "lodash";
import * as utilis from "./../inc/scripts/utilities";
import * as currentWeather from "./../apis/getCurrentWeather";
import Swal from "sweetalert2";
import ForecastDailyWeatherComponent from "../components/forecastWeatherComponent";

const WeatherApp = () => {
	if (!db.get("HOME_PAGE_SEEN")) {
		navigate("/");
	}

	const [componentToInsert, setComponentToInsert] = useState("");
	const { weatherInput, setWeatherInput } = useContext(AppContext);
	const { forecastData, setforecastData } = useContext(AppContext);

	let savedLocation;
	savedLocation = db.get("USER_DEFAULT_LOCATION");

	const addUtilityComponentHeight = () => {
		jQuery(($) => {
			$.noConflict();
			$(".cmp").removeClass("d-none");
			$(".utility-component").toggleClass("add-utility-component-height");
		});
	};

	const navigateToForecast = () => {
		navigate("/forecast");
	};
	class MappedSavedDataTemplate {
		constructor(id, time, icon, unit) {
			this.id = id;
			this.time = time;
			this.icon = icon;
			this.unit = unit;
		}
	}
	useEffect(() => {
		formHandler.handleWeatherForm1(savedLocation);
	}, [weatherInput]);

	const mapDbSavedData = () => {
		const count = 8;

		let weatherData = [];

		for (let i = 0; i < count; i++) {
			const FORECAST_TIME = db.get(`WEATHER_FORECAST_TIME_${i}`) || `${i * 3}:00`;
			const FORECAST_ICON = db.get(`WEATHER_FORECAST_ICON_${i}`) || "802";
			const FORECAST_UNIT = db.get(`WEATHER_FORECAST_UNIT_${i}`) || "0";

			weatherData.push(
				new MappedSavedDataTemplate(
					i,
					FORECAST_TIME,
					formHandler.checkWeatherCode(parseInt(FORECAST_ICON)),
					FORECAST_UNIT
				)
			);
		}

		const uiData = weatherData.map((data, index) => {
			const handleElementClick = () => {
				navigate("/forecast");
			};
			return (
				<FutureWeatherComponent
					key={data.id}
					time={data.time}
					icon={data.icon}
					weatherUnit={data.unit}
					onClick={handleElementClick}
				/>
			);
		});

		return uiData;
	};

	const SearchComponent = () => {
		const [searchValue, setSearchValue] = useState("");
		const updateSearchValue = useCallback(
			debounce((str) => {
				setSearchValue(str);
			}, 200),
			[]
		);

		const changeInput = (e) => {
			setSearchValue(e.target.value);
			updateSearchValue(e.target.value);
		};
		return (
			<section className="cmp d-flex align-items-center justify-content-center flex-column my-5">
				<form
					id="searchWeatherForm"
					onSubmit={(e) => {
						formHandler.handleWeatherForm(e);
						setWeatherInput();
					}}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}>
					<label htmlFor="searchWeather" className="py-2">
						Поиск по городу
					</label>
					<input
						type="text"
						name="searchWeather"
						id="searchWeather"
						placeholder="Введите город"
						value={searchValue}
						className="form-control search-input p-3 brand-small-text w-100"
						onChange={changeInput}
						autoComplete="off"
						autoFocus={true}
					/>
					<p
						className="error-holder text-danger py-3 fs-6 brand-small-text text-center d-none"
						id="searchErrorLog">
						город не найден
					</p>

					<section className="d-none "></section>
					<SearchMenuComponent search={searchValue} />
					<Button
						text="Сохранить"
						className="shadow brand-btn-3-secondary toggle-width-3 my-5 text-dark p-2"
						id="searchSavedLocationWeather"
						onClick={(e) => {
							formHandler.handleWeatherForm(e, savedLocation);
							setWeatherInput();
						}}
					/>
				</form>
			</section>
		);
	};
	const SearchMenuComponent = ({ search }) => {
		const [dataArray, changeDataArray] = useState([]);
		useEffect(() => {
			if (search.length > 3) {
				formHandler.findCity(search, changeDataArray);
			}
		}, [search]);

		function clickHandler(e) {
			jQuery("#searchWeather").val(e.target.textContent);
			formHandler.handleWeatherForm(e, savedLocation);
			setWeatherInput();
		}

		return (
			<section className="cmp d-flex align-items-center justify-content-start bg-white px-2 mt-2 rounded">
				<ul className="m-0 p-0">
					{dataArray.map((data, ind) => (
						<li key={ind} onClick={clickHandler} style={{ cursor: "pointer" }}>
							<p
								className="text-dark text-left m-0"
								style={{ fontSize: "14px" }}>
								{data.name}
							</p>
						</li>
					))}
				</ul>
			</section>
		);
	};

	const testSearch = () => {
		addUtilityComponentHeight();
		setComponentToInsert(<SearchComponent />);
	};

	return (
		<React.Fragment>
			<Spinner />
			<div
				className="container-fluid d-flex flex-column py-2 px-0 width-toggle-5 m-auto"
				style={{ overflowX: "hidden" }}
				id="weatherContainer">
				<Header />
				<section className="current-weather-container d-flex justify-content-center px-2 mb-3 mt-4">
					<section className="current-weather-value-container d-flex">
						<section className="">
							<div className="d-flex">
								<h1
									className="current-weather-value fw-bold brand-large-text"
									id="currentDeg">
									{Math.ceil(db.get("WEATHER_DEG")) || 30}
								</h1>
								<sup className="fw-bold brand-medium-text current-weather-unit">
									o
								</sup>
							</div>

							<p className="text-center" id="weatherDes">
								{db.get("WEATHER_DESCRIPTION") || "clear sky"}
							</p>
						</section>
					</section>
					<section
						className="current-weather-icon d-block"
						id="main-weather-icon-container">
						<img
							src={
								formHandler.checkWeatherCode(db.get("WEATHER_CODE")) ||
								OvercastCloud
							}
							alt="main weather icon"
							id="main-weather-icon"
							className="main-weather-icon"
						/>
					</section>
				</section>
				<section
					role="button"
					className="mx-2 rounded-3 shadow mt-3 mb-5 py-2 current-weather-assets d-flex align-items-center justify-content-around text-center">
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
						<p className="m-0 wind-text brand-small-text-2 weather-text text-center  indicator-name">
							Ветер
						</p>
					</section>

					<section className=" current-weather-humidity-degree d-flex flex-column align-items-center ">
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
						<p className="m-0 humidity-text text-center brand-small-text-2 weather-text indicator-name">
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
							className="rain-value fw-bold brand-small-text  text-center py-1 m-0 indicator-value"
							id="pressure-value">
							{db.get("SUB_WEATHER_PRESSURE_VALUE") || "1000 hPa"}
						</p>
						<p className="m-0 rain-text text-center brand-small-text-2 weather-text indicator-name">
							Давление
						</p>
					</section>
				</section>
				<section className="future-weather-days d-flex align-items-center justify-content-start">
					<section
						role="button"
						className="today-section d-flex mx-2 flex-column align-items-center justify-content-cente tab">
						<p className="brand-small-text fw-bold">Сегодня</p>
						<div className="future-weather-notch-active"></div>
					</section>
					<section
						role="button"
						className="tomorrow-section d-flex mx-2 flex-column align-items-center justify-content-center tab"
						onClick={navigateToForecast}>
						<p className="brand-small-text">Завтра</p>
						<div className="future-weather-notch"></div>
					</section>
					<section
						role="button"
						className="week-section d-flex mx-2 flex-column align-items-center justify-content-center tab"
						onClick={navigateToForecast}>
						<p className="brand-small-text">Неделя</p>
						<div className="future-weather-notch"></div>
					</section>
				</section>
				<section
					className="future-weather-forecast my-4 d-flex align-items-center justify-content-between rounded-3 py-2 px-2"
					style={{ overflowX: "scroll" }}>
					{mapDbSavedData()}
				</section>
				<section className="ripple-container d-flex align-items-center justify-content-center">
					<section className="map-container d-flex align-items-center justify-content-center">
						<img
							src={Location}
							alt={"google-map"}
							height={"30"}
							width={"30"}
							className="map"
						/>
					</section>
					<section
						id="ripple-container"
						className="ripple-section d-flex align-items-center justify-content-center">
						<img
							className="circle"
							src={Ripple}
							width={"300"}
							height={"300"}
							alt={"ripple-efffect"}
						/>
					</section>
				</section>

				<section className="d-flex align-items-center justify-content-center">
					<Button
						text="Текущее местоположение"
						className="brand-btn my-5 width-toggle"
						onClick={getGeolocation}
					/>
					<br />
				</section>

				<br />
				<br />
				<br />
				<Footer utilityTags={componentToInsert} onClick={testSearch} />
			</div>
		</React.Fragment>
	);
};
export default WeatherApp;
