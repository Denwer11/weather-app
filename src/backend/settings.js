import { db } from "../backend/app_backend";
import jQuery from "jquery";
import Swal from "sweetalert2";

export const saveLocation = (e) => {
	e.preventDefault();

	jQuery(($) => {
		$.noConflict();

		const $defaultLocation = $("#defaultLocation").val().trim();

		if ($defaultLocation == undefined || $defaultLocation == "") {
			Swal.fire({
				title: "Неправильное местоположение!",
				html: "<p class=' text-center text-danger'>Пожалуйста введите другое местоположение</p>",
				confirmButtonColor: "rgb(83, 166, 250)",
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				timer: 4000,
			});
		} else {
			db.update("USER_DEFAULT_LOCATION", $defaultLocation);
			Swal.fire({
				text: "Местоположение обновлено успешно!",
				icon: "success",
				toast: true,
				position: "top",
				showConfirmButton: false,
				timer: 3000,
			});
		}
	});
};

export const getDefaultLocation = () => {
	return db.get("USER_DEFAULT_LOCATION");
};

export const restoreFactorySettings = () => {
	db.destroy();
};

export const trackSavedLocationWeather = () => {
	jQuery(($) => {
		$.noConflict();
		const $toggleBtn = document.getElementById("flexSwitchCheckDefault");

		if ($toggleBtn.checked) {
			if (db.get("TRACK_SAVED_LOCATION_WEATHER")) {
				db.update("TRACK_SAVED_LOCATION_WEATHER", true);
				Swal.fire({
					text: "Местоположение сохранено!",
					icon: "success",
					toast: true,
					position: "top",
					showConfirmButton: false,
					timer: 3000,
				});
			} else {
				db.create("TRACK_SAVED_LOCATION_WEATHER", true);
				Swal.fire({
					text: "Местоположение сохранено!",
					icon: "info",
					toast: true,
					position: "top",
					showConfirmButton: false,
					timer: 3000,
				});
			}
		} else {
			if (db.get("TRACK_SAVED_LOCATION_WEATHER")) {
				db.update("TRACK_SAVED_LOCATION_WEATHER", false);
				Swal.fire({
					text: "Местоположение не сохранено!",
					icon: "warning",
					toast: true,
					position: "top",
					showConfirmButton: false,
					timer: 3000,
				});
			}
		}
	});
};

export const checkTrackedLocation = () => {
	let value = db.get("TRACK_SAVED_LOCATION_WEATHER");
	if (value == true) {
		return true;
	} else {
		return false;
	}
};

export const changeWeatherUnit = (e) => {
	jQuery(($) => {
		e.preventDefault();
		const weatherUnit = $("#weatherUnitContainer").val();
		let unitToStore;
		switch (weatherUnit) {
			case "0":
				unitToStore = "metric";
				break;
			case "1":
				unitToStore = "default";
				break;
			case "2":
				unitToStore = "imperial";
				break;

			default:
				Swal.fire({
					toast: true,
					text: "Выберите допустимую единицу измерения",
					icon: "warning",
					timer: 1000,
					position: "top",
					showConfirmButton: false,
				});
				break;
		}
		if (db.get("WEATHER_UNIT")) {
			db.update("WEATHER_UNIT", unitToStore);
			Swal.fire({
				toast: true,
				text: "Единица измерения погоды обновлена успешно!",
				icon: "success",
				timer: 1500,
				position: "top",
				showConfirmButton: false,
			});
		} else {
			db.create("WEATHER_UNIT", unitToStore);
			Swal.fire({
				toast: true,
				text: "Единица измерения погоды обновлена успешно!",
				icon: "info",
				timer: 1500,
				position: "top",
				showConfirmButton: false,
			});
		}
	});
};
