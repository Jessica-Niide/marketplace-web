import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-scroll bg-background-custom">
      <div className="w-full border border-x-0 border-t-0 border-fill ">
        <Header />
      </div>
      <div className="m-auto w-full max-w-[1500px] grow">
        <Outlet />
      </div>
    </div>
  )
}
