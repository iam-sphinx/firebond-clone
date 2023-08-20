import { ReactElement } from 'react';
import Image from 'next/image';

type ProfileIconProps = {
  onProfileIconClick: () => void;
  imageUrl: string;
  size?: number | string;
  classNameCircle?: string;
  classNameImage?:string;
  style?: React.CSSProperties;
  alt?: string;
};



// Component for rendering a circular profile icon with an image
const ProfileIcon = ({ imageUrl, size =32, classNameCircle = '', style, alt = 'Profile Image',classNameImage='',onProfileIconClick }: ProfileIconProps): ReactElement => {
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : { width: size };
  return (
    <div
      onClick={onProfileIconClick}
      className={`relative inline-block rounded-full overflow-hidden ${classNameCircle}`}
      style={{ ...sizeStyle, ...style }}
    >
      <img
        src={imageUrl!==''?imageUrl:"/Icons/profileTemplate.jpg"}
        alt={alt}
        className={`object-cover ${classNameImage}`}
      />
    </div>
  );
};

export default ProfileIcon;
