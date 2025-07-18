import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action'
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:{params :{id:string}}) => {
    const interview = await getInterviewById( params.id);
    const user = await getCurrentUser();
    if(!interview) redirect('/');
  return (
    <>
    <div className='flex flex-row gap-4 justify-between'>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
            <div className='flex flex-row gap-4 items-center'>
                <Image
                src={getRandomInterviewCover()}
                alt='Random cover'
                width={40}
                height={40}
                className='rounded-full object-cover size-[40px]'

                />
                <h3 className='capitalize'>{interview.role} Interview</h3>
            </div>
            <DisplayTechIcons techStack={interview.techstack}/>
        </div>
        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
    </div>
    <Agent userName={user?.name!} userId={user?.id||""} type='interview' interviewId={params.id} questions={interview.questions}/>
    </>
  )
}

export default page