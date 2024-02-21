import React from "react";
import FooterNav from "./footerNav";
import UtilityComponent from "./utilityFooterComponet";
import FooterWeather from "./footerWeather";

const Footer = (props) => {
	const customFooterStyle = {
		zIndex: "10",
	};
	const isWeatherPage = window.location.pathname === "/weather";
	console.log(isWeatherPage);
	return (
		<div
			className="m-auto d-flex align-items-center justify-content-center "
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
