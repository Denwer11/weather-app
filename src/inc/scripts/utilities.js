import jQuery from "jquery";

export function navigate(page) {
	window.location.href = `${page}`;
}

const closeUtilityComponent = () => {
	jQuery(($) => {
		$.noConflict();

		$(".utility-component").removeClass("add-utility-component-height");
	});
};
export const getDayOfWeek = (date) => {
	const days = [
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
	];
	const dayIndex = new Date(date * 1000).getDay();
	return days[dayIndex];
};

export const getCurrentDate = () => {
	let day, month, date, result;

	const DATE = new Date();

	date = DATE.getDate();

	switch (DATE.getMonth()) {
		case 0:
			month = "Января";
			break;
		case 1:
			month = "Февраля";
			break;
		case 2:
			month = "Марта";
			break;
		case 3:
			month = "Апреля";
			break;
		case 4:
			month = "Мая";
			break;
		case 5:
			month = "Июня";
			break;
		case 6:
			month = "Июля";
			break;
		case 7:
			month = "Августа";
			break;
		case 8:
			month = "Сентября";
			break;
		case 9:
			month = "Октября";
			break;
		case 10:
			month = "Ноября";
			break;
		case 11:
			month = "Декабря";
			break;
		default:
			month = "Не найдено";
			break;
	}

	switch (DATE.getDay()) {
		case 0:
			day = "Воскресенье";
			break;
		case 1:
			day = "Понедельник";
			break;
		case 2:
			day = "Вторник";
			break;
		case 3:
			day = "Среда";
			break;
		case 4:
			day = "Четверг";
			break;
		case 5:
			day = "Пятница";
			break;
		case 6:
			day = "Суббота";
			break;
		default:
			day = "Не найдено";
			break;
	}

	result = `${day}, ${date} ${month}`;
	return result;
};

export const convertTo24Hour = (time) => {
	let hours = parseInt(time.substr(0, 2));
	return hours + ":00 ";
};

export function getTimeFromDateString(datetime) {
	let time = datetime.substr(11);
	let hours = parseInt(time.substr(0, 2));
	let formattedTime = hours + time.substr(2);
	return formattedTime;
}
export default navigate;
