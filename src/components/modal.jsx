import React from "react";
import WindIcon from "../assets/icons/wind.svg";
import HumidityIcon from "../assets/icons/humidity.png";
import PressureIcon from "../assets/icons/pressure.svg";
import TemperatureIcon from "../assets/icons/temperature-modal.svg";

const Modal = ({
	time,
	unit,
	icon,
	humidity,
	wind,
	pressure,
	description,
	isOpen,
	onClose,
	animate,
}) => {
	const recommendationsWeather = [
		{
			tempRange: [-Infinity, 10],
			text: "Оденься тепло! Тебе понадобится шапка, шарф и перчатки.",
		},
		{
			tempRange: [10, 15],
			text: "Оденься потеплее, может пригодиться легкая куртка.",
		},
		{
			tempRange: [15, 20],
			text: "Оденься в комфортную одежду, возможно, понадобится легкая куртка.",
		},
		{
			tempRange: [20, 25],
			text: "Идеальная погода! Оденься полегче.",
		},
		{
			tempRange: [25, Infinity],
			text: "Жарко! Оденься в легкую одежду и не забудь про солнцезащитный крем.",
		},
	];
	const recommendationsPressure = [
		{
			mmRange: [700, 720],
			text: "Низкое атмосферное давление. Возможно, вы почувствуете легкую головную боль или усталость. Постарайтесь отдохнуть и пейте больше воды.",
		},
		{
			mmRange: [720, 740],
			text: "Низкое атмосферное давление. Возможно, вы почувствуете легкую головную боль или усталость. Постарайтесь отдохнуть и пейте больше воды.",
		},
		{
			mmRange: [740, 760],
			text: "Атмосферное давление в норме. Наслаждайтесь погодой!",
		},
		{
			mmRange: [760, 780],
			text: "Высокое атмосферное давление. Возможно, вы почувствуете легкую головную боль или дискомфорт в суставах.  Рекомендуется  отдыхать и  избегать физических нагрузок.",
		},
		{
			mmRange: [760, 780],
			text: "Высокое атмосферное давление.  Следите за своим самочувствием. Если вы почувствуете сильную головную боль, головокружение или ухудшение самочувствия, обратитесь к врачу.",
		},
	];

	const recommendationsWind = [
		{
			windSpeedRange: [0, 2],
			text: "Штиль. Идеальная погода для прогулок и отдыха на свежем воздухе!",
		},
		{
			windSpeedRange: [2, 5],
			text: "Легкий бриз.  Приятная погода для прогулок и активного отдыха.",
		},
		{
			windSpeedRange: [5, 10],
			text: "Умеренный ветер.  Возможно, вам понадобится легкая куртка или шарф. Будьте осторожны при передвижении на велосипеде или мотоцикле.",
		},
		{
			windSpeedRange: [10, 15],
			text: "Сильный ветер.  Рекомендуется избегать активного отдыха на открытом воздухе.  Будьте осторожны при передвижении.",
		},
		{
			windSpeedRange: [15, 20],
			text: "Штормовой ветер.  Не рекомендуется выходить на улицу. Возможны повреждения деревьев и имущества.",
		},
		{
			windSpeedRange: [20, Infinity],
			text: "Ураганный ветер.  Оставайтесь в помещении.  Ожидайте серьезные разрушения.",
		},
	];

	const recommendationsHumidity = [
		{
			humidityRange: [0, 30],
			text: "Очень сухой воздух.  Рекомендуется использовать увлажнитель воздуха.  Следите за своим самочувствием, особенно если у вас сухая кожа или проблемы с дыханием.",
		},
		{
			humidityRange: [30, 60],
			text: "Оптимальная влажность.  Приятная погода, комфортная для большинства людей.",
		},
		{
			humidityRange: [60, 80],
			text: "Высокая влажность.  Возможно, вы почувствуете легкий дискомфорт.  Рекомендуется проветривать помещение.",
		},
		{
			humidityRange: [80, 100],
			text: "Очень высокая влажность.  Рекомендуется  использовать осушитель воздуха.  Будьте осторожны, так как высокая влажность может способствовать появлению плесени и грибка.",
		},
	];

	const recommendationWeather = recommendationsWeather.find(
		(rec) => unit >= rec.tempRange[0] && unit < rec.tempRange[1]
	);
	const recommendationPressure = recommendationsPressure.find(
		(rec) => pressure >= rec.mmRange[0] && pressure < rec.mmRange[1]
	);
	const recommendationWind = recommendationsWind.find(
		(rec) => wind >= rec.windSpeedRange[0] && wind < rec.windSpeedRange[1]
	);
	const recommendationHumidity = recommendationsHumidity.find(
		(rec) => humidity >= rec.humidityRange[0] && humidity < rec.humidityRange[1]
	);
	return (
		<div>
			<div
				className={`modal ${isOpen && animate ? "show" : "hide"}`}
				onClick={onClose}>
				<div className="modal-content d-flex flex-column">
					<span className="close" onClick={onClose}>
						X
					</span>
					<div className="modal-wrapper">
						<section className="weather-wrapper d-flex flex-row align-items-start justify-content-center py-3">
							<p className="brand-small-text-time text-center m-0 mx-3 fw-bold">
								{time}
							</p>
						</section>

						<section className="my-2 fw-bold text-center d-flex flex-row align-items-center justify-content-center brand-small-text">
							{description}
							<img
								src={icon}
								height={"40"}
								width={"50"}
								alt={"sub-weather-icon"}
							/>
						</section>
					</div>
					<section className="my-2 d-flex unit">
						<img
							src={TemperatureIcon}
							height={"30"}
							width={"30"}
							alt="temperature-icon"
						/>
						<div className="fw-bold brand-small-text text-modal text-center col-auto">
							{unit}
							<sup>o</sup>
						</div>

						{recommendationWeather && <div>{recommendationWeather.text}</div>}
					</section>

					<section className="my-1 d-flex pressure">
						<img
							src={PressureIcon}
							height={"30"}
							width={"30"}
							alt="pressure-icon"
						/>
						<div className="text-center fw-bold text-modal col-auto">
							{pressure} мм рт. ст.
						</div>

						{recommendationPressure && <div>{recommendationPressure.text}</div>}
					</section>

					<section className="my-1 d-flex wind">
						<img src={WindIcon} height={"30"} width={"30"} alt="wind-icon" />
						<div className="text-center fw-bold text-modal col-auto">
							{wind} м/с
						</div>
						{recommendationWind && <div>{recommendationWind.text}</div>}
					</section>

					<section className="my-1 d-flex humidity">
						<img
							src={HumidityIcon}
							height={"30"}
							width={"30"}
							alt="humidity-icon"
						/>
						<div className="text-center fw-bold text-modal col-auto">
							{humidity} %
						</div>
						{recommendationHumidity && <div>{recommendationHumidity.text}</div>}
					</section>
				</div>
			</div>
		</div>
	);
};
export default Modal;
