import { Clock, Mail, Phone, Plane } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Location</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Store
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis
            in, accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: globe-alt --> */}
                  <Plane className='h-6 w-6'/>

                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                    Address
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                    123 Main St, Suite 100<br/>
                    Anytown, USA 12345
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* <!-- Heroicon name: phone --> */}
                  <Phone className='h-6 w-6'/>

                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Phone number
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  (555) 555-5555
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: mail --> */}
                  <Mail className='w-6 h-6'/>

                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Email
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  info@ourstore.com
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: clock --> */}
                  <Clock w-6 h-6/>

                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                    Store Hours
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Monday - Friday: 9am to 8pm<br/>
                  Saturday: 10am to 6pm<br/>
                  Sunday: 12pm to 4pm
                </dd>
              </div>
            </div>
          </dl>
          </div>
      </div>
    </div>
  )
}
