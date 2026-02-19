import ButtonRadio from "../components/buttonRadio/buttonRadio";
import FormGroup from "../components/formGroup/formGroup";
import Header from "../components/header/header";
import Spinner from "../components/spinner/spinner";
import { CURRENT_DATE } from "../config/constants";
import { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";
import { useSettingsglobal } from "../hooks/useSettingsglobal";
import styles from "../styles/settingsglobalScreen.module.css";

const UpdateSettingsglobalScreen = () => {
  const {
    updateSettingsglobal,
    loadingSettingsglobal,
    loadingRequest,
    disabledButton,
    handleChangeSeasonOffsetButton,
    handleUpdateSettingsglobal,
    handleReset,
    handleCancel,
  } = useSettingsglobal();

  return loadingSettingsglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardSettingsglobal}>
        <h2 className={styles.h2}>Configurações</h2>
        <form className={styles.form} onSubmit={handleUpdateSettingsglobal}>
          <div className={styles.containerFormGroups}>
            <FormGroup label="Temporada" required={true}>
              <ButtonRadio
                options={[
                  {
                    value: String(SeasonOffsetEnum.PreviousYear),
                    label: String(CURRENT_DATE.getFullYear() - 1),
                  },
                  {
                    value: String(SeasonOffsetEnum.CurrentYear),
                    label: String(CURRENT_DATE.getFullYear()),
                  },
                  {
                    value: String(SeasonOffsetEnum.NextYear),
                    label: String(CURRENT_DATE.getFullYear() + 1),
                  },
                ]}
                value={String(updateSettingsglobal.seasonOffset)}
                onChange={(value) =>
                  handleChangeSeasonOffsetButton(
                    Number(value) as SeasonOffsetEnum,
                  )
                }
                disabled={loadingRequest}
              />
            </FormGroup>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              disabled={loadingRequest}
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button
              className={`${styles.button} ${styles.resetButton}`}
              type="button"
              disabled={loadingRequest}
              onClick={handleReset}
            >
              Resetar
            </button>

            <button
              className={`${styles.button} ${styles.submitButton}`}
              type="submit"
              disabled={disabledButton || loadingRequest}
            >
              <span
                className={`${styles.buttonContent} ${
                  loadingRequest && styles.buttonContentLoading
                }`}
              >
                Salvar
                {loadingRequest && (
                  <Spinner size={12} className={styles.spinner} />
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSettingsglobalScreen;
