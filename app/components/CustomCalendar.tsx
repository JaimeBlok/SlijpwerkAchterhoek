'use client'

import { useState } from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns'
import { isDateAvailable } from '../availability'

interface CustomCalendarProps {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
  minDate?: Date
}

const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']

export default function CustomCalendar({ selectedDate, onChange, minDate }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  
  const handleDateClick = (day: Date) => {
    // Check if date is available and not in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const clickedDay = new Date(day)
    clickedDay.setHours(0, 0, 0, 0)
    
    if (clickedDay < today) return
    if (!isDateAvailable(day)) return
    
    // Set noon as default time
    const newDate = new Date(day)
    newDate.setHours(12, 0, 0, 0)
    onChange(newDate)
  }
  
  const isDisabled = (day: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const clickedDay = new Date(day)
    clickedDay.setHours(0, 0, 0, 0)
    
    return clickedDay < today || !isDateAvailable(day)
  }
  
  const isSelected = (day: Date): boolean => {
    if (!selectedDate) return false
    return isSameDay(day, selectedDate)
  }
  
  const getCurrentYear = () => currentMonth.getFullYear()
  const getCurrentMonth = () => currentMonth.getMonth()
  
  return (
    <div className="w-full flex flex-col bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-4 space-y-0.5">
        {/* Month Navigation */}
        <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
          {/* Prev Button */}
          <div className="col-span-1">
            <button 
              type="button" 
              onClick={prevMonth}
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100" 
              aria-label="Vorige"
            >
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
          
          {/* Month / Year Display */}
          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <span className="font-medium text-gray-800">
              {months[getCurrentMonth()]}
            </span>
            <span className="text-gray-800">/</span>
            <span className="font-medium text-gray-800">
              {getCurrentYear()}
            </span>
          </div>
          
          {/* Next Button */}
          <div className="col-span-1 flex justify-end">
            <button 
              type="button" 
              onClick={nextMonth}
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100" 
              aria-label="Volgende"
            >
              <svg className="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Week Days */}
        <div className="grid grid-cols-7 gap-0 pb-1.5">
          {weekDays.map((day) => (
            <div key={day} className="w-10 text-center text-sm text-gray-500 mx-auto">
              {day}
            </div>
          ))}
        </div>
        
        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((day, dayIdx) => {
            const disabled = isDisabled(day)
            const selected = isSelected(day)
            const isCurrentMonth = isSameMonth(day, monthStart)
            const today = isToday(day)
            
            return (
              <div key={dayIdx} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={disabled}
                  className={`
                    size-10 flex justify-center items-center border-[1.5px] text-sm rounded-full
                    ${selected 
                      ? 'bg-[#17320B] text-white border-[#17320B] font-medium' 
                      : today && !selected
                      ? 'bg-green-100 text-[#17320B] border-green-300 font-medium'
                      : 'text-gray-800 hover:border-[#17320B] hover:text-[#17320B] disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-[#17320B] focus:text-[#17320B] border-transparent'
                    }
                    ${!isCurrentMonth ? 'opacity-30' : ''}
                  `}
                >
                  {format(day, 'd')}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

