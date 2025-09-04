import MainLayout from '../../Components/layout/MainLayout'
import SettingsPage from '../../Pages/Settings'

export default function Settings() {
  return (
    <MainLayout currentPage="Settings">
      <SettingsPage />
    </MainLayout>
  )
}