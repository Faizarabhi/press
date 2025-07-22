import {  ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export function MessageRejected({ title }) {
  return (
    <div
      role="alert"
      className="flex p-4 mb-4 text-sm text-red-800 rounded-lg m-4 bg-red-50 "
    >
      <ExclamationTriangleIcon
        className="shrink-0 inline w-5 h-5 mr-3 mt-[2px]"
        aria-hidden="true"
      />
      <span className="sr-only">Danger</span>
      <div>
        <span className="font-medium">{title}</span>
       
      </div>
    </div>
  )
}
