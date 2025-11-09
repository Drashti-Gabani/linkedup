import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EyeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#D0C9D6' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.36365C8.36364 6.36365 5.25818 8.62547 4 11.8182C5.25818 15.0109 8.36364 17.2727 12 17.2727C15.6364 17.2727 18.7418 15.0109 20 11.8182C18.7418 8.62547 15.6364 6.36365 12 6.36365ZM12 15.4546C9.99273 15.4546 8.36364 13.8255 8.36364 11.8182C8.36364 9.81092 9.99273 8.18183 12 8.18183C14.0073 8.18183 15.6364 9.81092 15.6364 11.8182C15.6364 13.8255 14.0073 15.4546 12 15.4546ZM12 9.63637C10.7927 9.63637 9.81818 10.6109 9.81818 11.8182C9.81818 13.0255 10.7927 14 12 14C13.2073 14 14.1818 13.0255 14.1818 11.8182C14.1818 10.6109 13.2073 9.63637 12 9.63637Z"
        fill={color}
      />
    </Svg>
  );
};

export default EyeIcon;
