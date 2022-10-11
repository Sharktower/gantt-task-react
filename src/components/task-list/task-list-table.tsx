import React, {useState} from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";

// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
//   };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

const getDateDelta = (dateFrom: Date, dateTo: Date) => {
  const differenceInTime = dateTo.getTime() - dateFrom.getTime() 
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)
  
  if(differenceInDays < 7 ){
    return <p>{`${Math.floor(differenceInDays)} ds`}</p>
  } else if ( differenceInDays >= 7 ){
    return <p>{`${Math.floor(differenceInDays/7)} Wks`}</p>
  }

  return ''
}

export const TaskListTableDefault: React.FC<{
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  isEditing: boolean;
  handleOnIsEditing: () => void;
}> = ({
  tasks,
  fontFamily,
  fontSize,
  onExpanderClick,
  isEditing,
  handleOnIsEditing
}) => {

  interface Phase {
    name?: string;
    startDate?: Date;
    endDate?: Date;
  }

  const [newPhaseMeta, setNewPhaseMeta] = useState<Phase>({name: undefined, startDate: undefined, endDate: undefined})
  const [isNewPhase, setIsNewPhase] = useState(false)

  const removeNewPhase = () => {
    if(isEditing && !tasks.length){
      handleOnIsEditing()
    } else {
      setIsNewPhase(false)
    }
  }

  const createNewPhase = () => {
    setIsNewPhase(true)
  }

  const handleOnCreateNewPhase = () => {
    handleOnIsEditing()
    createNewPhase()
  }

  const handlePhaseInput = (o: any) => {
    console.log(o)
    setNewPhaseMeta({...newPhaseMeta, ...o })
  }

  const newPhaseComplete = () => {
    return !(
      newPhaseMeta.name !== undefined && 
      newPhaseMeta.startDate !== undefined && 
      newPhaseMeta.endDate  !== undefined
    )
  }

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        width: '100%',
      }}
    > 

      {(isEditing && isNewPhase) && 
      <div style={{ padding: '10px'}}>
        <span style={{display: 'flex'}}>
        <table style={{backgroundColor: '#F7F7F7', width:'100%', padding: '10px'}}>
          <tr>
            <th style={{textAlign: 'left', padding: '5px', width: '60%'}}>Phase Name</th>
            <th style={{textAlign: 'left', padding: '5px', width: '10%'}}>Start</th>
            <th style={{textAlign: 'left', padding: '5px', width: '10%'}}>End</th>
            <th style={{textAlign: 'left', padding: '5px', width: '10%'}}>&nbsp;</th>
            <th style={{textAlign: 'left', padding: '5px', width: '10%'}}>&nbsp;</th>
          </tr>
          <tbody>
            <tr>
              <td ><input onInput={(e) => handlePhaseInput({name: e.target})}  style={{width: '95%', border:'1pz solid #E1E1E1', minHeight: '30px', padding: '0 5px'}} placeholder='Enter a Phase name' /></td>
              <td style={{ padding: '5px' }}><input style={{width: '100%', border:'1pz solid #E1E1E1', minHeight: '30px'}} placeholder='Enter a Phase name' type='date' onChange={(e) => handlePhaseInput({startDate: e.target.value})}/></td>
              <td style={{ padding: '5px' }}><input onChange={(e) => handlePhaseInput({endDate: e.target.value})} style={{width: '100%', border:'1pz solid #E1E1E1', minHeight: '30px'}} placeholder='Enter a Phase name' type='date'/></td>
              <td style={{ padding: '5px' }}>&nbsp;</td>
              <td style={{ padding: '5px' }}><button style={{ backgroundColor: 'gray', color: 'white' }} onClick={createNewPhase} disabled={newPhaseComplete()}>+</button></td>
            </tr>
          </tbody>
        </table> 
        <span style={{display: 'flex', alignItems: 'center', margin: '0 1%' }}>
          <button style={{height: 'fit-content' }} onClick={removeNewPhase}>x</button>
        </span>
        </span>
      </div>
      }

      {isEditing && 
        <span style={{ display: 'flex', justifyContent: 'space-evenly', marginTop:'20px', width: '90%' }}>
              {/* Import the plus icon from ui components */}
              <button onClick={createNewPhase}>
                 Add a phase
              </button>
              {/* Import the plus icon from ui components */}
              <button>
                 Add an Activity
              </button>
              {/* Import the plus icon from ui components */}
              <button>
                 Add an outcome
              </button>
          </span>
      }

      {(!tasks.length && !isEditing) && 
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '5px solid white', textAlign: 'center', alignItems: 'center', borderRight: '1px solid #F2F2F2' }}>
          <div style={{ padding: "50px" }}>
            <span style={{ display: 'flex', justifyContent: 'center'}}>
              <div style={{ height: '75px', width: '75px', borderRadius: '500px', backgroundColor:'#673F73', opacity: "0.1"}}/>
            </span>
            <strong><h5 style={{ fontSize: '18px' }}>No Items</h5></strong>

            <p style={{ fontSize: '13px', padding: '0 20% 10% 20%' }} >Your gantt plan is currenlty empty. Start by adding a phase, activity or outcome below</p>
            <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {/* Import the plus icon from ui components */}
              <button onClick={handleOnCreateNewPhase}>
                 Add a phase
              </button>
              {/* Import the plus icon from ui components */}
              <button>
                 Add an Activity
              </button>
              {/* Import the plus icon from ui components */}
              <button>
                 Add an outcome
              </button>
            </span>
            </div>
        </div>
      }


      {(tasks.length && !isEditing) && tasks.map(t => {
        let expanderSymbol = <div className={styles.taskListCircle}></div>;
        return (
          <div style={{ maxHeight: '44px', display: 'flex',  height: "100%", marginLeft: t.hideChildren === undefined ? '20px' : '0px', borderLeft:  t.hideChildren === undefined ? '1px solid #F4F4F4' : 'none', borderBottom: '5px solid white'}}>
            { t.hideChildren === undefined && t.project ? 
            <div className={t.type === "milestone" ? styles.taskListLineWrapperHalfBorder : styles.taskListLineWrapperFullBorder} >
               <hr className={styles.taskListLine}/> 
            </div>
             : '' }
            <div
              className={styles.taskListTableRow}
              key={`${t.id}row`}
              onClick={() => onExpanderClick(t)}
            >
              <div className={ expanderSymbol ? styles.taskListExpander : styles.taskListEmptyExpander} style={{ display: 'flex' }}>
                  {expanderSymbol}
                  <div className={ styles.taskListTableRowTitle }style={{fontWeight: t.hideChildren === undefined ? 'lighter' : 'bold',}}>
                    {t.name}
                  </div>
              </div>
              <span className={ styles.taskListTableRowMetaWrapper }>
                <span className={ styles.taskListTableRowMetaItem } style={{backgroundColor: 'blue',}}>DEC</span>
                <span className={ styles.taskListTableRowMetaTime }>{getDateDelta(t.start, t.end)}</span>
              </span>
            </div>
          </div>
        );
      })
    }
    </div>
  )
};


