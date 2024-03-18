import React from "react";
import Button from "../components/Button";
import navigate from "../inc/scripts/utilities";
import Spinner from "../components/Spinner";
const NotFound = ()=>{
    
    const returnHome = ()=>{
        navigate("/weather");
    }
    return (
			<React.Fragment>
				<Spinner />
				<section
					className="container-fluid d-flex flex-column align-items-center justify-content-center"
					style={{ minHeight: "100vh" }}>
					<h2 className="text-capitalize my-3 fs-3 fw-bold text-center">
						Ошибка!
					</h2>

					<p className="text-muted text-capitalize text-center">
						Запрошенная страница не найдена!
					</p>

					<section className="d-flex align-items-center justify-content-center">
						<Button
							text="Главная"
							className="brand-btn m-auto my-5 width-toggle"
							onClick={returnHome}
						/>
					</section>
				</section>
			</React.Fragment>
		);
}

export default NotFound;