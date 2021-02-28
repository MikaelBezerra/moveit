import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

import style from "../style/components/ExperienceBar.module.css";

export function ExperienceBar() {
	const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

	const porcentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

	return (
		<header className={style.ExperienceBar}>
			<span>0xp</span>
			<div>
				<div style={{ width: `${porcentToNextLevel};` }} />
				<span
					className={style.currentExperience}
					style={{ left: `${porcentToNextLevel}` }}
				>
					{currentExperience} xp
				</span>
			</div>
			<span>{experienceToNextLevel} xp</span>
		</header>
	);
}
