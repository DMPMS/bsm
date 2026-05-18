import { useParams } from "react-router-dom";
import { useLineupglobals } from "../hooks/useLineupglobals";
import styles from "../styles/lineupglobalsScreen.module.css";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import ImageLabel from "../components/imageLabel/imageLabel";
import { DEFAULT_TEAMGLOBAL_IMAGE_URL } from "../config/constants";
import LineupCard from "../components/lineupCard/lineupCard";

const LineupglobalsScreen = () => {
  const { teamglobalId } = useParams<{ teamglobalId: string }>();

  const {
    updateActiveLineupglobal,
    loadingLineupglobals,
    loadingRequest,
    lineupglobals,
    loadingTeamglobal,
    teamglobal,
    loadingRequestPreset,
    handleClickUpdate,
    handleClickTeamglobals,
    handleClickUpdateTeamglobal,
  } = useLineupglobals(teamglobalId!);

  return loadingLineupglobals || loadingTeamglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header loading={loadingRequest} />
      <div className={styles.cardLineupglobals}>
        <h2 className={styles.h2}>Escalações</h2>

        <div className={styles.containerButtonsAndLabel}>
          <div className={styles.containerButtons}>
            <button
              className={`${styles.button} ${styles.buttonTeamglobals}`}
              type="button"
              onClick={handleClickTeamglobals}
              disabled={loadingRequest}
            >
              Times
            </button>

            <button
              className={`${styles.button} ${styles.buttonUpdateTeamglobal}`}
              type="button"
              onClick={handleClickUpdateTeamglobal}
              disabled={loadingRequest}
            >
              Atualizar Time
            </button>
          </div>

          <div className={styles.imageLabel}>
            <ImageLabel
              size={20}
              imageUrl={teamglobal!.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL}
              name={teamglobal!.name}
            />
          </div>
        </div>

        <div className={styles.containerLineups}>
          {lineupglobals.map((lineupglobal) => (
            <LineupCard
              className={styles.lineupCard}
              isActive={
                updateActiveLineupglobal.lineupglobalPreset ===
                lineupglobal.preset
              }
              preset={lineupglobal.preset}
              formation={lineupglobal.formation}
              playStyle={lineupglobal.playStyle}
              loadingRequest={loadingRequestPreset === lineupglobal.preset}
              handleClickUpdate={handleClickUpdate}
              disabled={loadingRequest}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineupglobalsScreen;
