import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface CheckmarkIconProps {
  width?: number;
  height?: number;
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ 
  width = 10, 
  height = 8 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 8" fill="none">
      <Path
        d="M8.75 0.75L3.25 6.75L0.75 4.02273"
        stroke="url(#paint0_linear_checkmark)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_checkmark"
          x1="1.17512"
          y1="6.75"
          x2="2.34059"
          y2="-0.390724"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9253FF" />
          <Stop offset="1" stopColor="#8239FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CheckmarkIcon;
