import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Product } from './pages/app/products/[_id]/[id]'
import { NewProduct } from './pages/app/products/new-product'
import { Products } from './pages/app/products/products'
import { SingIn } from './pages/auth/signIn'
import { SignUp } from './pages/auth/signUp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/products', element: <Products /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/new', element: <NewProduct /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/products/:id', element: <Product /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SingIn /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-up', element: <SignUp /> }],
  },
])
