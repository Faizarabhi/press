import React from 'react'

export default function Select({ label, id, options, onChange, value }) {
  return (
    <form className="max-w-sm mx-auto">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled || false}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  )
}
