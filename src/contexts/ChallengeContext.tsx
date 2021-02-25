import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";

interface Challenge {
	type: "body" | "eye";
	description: string;
	amount: number;
}

interface ChallengeContextData {
	level: number;
	CurrentExperience: number;
	challengesCompleted: number;
	experienceToNextLevel: number;
	activeChallenges: Challenge;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenges: () => void;
	CompletedChallenges: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [CurrentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);

	const [activeChallenges, setActiveChallenges] = useState(null);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, [])

	function levelUp() {
		setLevel(level + 1);
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setActiveChallenges(challenge);

		new Audio('/notification.mp3').play();

		if (Notification.permission === 'granted') {
			new Notification('Novo desafio ')
			body: `Valendo ${challenge.amount} xp`
		}
	}

	function resetChallenges() {
		setActiveChallenges(null);
	}

	function CompletedChallenges() {
		if (!activeChallenges) {
			return;
		}
		const { amount } = activeChallenges;

		let finalExperience = CurrentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenges(null);
		setChallengesCompleted(challengesCompleted + 1);
	}

	return (
		<ChallengeContext.Provider
			value={{
				level,
				CurrentExperience,
				challengesCompleted,
				levelUp,
				startNewChallenge,
				activeChallenges,
				resetChallenges,
				experienceToNextLevel,
				CompletedChallenges,
			}}
		>
			{children}
		</ChallengeContext.Provider>
	);
}
