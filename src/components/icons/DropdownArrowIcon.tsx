import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface DropdownArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
  useGradient?: boolean;
}

const DropdownArrowIcon: React.FC<DropdownArrowIconProps> = ({
  width = 11,
  height = 6,
  color = '#000000',
  useGradient = false,
}) => {
  if (useGradient) {
    return (
      <Svg width={width} height={height} viewBox="0 0 14 8" fill="none">
        <Defs>
          <LinearGradient
            id="dropdownGradient"
            x1="1.68825"
            y1="6.93578"
            x2="2.45972"
            y2="-0.154291"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#9253FF" />
            <Stop offset="1" stopColor="#8239FF" />
          </LinearGradient>
        </Defs>
        <Path
          d="M12.8073 1.06422L6.93578 6.93578L1.06422 1.06422"
          stroke="url(#dropdownGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 14 8" fill="none">
      <Path
        d="M12.8073 1.06422L6.93578 6.93578L1.06422 1.06422"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DropdownArrowIcon;

