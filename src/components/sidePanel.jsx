import React, { useState } from "react";
import ChangeWeatherModal from "./changeWeatherModal";
import changeWeatherIcon from "./../assets/icons/change-weather.svg";

const SidePanel = ({ onClose, isOpen }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={`side-panel ${isOpen ? "open" : ""} `}>
			<span className="close" onClick={onClose}>
				X
			</span>
			<div className="d-flex">
				<div className="modal-icon">
					<img
						src={changeWeatherIcon}
						height={"80"}
						width={"80"}
						alt="change-weather-icon"
					/>
				</div>
				<div>
					<div className="fw-bold mt-3">За окном другая погода?</div>
					<button onClick={openModal} className="text-grey modal-btn">
						Сообщить {">"}
					</button>
				</div>
			</div>
			<ChangeWeatherModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default SidePanel;
