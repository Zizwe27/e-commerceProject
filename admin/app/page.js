import MainLayout from '../Components/layout/MainLayout.jsx'
import DashboardOverview from '../Components/dashboard/DashboardOverview.jsx'

export default function Home() {
  return (
    <MainLayout currentPage="Dashboard">
      <DashboardOverview />
    </MainLayout>
  )
} 