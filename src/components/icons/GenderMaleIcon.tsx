import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface GenderMaleIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const GenderMaleIcon: React.FC<GenderMaleIconProps> = ({
  width = 18,
  height = 18,
  color = '#C6C6C6',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default GenderMaleIcon;

