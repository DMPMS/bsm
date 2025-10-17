export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  size: number;
}

const Image = ({ src, size, ...props }: ImageProps) => {
  return <img src={src} width={size} height={size} {...props} />;
};

export default Image;
