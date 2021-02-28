import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../style/components/LevelUpModal.module.css";

export function LevelUpModal() {
	const { level, closeLevelUp } = useContext(ChallengeContext);

	return (
		<div className={styles.overlay}>
			<div className={styles.LevelUpContainer}>
				<header>{level}</header>

				<strong>Parabéns</strong>
				<p>Você alcançou um novo level</p>
				<button type="button" onClick={closeLevelUp}>
					<img src="/icons/close.svg" alt="Sair" />
				</button>
			</div>
		</div>
	);
}
