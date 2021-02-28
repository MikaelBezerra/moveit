import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
	type: "body" | "eye";
	description: string;
	amount: number;
}

interface ChallengeContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	experienceToNextLevel: number;
	activeChallenges: Challenge;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenges: () => void;
	CompletedChallenges: () => void;
	closeLevelUp: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
	const [level, setLevel] = useState(rest.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
	const [challengesCompleted, setChallengesCompleted] = useState(
		rest.challengesCompleted ?? 0,
	);

	const [activeChallenges, setActiveChallenges] = useState(null);
	const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookies.set("level", String(level));
		Cookies.set("currentExperience", String(currentExperience));
		Cookies.set("challengesCompleted", String(challengesCompleted));
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
		setIsLevelUpModalOpen(true);
	}

	function closeLevelUp() {
		setIsLevelUpModalOpen(false);
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setActiveChallenges(challenge);

		new Audio("/notification.mp3").play();

		if (Notification.permission === "granted") {
			new Notification("Novo desafio ");
			body: `Valendo ${challenge.amount} xp`;
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

		let finalExperience = currentExperience + amount;

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
				currentExperience,
				challengesCompleted,
				levelUp,
				startNewChallenge,
				activeChallenges,
				resetChallenges,
				experienceToNextLevel,
				CompletedChallenges,
				closeLevelUp,
			}}
		>
			{children}
			{isLevelUpModalOpen && <LevelUpModal />}
		</ChallengeContext.Provider>
	);
}
