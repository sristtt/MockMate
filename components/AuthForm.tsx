import React from 'react'
interface Props{
    type:'sign-in' | 'sign-up'
}
const AuthForm = ({type}:Props) => {
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm