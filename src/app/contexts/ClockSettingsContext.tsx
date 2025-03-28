'use client'

import React, { createContext, useContext, useState } from 'react'

enum MovementOptions {
  CONTINIOUS = 'CONTINIOUS',
  STEPPY = 'STEPPY',
}

interface HandSettings {
  size: number
  thinckness: number
  visible: boolean
  movementMethod: MovementOptions
}

type HandContextType = HandSettings & {
  setSize: (size: number) => void
  setThickness: (thinckness: number) => void
  setVisible: (visible: boolean) => void
  setMovementMethod: (movementMethod: MovementOptions) => void
}

interface ClockSettingsContextType {
  minutesHand: HandContextType
  hoursHand: HandContextType
  secondsHand: HandContextType
}

const defaults: ClockSettingsContextType = {
  minutesHand: {
    size: .4,
    thinckness: 1.8,
    visible: true,
    movementMethod: MovementOptions.CONTINIOUS,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
    setMovementMethod: () => { },
  },

  hoursHand: {
    size: .75,
    thinckness: 1,
    visible: true,
    movementMethod: MovementOptions.CONTINIOUS,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
    setMovementMethod: () => { },
  },

  secondsHand: {
    size: .9,
    thinckness: .2,
    visible: true,
    movementMethod: MovementOptions.CONTINIOUS,
    setSize: () => { },
    setThickness: () => { },
    setVisible: () => { },
    setMovementMethod: () => { },
  },
}

const ClockSettingsContext = createContext<ClockSettingsContextType>(defaults)

export function ClockSettingsProvider({ children }: { children: React.ReactNode }) {
  const [minutesHand, setMinutesHand] = useState<HandSettings>(defaults.minutesHand)
  const [hoursHand, setHoursHand] = useState<HandSettings>(defaults.hoursHand)
  const [secondsHand, setSecondsHand] = useState<HandSettings>(defaults.secondsHand)

  const contextValue = {
    minutesHand: {
      ...minutesHand,
      setSize: (size: number) => setMinutesHand({ ...minutesHand, size }),
      setThickness: (thinckness: number) => setMinutesHand({ ...minutesHand, thinckness }),
      setVisible: (visible: boolean) => setMinutesHand({ ...minutesHand, visible }),
      setMovementMethod: (movementMethod: MovementOptions) => setMinutesHand({ ...minutesHand, movementMethod }),
    },

    hoursHand: {
      ...hoursHand,
      setSize: (size: number) => setHoursHand({ ...hoursHand, size }),
      setThickness: (thinckness: number) => setHoursHand({ ...hoursHand, thinckness }),
      setVisible: (visible: boolean) => setHoursHand({ ...hoursHand, visible }),
      setMovementMethod: (movementMethod: MovementOptions) => setHoursHand({ ...hoursHand, movementMethod }),
    },

    secondsHand: {
      ...secondsHand,
      setSize: (size: number) => setSecondsHand({ ...secondsHand, size }),
      setThickness: (thinckness: number) => setSecondsHand({ ...secondsHand, thinckness }),
      setVisible: (visible: boolean) => setSecondsHand({ ...secondsHand, visible }),
      setMovementMethod: (movementMethod: MovementOptions) => setSecondsHand({ ...secondsHand, movementMethod }),
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