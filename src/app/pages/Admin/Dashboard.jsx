import React from 'react'
import { AdminDashboard } from '../../components/Admin/AdminDashboard/AdminDashboard'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const currentUser = useSelector(state => state.currentUser);

  return (
    currentUser?.role === 'admin' &&
    <AdminDashboard />
  )
}

export default Dashboard;