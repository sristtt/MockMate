import { getInterviewById } from '@/lib/actions/general.action'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:{params :{id:string}}) => {
    const interview = await getInterviewById( params.id);
    if(!interview) redirect('/');
  return (
    <div>page</div>
  )
}

export default page