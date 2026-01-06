import type { CountryCodeEnum } from "../../enums/CountryCode.enum";
import CountryIcon from "../icons/country.icon";
import styles from "./country.module.css";

interface CountryProps {
  countryCode: CountryCodeEnum;
  name: string;
  size?: number;
}

const Country = ({ countryCode, name, size = 20 }: CountryProps) => {
  return (
    <div
      className={styles.container}
      style={{ "--size": size } as React.CSSProperties}
    >
      <CountryIcon
        className={styles.countryIcon}
        countryCode={countryCode}
        size={size}
      />
      {name}
    </div>
  );
};

export default Country;
