'use client'

import React, { createContext, useContext, useState } from 'react'

export enum MovementOptions {
  CONTINIOUS = 'CONTINIOUS',
  STEPPY = 'STEPPY',
}

interface HandSettings {
  size: number
  thinckness: number
  visible: boolean
}

type HandContextType = HandSettings & {
  setSize: (size: number) => void
  setThickness: (thinckness: number) => void
  setVisible: (visible: boolean) => void
}

interface ClockSettingsContextType {
  movementMethod: MovementOptions
  setMovementMethod: (movementMethod: MovementOptions) => void

  showSeconds: boolean
  setShowSeconds: (showSeconds: boolean) => void

  showDigital: boolean
  setShowDigital: (showDigital: boolean) => void

  sound: boolean
  setSound: (sound: boolean) => void

  volume: number
  setVolume: (volume: number) => void

  showHourNumbers: boolean,
  setShowHourNumbers: (showHourNumbers: boolean) => void

  showSecondIndices: boolean,
  setShowSecondIndices: (showSecondIndices: boolean) => void

  minutesHand: HandContextType
  hoursHand: HandContextType
  secondsHand: HandContextType
}

const defaults: ClockSettingsContextType = {
  movementMethod: MovementOptions.CONTINIOUS,
  setMovementMethod: () => { },

  showSeconds: true,
  setShowSeconds: () => { },

  showDigital: false,
  setShowDigital: () => { },

  sound: true,
  setSound: () => { },

  volume: 0.5,
  setVolume: () => { },

  showHourNumbers: true,
  setShowHourNumbers: () => { },

  showSecondIndices: true,
  setShowSecondIndices: () => { },

  hoursHand: {
    size: .4,
    thinckness: 1.8,
    visible: true,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
  },

  minutesHand: {
    size: .75,
    thinckness: 1,
    visible: true,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
  },

  secondsHand: {
    size: .9,
    thinckness: .2,
    visible: true,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
  },
}

const ClockSettingsContext = createContext<ClockSettingsContextType>(defaults)

export function ClockSettingsProvider({ children }: { children: React.ReactNode }) {
  const [movementMethod, setMovementMethod] = useState<MovementOptions>(defaults.movementMethod)
  const [showSeconds, setShowSeconds] = useState<boolean>(defaults.showSeconds)
  const [showDigital, setShowDigital] = useState<boolean>(defaults.showDigital)
  const [sound, setSound] = useState<boolean>(defaults.sound)
  const [volume, setVolume] = useState<number>(defaults.volume)

  const [minutesHand, setMinutesHand] = useState<HandSettings>(defaults.minutesHand)
  const [hoursHand, setHoursHand] = useState<HandSettings>(defaults.hoursHand)
  const [secondsHand, setSecondsHand] = useState<HandSettings>(defaults.secondsHand)

  const [showHourNumbers, setShowHourNumbers] = useState<boolean>(defaults.showHourNumbers)
  const [showSecondIndices, setShowSecondIndices] = useState<boolean>(defaults.showSecondIndices)

  const contextValue: ClockSettingsContextType = {
    movementMethod,
    setMovementMethod,

    showSeconds,
    setShowSeconds,

    showDigital,
    setShowDigital,

    sound,
    setSound,

    volume,
    setVolume,

    showHourNumbers,
    setShowHourNumbers,

    showSecondIndices,
    setShowSecondIndices,

    minutesHand: {
      ...minutesHand,
      setSize: (size: number) => setMinutesHand({ ...minutesHand, size }),
      setThickness: (thinckness: number) => setMinutesHand({ ...minutesHand, thinckness }),
      setVisible: (visible: boolean) => setMinutesHand({ ...minutesHand, visible }),
    },

    hoursHand: {
      ...hoursHand,
      setSize: (size: number) => setHoursHand({ ...hoursHand, size }),
      setThickness: (thinckness: number) => setHoursHand({ ...hoursHand, thinckness }),
      setVisible: (visible: boolean) => setHoursHand({ ...hoursHand, visible }),
    },

    secondsHand: {
      ...secondsHand,
      setSize: (size: number) => setSecondsHand({ ...secondsHand, size }),
      setThickness: (thinckness: number) => setSecondsHand({ ...secondsHand, thinckness }),
      setVisible: (visible: boolean) => setSecondsHand({ ...secondsHand, visible }),
    },
  }

  return (
    <ClockSettingsContext.Provider value={contextValue}>
      {children}
    </ClockSettingsContext.Provider>
  )
}

export function useClockSettings() {
  const context = useContext(ClockSettingsContext)

  if (context === undefined) {
    throw new Error('useClockSettings must be used within a ClockSettingsProvider')
  }

  return context
}
