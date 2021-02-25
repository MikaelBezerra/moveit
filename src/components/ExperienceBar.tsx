import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

import style from "../style/components/ExperienceBar.module.css";

export function ExperienceBar() {
	const { CurrentExperience, experienceToNextLevel } = useContext(ChallengeContext);

	const porcentToNextLevel = Math.round(CurrentExperience * 100) / experienceToNextLevel;

	return (
		<header className={style.experienceBar}>
			<span>0xp</span>
			<div>
				<div style={{ width: `${porcentToNextLevel}` }} />
				<span
					className={style.CurrentExperience}
					style={{ left: `${porcentToNextLevel}` }}
				>
					{CurrentExperience} xp
				</span>
			</div>
			<span>{experienceToNextLevel} xp</span>
		</header>
	);
}
