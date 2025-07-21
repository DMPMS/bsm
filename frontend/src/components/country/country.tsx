import type { CountryCodeEnum } from "../../enums/CountryCode.enum";
import CountryIcon from "../icons/country.icon";
import styles from "./country.module.css";

interface CountryProps {
  countryCode: CountryCodeEnum;
  name: string;
  size?: number;
}

const Country = ({ countryCode, name, size = 20, ...props }: CountryProps) => {
  return (
    <div
      className={styles.container}
      style={{ "--size": size } as React.CSSProperties}
      {...props}
    >
      <CountryIcon countryCode={countryCode} size={size} />
      <span>{name}</span>
    </div>
  );
};

export default Country;
