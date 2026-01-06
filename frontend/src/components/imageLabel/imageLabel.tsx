import Image from "../image/image";
import styles from "./imageLabel.module.css";

interface ImageLabelProps {
  imageUrl: string;
  name: string;
  size?: number;
}

const ImageLabel = ({ imageUrl, size = 20, name }: ImageLabelProps) => {
  return (
    <div className={styles.imageLabel}>
      <Image src={imageUrl} size={size} /> {name}
    </div>
  );
};

export default ImageLabel;
