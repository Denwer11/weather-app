import React from "react";
import FooterNav from "./footerNav";
import UtilityComponent from "./utilityFooterComponet";
import FooterWeather from "./footerWeather";
import { useLocation } from "react-router-dom";

const Footer = (props) => {
	const location = useLocation();
	const customFooterStyle = {
		zIndex: "10",
	};
	const isWeatherPage =
		location.pathname === "/weather" || /^\/$/.test(location.pathname);
	return (
		<div
			className="m-auto d-flex align-items-center justify-content-center"
			style={customFooterStyle}>
			<UtilityComponent tags={props.utilityTags} />
			<footer className="shadow-lg d-flex align-items-center justify-content-center footer-nav-container">
				{isWeatherPage ? (
					<FooterNav onClick={props.onClick} />
				) : (
					<FooterWeather onClick={props.onClick} />
				)}
			</footer>
		</div>
	);
};

export default Footer;
