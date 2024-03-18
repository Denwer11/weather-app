import React, { useState } from "react";
import Footer from "../components/Footer";
import navigate from "../inc/scripts/utilities";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { db } from "../backend/app_backend";
import * as settings from "./../backend/settings";
import Header from '../components/Header';
const Settings = () => {
	const navigateHome = () => {
		navigate("./weather");
	};

	const [defaultLocation, setDefaultLocation] = useState(
		settings.getDefaultLocation()
	);
	const [weatherUnit, setWeatherUnit] = useState();
	//database returns a string
	let trackedLocation = db.get("TRACK_SAVED_LOCATION_WEATHER");
	let trackedLocationLegit = trackedLocation === "true" ? true : false;

	return (
		<React.Fragment>
			<Spinner />

			<section className="container-fluid width-toggle-5 m-auto mt-3">
				<Header />
				<section className="city-locaton text-center">
					<h5 className="fw-bold fs-5 brand-small-text">Изменить настройки</h5>
				</section>
				<section className="d-flex align-items-start justify-content-center w-100">
					<section className="settings">
						<form
							action=""
							id="settingsForm"
							onSubmit={(e) => e.preventDefault()}>
							<label
								htmlFor="defaultLocation "
								className="brand-small-text py-3">
								Обновите свое местоположение
							</label>
							<input
								type="text"
								name="defaultLocation"
								id="defaultLocation"
								className="form-control p-3 my-1"
								value={defaultLocation}
								placeholder={"Enter your default location to track.."}
								onChange={(e) => {
									setDefaultLocation(e.target.value);
								}}
							/>
							<section className="my-2 d-md-flex align-items-center justify-content-md-center d-lg-block">
								<Button
									text="Сохранить местоположение"
									className="shadow brand-btn-3 my-5"
									onClick={(e) => {
										settings.saveLocation(e);
									}}
								/>
							</section>

							<label
								htmlFor="defaultWeatherUnit "
								className="py-2 my-2 brand-small-text">
								Выберите единицу измерения погоды
							</label>

							<div className="mb-3">
								<select
									className="form-select form-select my-2"
									name="weatherUnit"
									id="weatherUnitContainer"
									value={weatherUnit}
									onChange={(e) => setWeatherUnit(e.target.value)}>
									<option defaultValue="SELECT" value={0} className="">
										Градус Цельсия
									</option>
									<option defaultValue="" value={1} className="">
										Кельвин
									</option>
									<option defaultValue="" value={2} className="">
										Фаренгейт
									</option>
								</select>
							</div>

							<section className="my-2 d-md-flex align-items-center justify-content-md-center d-lg-block">
								<Button
									text="Сохранить"
									className="shadow brand-btn-3-secondary toggle-width-3 my-5 text-dark p-2"
									onClick={(e) => settings.changeWeatherUnit(e)}
								/>
							</section>

							<br />

							<hr className="horizontal-line py-3 w-75 m-auto " />

							<section className="factory-settings my-3">
								<label
									htmlFor="factory-settings-reset "
									className="brand-small-text">
									Восстановить настройки по умолчанию
								</label>
								<section className="d-md-flex align-items-center justify-content-center d-lg-block">
									<Button
										text="Сбросить настройки"
										className="shadow brand-btn-3-secondary toggle-width-3 my-5 text-dark p-2"
										onClick={settings.restoreFactorySettings}
									/>
								</section>
								<p className="brand-small-text">
									Восстановление заводских настроек приведет к удалению всех
									данных, хранящихся на этом устройстве. Вы попадете на экран
									настройки.
								</p>
							</section>

							<section className="form-check form-switch my-3">
								<input
									className="form-check-input"
									type="checkbox"
									role="switch"
									id="flexSwitchCheckDefault"
									onClick={settings.trackSavedLocationWeather}
									defaultChecked={trackedLocationLegit}
								/>
								<label
									className="form-check-label brand-small-text"
									htmlFor="flexSwitchCheckDefault">
									Отслеживать сохраненное местоположение и погоду
								</label>
							</section>
							<br />
							<br />
						</form>
						<br />
						<br />
					</section>
				</section>

				<br />
				<br />

				<Footer />
			</section>
		</React.Fragment>
	);
};

export default Settings;
