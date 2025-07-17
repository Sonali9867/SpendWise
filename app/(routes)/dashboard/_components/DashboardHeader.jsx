import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'

function DashboardHeader() {
  const [searchBy, setSearchBy] = useState('Name')
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => setShowDropdown(prev => !prev)
  const handleOptionSelect = (option) => {
    setSearchBy(option)
    setShowDropdown(false)
  }

  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center flex-wrap gap-3">
      {/* Search Bar */}
      <form className="max-w-lg w-full md:w-[500px]">
        <div className="flex relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
          >
            {'Search By'}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Options */}
          {showDropdown && (
            <div className="absolute top-12 left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                {['Name', 'Amount', 'Date'].map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-e-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Search by ${searchBy.toLowerCase()}...`}
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* User Profile */}
      <div>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardHeader
