import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EmailIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const EmailIcon: React.FC<EmailIconProps> = ({
  width = 16,
  height = 12,
  color = '#A8A8A8',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 12" fill="none">
      <Path
        d="M1 1H15C15.5523 1 16 1.44772 16 2V10C16 10.5523 15.5523 11 15 11H1C0.447715 11 0 10.5523 0 10V2C0 1.44772 0.447715 1 1 1Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2L8 7L0 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EmailIcon;

