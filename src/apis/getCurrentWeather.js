import jQuery from "jquery";
import { db } from "../backend/app_backend";
import { getCurrentDate } from "../inc/scripts/utilities";
import Swal from "sweetalert2";
import Thunderstorm from "./../assets/icons/thunderstorm.svg";
import ClearSky from "./../assets/icons/clear-sky.svg";
import Drizzle from "./../assets/icons/drizzle.svg";
import Rain from "./../assets/icons/rain.svg";
import Snow from "./../assets/icons/snow.svg";
import Mist from "./../assets/icons/mist.svg";
import BrokenClouds from "./../assets/icons/broken-clouds.svg";
import OvercastClouds from "./../assets/icons/overcast-clouds.svg";
import ScatteredClouds from "./../assets/icons/scattered-clouds.svg";
import FewClouds from "./../assets/icons/few-clouds.svg";
import Haze from "./../assets/icons/haze.svg";
import Tornado from "./../assets/icons/tornado.svg";
import Sand from "./../assets/icons/sand.svg";

export const closeUtilityComponent = () => {
	jQuery(($) => {
		$.noConflict();
		$(".cmp").addClass("d-none");
		$(".utility-component").removeClass("add-utility-component-height");
	});
};
export const API_KEY = "5cf7a035145486fde24a77fcb2482192";

export const WEATHER_UNIT = db.get("WEATHER_UNIT") || "metric";

export const scrollToElement = (elementId) => {
	document
		.getElementById(`${elementId}`)
		.scrollIntoView({ behaviour: "smooth" });
};

export const checkWeatherUnitDeg = () => {
	let result;
	if (db.get("WEATHER_UNIT")) {
		switch (db.get("WEATHER_UNIT")) {
			case "celsius":
				result = "c";
				break;

			case "farenheit":
				result = "f";
				break;

			case "kelvin":
				result = "k";
				break;

			default:
				result = "c";
		}
	} else {
		db.create("WEATHER_UNIT", "celsius");
		result = "c";
	}

	return result;
};

export const handleWeatherForm = (e, search) => {
	e.preventDefault();

	let userSearch = jQuery("#searchWeather").val() || search;

	getCurrentWeather(userSearch.trim());

	scrollToElement("weatherContainer");
	jQuery(($) => {
		$("#searchWeather").val("");
	});
};
export const handleWeatherForm1 = (search) => {
	let userSearch = search;

	getCurrentWeather(userSearch.trim());
};


export const findCity = (searchTerm, updateDataArray) => {
	const XAPIKEY = "i64h71pBcwsqMF7fHb7C4A==M4liKNe6eW43M91R";
	jQuery(($) => {
		$.ajax({
			url: `https://api.api-ninjas.com/v1/city?name=${searchTerm}&limit=4`,
			processData: false,

			headers: {
				"X-Api-Key": XAPIKEY,
			},
			success: (result, status, xhr) => {
				if (xhr.status != 200) {
					Swal.fire({
						toast: true,
						position: "top",
						text: "Что-то пошло не так!",
						icon: "info",
						showConfirmButton: false,
						timer: 1000,
					});
				} else {
					updateDataArray(result);
				}
			},
			error: (xhr, status, error) => {
				$("#searchWeather").val(" ");
				closeUtilityComponent();

				if (error == "") {
					Swal.fire({
						toast: true,
						text: "Ошибка сети!",
						icon: "info",
						timer: 1000,
						position: "top",
						showConfirmButton: false,
					}).then((willProceed) => {
						scrollToElement("weatherContainer");
					});
				} else {
					Swal.fire({
						toast: true,
						text: "Не найдено!",
						icon: "warning",
						timer: 1000,
						position: "top",
						showConfirmButton: false,
					}).then((willProceed) => {
						scrollToElement("weatherContainer");
					});
				}
			},
		});
	});
};

export let weatherSvg;
export const checkWeatherCode = (code) => {
	if (code >= 200 && code < 300) {
		weatherSvg = Thunderstorm;
	} else if (code >= 300 && code < 400) {
		weatherSvg = Drizzle;
	} else if (code >= 500 && code < 600) {
		weatherSvg = Rain;
	} else if (code >= 600 && code < 700) {
		weatherSvg = Snow;
	} else if (
		code >= 700 &&
		code !== 701 &&
		code <= 800 &&
		code !== 751 &&
		code !== 781
	) {
		weatherSvg = Haze;
	} else if (code === 751) {
		weatherSvg = Sand;
	} else if (code === 781) {
		weatherSvg = Tornado;
	} else if (code >= 701 && code < 800) {
		weatherSvg = Mist;
	} else if (code === 800) {
		weatherSvg = ClearSky;
	} else if (code === 801) {
		weatherSvg = FewClouds;
	} else if (code === 802) {
		weatherSvg = ScatteredClouds;
	} else if (code === 803) {
		weatherSvg = BrokenClouds;
	} else if (code === 804) {
		weatherSvg = OvercastClouds;
	} else {
		weatherSvg = "";
	}

	return weatherSvg;
};

export const updateReactDom = (result) => {
	jQuery(($) => {
		$.noConflict();
		$("#searchWeather").val(" ");
		closeUtilityComponent();
		scrollToElement("weatherContainer");
		$("#weatherLocation").html(`${result.name} ${result.sys.country}`);
		$("#currentDeg").html(Math.ceil(result.main.temp));
		$("#weatherDes").html(result.weather[0].description);
		$("#currentDate").html(getCurrentDate());
		checkWeatherCode(result.weather[0].id);
		$("#main-weather-icon-container").html(
			`<img src=${weatherSvg} alt="main-weather-icon" width="150" height="150"/>`
		);
		$("#wind-value").html(`${result.wind.speed} м/с`);
		$("#humidity-value").html(`${result.main.humidity} %`);
		let pressure = result.main.pressure * 0.75;
		$("#pressure-value").html(`${pressure} мм рт. ст.`);
		db.create("WEATHER_LOCATION", `${result.name} ${result.sys.country}`);
		db.create("WEATHER_DEG", result.main.temp);
		db.create("WEATHER_DESCRIPTION", result.weather[0].description);
		db.create("WEATHER_CODE", result.weather[0].id);
		db.create("SUB_WEATHER_WIND_VALUE", `${result.wind.speed}`);
		db.create("SUB_WEATHER_HUMIDITY_VALUE", `${result.main.humidity}`);
		db.create("SUB_WEATHER_PRESSURE_VALUE", `${pressure}`);
	});
};
export const getCurrentWeather = (location) => {
	jQuery(($) => {
		let userSearch = location;

		const SEARCH_URL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${API_KEY}&units=${WEATHER_UNIT}&lang=ru`;

		$.ajax({
			url: SEARCH_URL,
			processData: false,
			success: (result, status, xhr) => {
				if (xhr.status != 200) {
					Swal.fire({
						toast: true,
						position: "top",
						text: "Что-то пошло не так!",
						icon: "info",
						showConfirmButton: false,
						timer: 2000,
					});
				} else {
					if (result.cod == 200) {
						updateReactDom(result);
					}
				}
			},
			error: (xhr, status, error) => {
				$("#searchWeather").val(" ");
				closeUtilityComponent();

				if (error == "") {
					Swal.fire({
						toast: true,
						text: "Ошибка сети!",
						icon: "info",
						timer: 2000,
						position: "top",
						showConfirmButton: false,
					}).then((willProceed) => {
						scrollToElement("weatherContainer");
					});
				} else {
					Swal.fire({
						toast: true,
						text: "Не найдено!",
						icon: "warning",
						timer: 2000,
						position: "top",
						showConfirmButton: false,
					}).then((willProceed) => {
						scrollToElement("weatherContainer");
					});
				}
			},
		});
	});
};
