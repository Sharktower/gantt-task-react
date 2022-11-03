import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./milestone.module.css";

export const Milestone: React.FC<TaskItemProps> = ({
  task,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;
  const getBarColor = () => {
    return isSelected
      ? task.styles.backgroundSelectedColor
      : task.styles.backgroundColor;
  };

  return (
    <g tabIndex={0} className={styles.milestoneWrapper}  x={task.x1} 
    y={task.y} >


      <rect
        fill={getBarColor()}
        x={task.x1}
        width={task.height + 5}
        y={task.y - 5}
        height={task.height + 5}
        rx='50%' 
        ry='50%'
        transform={transform}
        className={styles.milestoneBackground}
        onMouseDown={e => {
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
        <rect
          x={task.x1}
          y={task.y + 8}
          fill="red"
          width="5px"
          height="5px"
          rx='50%'
          ry='50%'
        />
      <svg x={task.x1 + 9}  y={task.y + 6}  height={task.height} width={task.height} style={{ zIndex: 9999 }}>
        <path 
          transform="scale(0.02)"
          strokeWidth="10"
          style={{fillOpacity: '1', fill: 'white'}} 
          height='15px' 
          width='15px' 
          d="M344.348 74.667C287.742 74.667 242.446 40 172.522 40c-28.487 0-53.675 5.322-76.965 14.449C99.553 24.713 75.808-1.127 46.071.038 21.532.999 1.433 20.75.076 45.271-1.146 67.34 12.553 86.382 32 93.258V500c0 6.627 5.373 12 12 12h8c6.627 0 12-5.373 12-12V378.398c31.423-14.539 72.066-29.064 135.652-29.064 56.606 0 101.902 34.667 171.826 34.667 51.31 0 91.933-17.238 130.008-42.953 6.589-4.45 10.514-11.909 10.514-19.86V59.521c0-17.549-18.206-29.152-34.122-21.76-36.78 17.084-86.263 36.906-133.53 36.906zM48 28c11.028 0 20 8.972 20 20s-8.972 20-20 20-20-8.972-20-20 8.972-20 20-20zm432 289.333C456.883 334.03 415.452 352 371.478 352c-63.615 0-108.247-34.667-171.826-34.667-46.016 0-102.279 10.186-135.652 26V106.667C87.117 89.971 128.548 72 172.522 72c63.615 0 108.247 34.667 171.826 34.667 45.92 0 102.217-18.813 135.652-34.667v245.333z"
        />

      </svg>
    </g>
  );
};
