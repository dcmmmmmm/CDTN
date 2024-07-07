
import React from 'react'
import AdminForm from '../../../../../../components/dashboard/Form/AdminForm'
import FormHeader from "../../../../../../components/dashboard/FormHeader"
import { getData } from '../../../../../../lib/getData'

export default async function ProfilePage({params : {id}}) {
  const admin = await getData(`admins/${id}`)
  return (
    <div>
      <FormHeader title="Edit Profile" />
      <AdminForm admin={admin}/>
    </div>
  )
}
