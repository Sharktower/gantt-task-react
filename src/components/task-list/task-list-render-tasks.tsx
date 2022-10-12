import React, {Fragment} from "react";
import styles from "./task-list-render-tasks.module.css";
import { Task } from "../../types/public-types";


const getDateDelta = (dateFrom: Date, dateTo: Date) => {
  const differenceInTime = dateTo.getTime() - dateFrom.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays < 7) {
    return <p>{`${Math.floor(differenceInDays)} ds`}</p>;
  } else if (differenceInDays >= 7) {
    return <p>{`${Math.floor(differenceInDays / 7)} Wks`}</p>;
  }

  return "";
};


type TaskListRenderTasksProps = {
  tasks: Task[],
  onExpanderClick: (task: any) => void;
}

export const TaskListRenderTasks = ({tasks, onExpanderClick} : TaskListRenderTasksProps ) => {

    const handleExpander = (task:any) => onExpanderClick(task)

    return(
        <Fragment>
        {tasks.map(t => {
          let expanderSymbol = <div className={styles.taskListCircle}></div>;
          return (
            <div
              style={{
                maxHeight: "44px",
                display: "flex",
                height: "100%",
                marginLeft: t.hideChildren === undefined ? "20px" : "0px",
                borderLeft:
                  t.hideChildren === undefined ? "1px solid #F4F4F4" : "none",
                borderBottom: "5px solid white",
              }}
            >
              {t.hideChildren === undefined && t.project ? (
                <div
                  className={
                    t.type === "milestone"
                      ? styles.taskListLineWrapperHalfBorder
                      : styles.taskListLineWrapperFullBorder
                  }
                >
                  <hr className={styles.taskListLine} />
                </div>
              ) : (
                ""
              )}
              <div
                className={styles.taskListTableRow}
                key={`${t.id}row`}
                onClick={() => handleExpander(t)}
              >
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  style={{ display: "flex" }}
                >
                  {expanderSymbol}
                  <div
                    className={styles.taskListTableRowTitle}
                    style={{
                      fontWeight:
                        t.hideChildren === undefined ? "lighter" : "bold",
                    }}
                  >
                    {t.name}
                  </div>
                </div>
                <span className={styles.taskListTableRowMetaWrapper}>
                  <span
                    className={styles.taskListTableRowMetaItem}
                    style={{ backgroundColor: "blue" }}
                  >
                    DEC
                  </span>
                  <span className={styles.taskListTableRowMetaTime}>
                    {getDateDelta(t.start, t.end)}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
        </Fragment>
    )
}