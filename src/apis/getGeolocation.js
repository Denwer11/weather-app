import jQuery from "jquery";
import { db } from "../backend/app_backend";
import Swal from "sweetalert2";
import * as weatherAPI from "./getCurrentWeather";
const getGeolocation = () => {
	if (navigator.geolocation) {
		const OPTIONS = {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: Infinity,
		};
		const error = (error) => {
			Swal.fire({
				toast: true,
				text: error.message,
				icon: "warning",
				timer: 1000,
				position: "top",
				showConfirmButton: false,
			}).then((willProceed)=>{
				weatherAPI.scrollToElement("weatherContainer");
				
			});
		};
		navigator.geolocation.watchPosition(
			(position) => {
				if (!db.get("USER_LONGITUDE") && !db.get("USER_LATITUDE")) {
					db.create("USER_LONGITUDE", position.coords.longitude);
					db.create("USER_LATITUDE", position.coords.latitude);
				} else {

					jQuery(($) => {
						$.noConflict();

						const longitude = position.coords.longitude || db.get("USER_LONGITUDE"),
							  latitude = position.coords.latitude || db.get("USER_LATITUDE");
						const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI.API_KEY}&units=${weatherAPI.WEATHER_UNIT}&lang=ru`;

						$.ajax({
							url: URL,
							processData: false,
							success: (result, status, xhr) => {
								if (xhr.status != 200) {
									Swal.fire({
										toast: true,
										position: "top",
										text: "Что-то пошло не так!",
										icon: "info",
										showConfirmButton: false,
										timer: 3000,
									}).then((willProceed)=>{
										weatherAPI.scrollToElement("weatherContainer");

									})
								} else {
									if (result.cod == 200) {
										weatherAPI.updateReactDom(result);
										weatherAPI.scrollToElement("weatherContainer");
									}
								}
							},
							error: (xhr, status, error) => {
								Swal.fire({
									toast: true,
									text: error,
									icon: "warning",
									timer: 2000,
									position: "top",
									showConfirmButton: false,
								}).then((willProceed)=>{
									weatherAPI.scrollToElement("weatherContainer");
									
								})
							},
						});
					});
				}
			},
			error,
			OPTIONS
		);
	} else {
		Swal.fire({
			toast: true,
			text: "Геолокация не найдена!",
			icon: "error",
			position: "top",
			showConfirmButton: false,
			timer: 3000,
		});
	}
};

export default getGeolocation;
