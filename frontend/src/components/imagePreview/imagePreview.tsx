import { useEffect, useState } from "react";
import { validateImage } from "../../utils/validateImage";
import styles from "./imagePreview.module.css";

interface ImagePreviewProps {
  imageUrl: string;
  backgroundUrl: string;
  size: number;
}

const ImagePreview = ({ imageUrl, backgroundUrl, size }: ImagePreviewProps) => {
  const [checkedImageUrl, setCheckedImageUrl] = useState<string>("");

  useEffect(() => {
    const checkImage = async () => {
      if (!imageUrl) {
        setCheckedImageUrl("");
        return;
      }

      const valid = await validateImage(imageUrl);
      setCheckedImageUrl(valid ? imageUrl : "");
    };

    checkImage();
  }, [imageUrl]);

  return (
    <div
      className={styles.container}
      style={
        {
          "--size": size,
          "--urlImage": `url(${imageUrl ? "/background.png" : backgroundUrl})`,
        } as React.CSSProperties
      }
    >
      {checkedImageUrl ? (
        <img src={checkedImageUrl} width={size} height={size} />
      ) : (
        <div
          className={styles.noImage}
          style={{ "--size": size } as React.CSSProperties}
        />
      )}
    </div>
  );
};

export default ImagePreview;
