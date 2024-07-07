
import React from 'react'
import UserForm from "../../../../../components/UserForm"
import { getData } from '../../../../../lib/getData'

export default async function ProfilePage({params : {id}}) {
  const customer = await getData(`customers/${id}`)
  return (
    <div>
      <UserForm customer={customer}/>
    </div>
  )
}
