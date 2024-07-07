import React, { ReactNode } from 'react';


export default function SmallCardDataStats ({
  title,
  total,
  icon
}) {
  return (
    <div className="px-4 text-2xl rounded-xl bg-white dark:bg-slate-900 py-6 px-7.5 shadow-default">
      <div className="flex h-11.5 w-11.5 items-center rounded-full  ">
        {icon}
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <h4 className="text-title-md font-bold text-black dark:text-white">
          {total}
        </h4>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};


