import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UserIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ 
  width = 15, 
  height = 16, 
  color = '#A8A8A8' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 16" fill="none">
      <Path
        d="M13.75 14.75V13.1944C13.75 12.3693 13.4076 11.578 12.7981 10.9946C12.1886 10.4111 11.362 10.0833 10.5 10.0833H4C3.13805 10.0833 2.3114 10.4111 1.7019 10.9946C1.09241 11.578 0.75 12.3693 0.75 13.1944V14.75M10.5 3.86111C10.5 5.57933 9.04493 6.97222 7.25 6.97222C5.45507 6.97222 4 5.57933 4 3.86111C4 2.14289 5.45507 0.75 7.25 0.75C9.04493 0.75 10.5 2.14289 10.5 3.86111Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default UserIcon;
