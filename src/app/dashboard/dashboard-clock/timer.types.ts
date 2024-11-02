export type TimerMode = 'pomodoro' | 'session' | 'break';

export interface TimerState {
  sessionLength: number;
  breakLength: number;
  currentMode: TimerMode;
  timeRemaining: number;
  isRunning: boolean;
}