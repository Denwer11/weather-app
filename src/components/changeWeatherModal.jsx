import React, { useState } from "react";
import ClearSkyIcon from "../assets/icons/clear-sky.svg";
import RainIcon from "../assets/icons/rain.svg";
import FewCloudsIcon from "../assets/icons/few-clouds.svg";
import BrokenCloudsIcon from "../assets/icons/broken-clouds.svg";
import SnowIcon from "../assets/icons/snow.svg";
import ThunderstormIcon from "../assets/icons/thunderstorm.svg";
import { db } from "../backend/app_backend";
import Swal from "sweetalert2";
import jQuery from "jquery";

const ChangeWeatherModal = ({ isOpen, onClose }) => {
	const [weather, setWeather] = useState(Math.ceil(db.get("WEATHER_DEG")));
	const [windSpeed, setWindSpeed] = useState("");
	const [weatherDescription, setWeatherDescription] = useState("");

	const handleRadioChange = (e) => {
		setWindSpeed(e.target.value);
	};

	const wind = [
		"Штиль",
		"Легкий бриз",
		"Умеренный ветер",
		"Сильный ветер",
		"Штормовой ветер",
		"Ураганный ветер",
	];

	const windValue = ["0-2", "2-5", "5-10", "10-15", "15-20", "20+"];

	const icons = [
		ClearSkyIcon,
		FewCloudsIcon,
		BrokenCloudsIcon,
		RainIcon,
		ThunderstormIcon,
		SnowIcon,
	];

	const iconsValue = [
		"Ясно",
		"Переменная облачность",
		"Пасмурно",
		"Дождь",
		"Гроза",
		"Снег",
	];

	const sendData = (e) => {
		onClose();
		e.preventDefault();

		jQuery(($) => {
			$.noConflict();

			Swal.fire({
				title: "Данные отправлены!",
				html: "<p class='text-center text-primary'>Ваши наблюдения важны для нас.</p>",
				confirmButtonColor: "rgb(83, 166, 250)",
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				timer: 4000,
			});
		});
	};
	return (
		<div className={`modal-weather ${isOpen ? "show" : "hide"}`}>
			<div className="modal-weather-content">
				<span className="close" onClick={onClose}>
					X
				</span>
				<div className="fw-bold py-3 modal-title">Сообщить о погоде</div>
				<div className="modal-description">
					Чем больше данных - тем точнее прогноз. Ваши наблюдения позволят
					уточнить расчеты.
				</div>
				<div className="mt-3 mb-2 fw-bold">Температура, °C :</div>
				<input
					type="number"
					className="temperature-input"
					value={weather}
					autoFocus={true}
					onChange={(e) => setWeather(e.target.value)}></input>

				<div className="mt-3 mb-2 fw-bold">В небе над вами:</div>
				<div className="weather-box rounded-3">
					<ul className="d-flex py-2 flex-wrap">
						{icons.map((value, index) => (
							<li
								className={`bg-white p-2 rounded-3 d-flex flex-column align-items-center col-md-5 m-1 justify-content-center weather-check ${
									weatherDescription == iconsValue[index] ? "active" : ""
								}`}
								key={iconsValue[index]}
								onClick={() => setWeatherDescription(iconsValue[index])}>
								<img
									src={value}
									height={"30"}
									width={"40"}
									alt={"sub-weather-icon"}
								/>
								<div className="modal-description text-center">
									{iconsValue[index]}
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="mt-3 mb-2 fw-bold">Ветер:</div>

				<div className="d-flex flex-column modal-wind">
					{wind.map((item, index) => (
						<div key={windValue[index]}>
							<input
								className="modal-input"
								type="radio"
								value={item}
								id={item}
								checked={windSpeed == item}
								onChange={handleRadioChange}
							/>
							<label htmlFor={item}>
								{item}
								<span className="wind-span">({windValue[index]} м/с)</span>
							</label>
						</div>
					))}
					<button className="modal-weather-btn mt-5" onClick={sendData}>
						Отправить
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangeWeatherModal;
