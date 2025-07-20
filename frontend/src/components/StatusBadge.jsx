import React from 'react'

const STATUS_STYLES = {
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.draft

  return (
    <span className={`px-2 mx-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  )
}
