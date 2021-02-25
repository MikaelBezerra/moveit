import { useState, useEffect, useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import style from "../style/components/Countdown.module.css";

export function Countdown() {
	const { minutes, seconds, hasFinished, isActive, reset, start } = useContext(
		CountdownContext,
	);

	const [minutesLeft, minutesRight] = String(minutes).padStart(2, "0").split("");
	const [secondsLeft, secondsRight] = String(seconds).padStart(2, "0").split("");

	return (
		<div>
			<div className={style.CountdownContainer}>
				<div>
					<span>{minutesLeft}</span>
					<span>{minutesRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondsLeft}</span>
					<span>{secondsRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button disabled className={style.CountdownButton}>
					Ciclo encerrado
					<img src="icons/check.svg" alt="Close" />
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type="button"
							className={` ${style.CountdownButton} ${style.CountdownButtonActive} `}
							onClick={reset}
						>
							Abandonar Ciclo
						</button>
					) : (
						<button type="button" className={style.CountdownButton} onClick={start}>
							Iniciar um ciclo
						</button>
					)}
				</>
			)}
		</div>
	);
}
