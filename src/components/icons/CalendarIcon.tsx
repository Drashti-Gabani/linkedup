import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CalendarIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  width = 13,
  height = 14,
  color = '#A8A8A8',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 14" fill="none">
      <Path
        d="M11.375 1.75h-.875V.875a.875.875 0 00-1.75 0V1.75h-4.5V.875a.875.875 0 00-1.75 0V1.75h-.875A1.75 1.75 0 000 3.5v9.625A1.75 1.75 0 001.75 14.875h9.625a1.75 1.75 0 001.75-1.75V3.5a1.75 1.75 0 00-1.75-1.75ZM11.375 13.125H1.75V5.25h9.625v7.875Z"
        fill={color}
      />
    </Svg>
  );
};

export default CalendarIcon;

