import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import style from '../style/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengeContext)

    return (
        <div className={style.ProfileContainer}>
            <img src="https://github.com/mikaelbezerra.png" alt="Mikael Bezerra" />
            <div>
                <strong>
                    Mikael Bezerra
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                    </p>
            </div>
        </div>
    );
}