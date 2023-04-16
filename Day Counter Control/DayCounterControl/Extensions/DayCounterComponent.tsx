import * as React from "react";
import {
  ColorFormat,
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";
import { IInputs, IOutputs } from "../generated/ManifestTypes";

export interface Iprops {
  context: ComponentFramework.Context<IInputs>;  
  endDateTime: number;
  initialColour: string;
  warningColour: string;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  AlertDays:number;
  NotifyOutputChanged:()=>void;
  NeedAnimation:boolean;
}



const renderTime = (dimension: string, time: number) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

export default function renderDate(props: Iprops) {
  const [endDateTimeState, updateEndDateTime] = React.useState(props.endDateTime);

  const timerProps = {
    isPlaying: props.NeedAnimation,
    size: 120,
    strokeWidth: 6,
  };
  const showHours = props.showHours;
  const showMinutes = props.showMinutes;
  const showSeconds = props.showSeconds;
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  let endTime = Math.floor(
    endDateTimeState / 1000
  );
  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  const getTimeSeconds = (time: any) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time: any) =>
    ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time: any) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time: any) => (time / daySeconds) | 0;
  const getColour: any = (remainingDays: number) => {   
    let initialColor: ColorFormat =props.initialColour as ColorFormat;
    let warningColor: ColorFormat = props.warningColour as ColorFormat;
    if (remainingDays < props.AlertDays) return warningColor;
    else return initialColor;
  };
 
  // const colour: ColorFormat=getColour()
  return (
    <div className="CountdownTimer">
      <CountdownCircleTimer
        {...timerProps}
        colors={getColour(getTimeDays(daysDuration))}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <>
        {showHours&&
        <CountdownCircleTimer
          {...timerProps}
          colors={getColour(getTimeDays(daysDuration))}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>}
      </>
      <>
      {showMinutes&&
      <CountdownCircleTimer
        {...timerProps}
        colors={getColour(getTimeDays(daysDuration))}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>}
      </>
      <>
      {showSeconds&&
      <CountdownCircleTimer
        {...timerProps}
        colors={getColour(getTimeDays(daysDuration))}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>}
      </>
    </div>
  );
}
