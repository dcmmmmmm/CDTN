import { getServerSession } from 'next-auth'
import {authOptions} from '../../../../../lib/auth'
import React from 'react'
import AdminForm from '../../../../../components/dashboard/Form/AdminForm';
import {getData} from "../../../../../lib/getData"
import {ConvertIsoDateToNormal} from "../../../../../lib/ConvertIsoDateToNormal"
import SubmitButton from '../../../../../components/FormInput/SubmitButton';
import Link from 'next/link';
import { BriefcaseBusiness, Calendar, CalendarPlus, Earth, History, Mail, Phone } from 'lucide-react';
import { Button } from "../../../../../components/ui/button"
import Image from 'next/image';
export default async function AdminProfilePage({params: {id}}) {
  const admin = await getData(`/admins/${id}`)

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-28 lg:my-0 text-black dark:text-white">
      {/* <!--Main Col--> */}
      <div id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div className="p-4 md:p-12 text-center lg:text-left">
          {/* <!-- Image for mobile view--> */}
          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
          >
            <Image width={200} height={200} src={admin.image ?  admin.image : '/Avatar.png'} alt='avatar'/>
          </div>

          <h1 className="text-3xl font-bold pt-8 lg:pt-0 uppercase dark:text-white text-black">{admin.name}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start dark:text-white">
              <BriefcaseBusiness className='h-4 w-8  text-green-700 pr-4'/>
              Adminstrator
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
             <Earth className='h-4 w-8  text-green-700 pr-4'/>
              Your Location - {admin.address}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <Mail className='h-4 w-8  text-green-700 pr-4'/>
              {admin.email}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <Phone className='h-4 w-8  text-green-700 pr-4'/>
              {admin.phoneNumber}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <History className='h-4 w-8  text-green-700 pr-4'/>
              {admin.dateOfBirth}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <CalendarPlus className='h-4 w-8  text-green-700 pr-4'/>
              Member since: {ConvertIsoDateToNormal(admin.createdAt)}
            </p>         
            <div className="pt-12 pb-8">
              <Link href={`/dashboard/profile/update/${id}`} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
				        Edit Profile
				      </Link>
            </div>
          </div>
        </div>

        {/* <!--Img Col--> */}
        <div className="w-full lg:w-2/5">
          {/* <!-- Big profile image for side bar (desktop) --> */}
          <Image width={200} height={200} src={admin.image ? admin.image : "/Avatar.png"} alt='avatar' className='bg-white rounded-none lg:rounded-lg shadow-2xl hidden lg:block w-96'/>
        </div>

    </div>

  )
}
