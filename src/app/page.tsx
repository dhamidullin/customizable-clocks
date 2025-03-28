import Clock from './components/Clock'
import Sidebar from './components/Sidebar'
import { ClockSettingsProvider } from './contexts/ClockSettingsContext'

export default function Home() {
  return (
    <ClockSettingsProvider>
      <Clock />
      <Sidebar />
    </ClockSettingsProvider>
  );
}
