import React, { useContext } from "react";
import Button from "../components/button";
import Img_1 from "./../assets/images/home.png";
import Spinner from "../components/spinner";
import navigate from "./../inc/scripts/utilities";
import { db } from "./../backend/app_backend";
import Swal from "sweetalert2";
import jQuery from "jquery";
import * as formHandler from "./../apis/getCurrentWeather";
import { AppContext } from "../AppContext";
import * as utilis from "./../inc/scripts/utilities";
const Home = () => {
	const customBtnStyle = {
		fontSize: "18px",
	};
	const { weatherInput, setWeatherInput } = useContext(AppContext);
	const { forecastData, setforecastData } = useContext(AppContext);

	function click() {
		Swal.fire({
			title: "Ваше местоположение",
			html: "<input type='text' placeholder='Введите город' class='form-control border-1 p-3 brand-small-text w-100' id='defaultLocation'>",
			confirmButtonText: "Сохранить местоположение",
			confirmButtonColor: "rgb(83, 166, 250)",
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
		}).then((willProceed) => {
			if (willProceed.isConfirmed) {
				jQuery(($) => {
					$.noConflict();
					const $defaultLocation = $("#defaultLocation").val().trim();

					if ($defaultLocation === undefined || $defaultLocation === "") {
						Swal.fire({
							title: "Неправильное местоположение!",
							html: "<p class=' text-center text-danger'>Пожалуйста, введите действительное местоположение</p>",
							confirmButtonColor: "rgb(83, 166, 250)",
							allowOutsideClick: false,
							allowEscapeKey: false,
							allowEnterKey: false,
							timer: 4000,
						});
					} else {
						Swal.fire({
							text: "Местоположение сохранено успешно!",
							icon: "success",
							toast: true,
							position: "top",
							showConfirmButton: false,
							timer: 3000,
						});

						db.create("HOME_PAGE_SEEN", true);
						db.create("USER_DEFAULT_LOCATION", $defaultLocation);
						db.create("TRACK_SAVED_LOCATION_WEATHER", false);
						db.create("WEATHER_UNIT", "metric");
						console.log("aaaa");

						let savedLocation;
						savedLocation = db.get("WEATHER_LOCATION");
						formHandler.handleWeatherForm1(savedLocation);
						setWeatherInput(savedLocation);

						navigate("/weather");
					}
				});
			}
		});
	}

	return (
		<React.Fragment>
			<Spinner />
			<div className="weather-preloader container-fluid d-flex align-items-center flex-column">
				<main className="my-5 preloader-weather-heading">
					<h2 className="text-center text-capitalize m-auto fw-bold fs-2">
						Какая сегодня погода?
					</h2>
				</main>

				<section
					className="m-auto text-center img-container my-md-4 my-3"
					id="img-container">
					<img
						src={Img_1}
						className="img-fluid m-auto preloader-img home-img"
						height="600"
						width="35%"
						alt="current-weather-status"
					/>
				</section>
				<Button
					text="Текущая погода"
					style={customBtnStyle}
					className="brand-btn m-auto my-5 width-toggle"
					onClick={(event) => {
						click(event);
					}}
				/>
			</div>
		</React.Fragment>
	);
};

export default Home;
