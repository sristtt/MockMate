import React from 'react'
import { Toaster } from 'sonner'

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>{children}
   <Toaster/> 
    </div>
  )
}

export default RootLayout