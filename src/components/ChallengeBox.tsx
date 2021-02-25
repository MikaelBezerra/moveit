import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import style from "../style/components/ChallengeBox.module.css";

export function ChallengeBox() {
	const { activeChallenges, resetChallenges, CompletedChallenges } = useContext(
		ChallengeContext,
	);

	const { reset } = useContext(CountdownContext);

	function handleChallengeSuccess() {
		CompletedChallenges();
		reset();
	}

	function handleChallengeFailed() {
		resetChallenges();
		reset();
	}

	return (
		<div className={style.ChallengeBoxContainer}>
			{activeChallenges ? (
				<div className={style.ChallengeActive}>
					<header>Ganhe {activeChallenges.amount} xp</header>

					<main>
						<img src={`icons/${activeChallenges.type}.svg`} />
						<strong>Novo desafio</strong>
						<p>{activeChallenges.description}</p>
					</main>

					<footer>
						<button
							type="button"
							className={style.challengeFailedButton}
							onClick={handleChallengeFailed}
						>
							Falhei
						</button>
						<button
							type="button"
							className={style.challengeSuccededButton}
							onClick={handleChallengeSuccess}
						>
							Completei
						</button>
					</footer>
				</div>
			) : (
				<div className={style.ChallengeNotActive}>
					<strong>Inicie um ciclo para receber desafios a serem completados.</strong>
					<p>
						<img src="icons/level-up.svg" alt="Leveu UP" />
						Avance de level completando os desafios
					</p>
				</div>
			)}
		</div>
	);
}
