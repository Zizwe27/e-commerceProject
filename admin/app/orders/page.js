import MainLayout from '../../Components/layout/MainLayout.jsx'
import OrdersPage from '../../Pages/Orders.js'

export default function Orders() {
  return (
    <MainLayout currentPage="Orders">
      <OrdersPage />
    </MainLayout>
  )
} 