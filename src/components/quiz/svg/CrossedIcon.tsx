import React from "react";

type IconProps = {
  width: number,
  height: number,
  color: string
};

export default function CrossedIcon(props : IconProps){
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width={props.width} height={props.height} viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill={props.color} stroke="none">
        <path d="M1000 4267 c-49 -16 -133 -102 -148 -153 -18 -61 -14 -133 9 -184 15
        -35 174 -199 682 -707 l662 -663 -662 -663 c-707 -707 -702 -702 -703 -801 0
        -79 19 -126 75 -181 55 -56 102 -75 181 -75 99 1 94 -4 802 703 l662 662 663
        -662 c707 -707 702 -702 801 -703 79 0 126 19 181 75 56 55 75 102 75 181 -1
        99 4 94 -703 801 l-662 663 662 663 c707 707 702 702 703 801 0 79 -19 126
        -75 181 -55 56 -102 75 -181 75 -99 -1 -94 4 -801 -703 l-663 -662 -662 662
        c-509 508 -673 667 -708 682 -50 23 -132 26 -190 8z"/>
      </g>
    </svg>
  );
}