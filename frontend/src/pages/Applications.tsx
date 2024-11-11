import ApplicationForm from '@/components/Applications/ApplicationForm'
import ApplicationsList from '@/components/Applications/ApplicationsList'
import CreateApplication from '@/components/Applications/CreateApplication'
import React from 'react'

const Applications = () => {
  return (
<div className='my-4 bg-slate-100 rounded-lg'>
            <h1 className='m-4 p-2 font-bold text-2xl'>Application List</h1>
            <ApplicationsList />
    </div>
  )
}

export default Applications