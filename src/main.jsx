import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './routes/HomePage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import WritePage from './routes/WritePage.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import Login from './routes/Login.jsx'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
// import "/react-toastify/dist/ReactToastify.css"

const queryClient = new QueryClient()


const router = createBrowserRouter([
{
  element:<MainLayout/>,
  children : [
    {
      path:"/",
      element: (<ProtectedRoute> <HomePage/> </ProtectedRoute>)
    }, 
    {
      path:"/blogs",
      element: (<ProtectedRoute><PostListPage/></ProtectedRoute>),
      errorElement: (<ErrorPage />)
    },
    {
      path:"/blog/:id",
      element: (<ProtectedRoute> <SinglePostPage/></ProtectedRoute> )
    },
    {
      path:"/write",
      element: (<ProtectedRoute><WritePage/></ProtectedRoute>)
    },
    {
      path:"/edit-blog/:id",
      element: (<ProtectedRoute><WritePage/></ProtectedRoute>)
    },
     {
      path:"*",
      element: (<div>404 Not Found</div>)
    },
  ]
},
{
 path:"/loginNew",
 element:<Login/> 
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer position='bottom-right'/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
