import Head from "next/head";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import style from "../style/page/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
	return (
		<div className={style.container}>
			<Head>
				<title>Move.IT</title>
			</Head>

			<ExperienceBar />

			<CountdownProvider>
				<section>
					<div>
						<Profile />
						<CompletedChallenges />
						<Countdown />
					</div>
					<div>
						<ChallengeBox />
					</div>
				</section>
			</CountdownProvider>
		</div>
	);
}
