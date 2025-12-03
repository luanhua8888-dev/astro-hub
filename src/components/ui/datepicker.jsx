'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export function DatePicker({ value, onChange, placeholder = 'Chọn ngày' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const inputRef = useRef(null);

    const selectedDate = value ? new Date(value) : null;

    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setInputValue(formatDisplayDate(value));
            setCurrentMonth(date);
        }
    }, [value]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i)
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        return days;
    };

    const handleDateSelect = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        onChange(formattedDate);
        setInputValue(formatDisplayDate(formattedDate));
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);

        // Try to parse the input (dd/mm/yyyy or dd-mm-yyyy)
        const dateRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
        const match = val.match(dateRegex);

        if (match) {
            const [, day, month, year] = match;
            const date = new Date(year, month - 1, day);

            // Validate date
            if (date.getDate() == day && date.getMonth() == month - 1 && date.getFullYear() == year) {
                const formattedDate = date.toISOString().split('T')[0];
                onChange(formattedDate);
                setCurrentMonth(date);
            }
        }
    };

    const handleInputBlur = () => {
        // If input is invalid, reset to current value
        if (value) {
            setInputValue(formatDisplayDate(value));
        } else {
            setInputValue('');
        }
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handlePrevYear = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth()));
    };

    const handleNextYear = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth()));
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
        setShowMonthPicker(false);
    };

    const handleYearSelect = (year) => {
        setCurrentMonth(new Date(year, currentMonth.getMonth()));
        setShowYearPicker(false);
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        handleDateSelect(today);
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelected = (date) => {
        if (!selectedDate) return false;
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    const days = getDaysInMonth(currentMonth);
    const currentYear = currentMonth.getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

    return (
        <div className="relative">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "bg-slate-900/50 border-slate-700 text-white"
                    )}
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <Calendar className="h-4 w-4" />
                </button>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => {
                            setIsOpen(false);
                            setShowMonthPicker(false);
                            setShowYearPicker(false);
                        }}
                    />
                    <div className="absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border bg-popover p-4 shadow-lg">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={handlePrevYear}
                                    className="p-1 hover:bg-accent rounded-md transition-colors"
                                    title="Năm trước"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    className="p-1 hover:bg-accent rounded-md transition-colors"
                                    title="Tháng trước"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMonthPicker(!showMonthPicker);
                                        setShowYearPicker(false);
                                    }}
                                    className="font-semibold hover:bg-accent px-2 py-1 rounded-md transition-colors"
                                >
                                    {months[currentMonth.getMonth()]}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowYearPicker(!showYearPicker);
                                        setShowMonthPicker(false);
                                    }}
                                    className="font-semibold hover:bg-accent px-2 py-1 rounded-md transition-colors"
                                >
                                    {currentMonth.getFullYear()}
                                </button>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    className="p-1 hover:bg-accent rounded-md transition-colors"
                                    title="Tháng sau"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextYear}
                                    className="p-1 hover:bg-accent rounded-md transition-colors"
                                    title="Năm sau"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Month Picker */}
                        {showMonthPicker && (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {months.map((month, index) => (
                                    <button
                                        key={month}
                                        type="button"
                                        onClick={() => handleMonthSelect(index)}
                                        className={cn(
                                            "p-2 text-sm rounded-md hover:bg-accent transition-colors",
                                            currentMonth.getMonth() === index && "bg-primary text-primary-foreground hover:bg-primary/90"
                                        )}
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Year Picker */}
                        {showYearPicker && (
                            <div className="h-64 overflow-y-auto mb-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            type="button"
                                            onClick={() => handleYearSelect(year)}
                                            className={cn(
                                                "p-2 text-sm rounded-md hover:bg-accent transition-colors",
                                                currentMonth.getFullYear() === year && "bg-primary text-primary-foreground hover:bg-primary/90"
                                            )}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Calendar - only show if not picking month/year */}
                        {!showMonthPicker && !showYearPicker && (
                            <>
                                {/* Days of week */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {daysOfWeek.map((day) => (
                                        <div
                                            key={day}
                                            className="text-center text-xs font-medium text-muted-foreground py-2"
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar days */}
                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((dayObj, index) => {
                                        const isTodayDate = isToday(dayObj.date);
                                        const isSelectedDate = isSelected(dayObj.date);

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleDateSelect(dayObj.date)}
                                                className={cn(
                                                    "h-9 w-9 rounded-md text-sm transition-colors",
                                                    "hover:bg-accent hover:text-accent-foreground",
                                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                                    !dayObj.isCurrentMonth && "text-muted-foreground opacity-50",
                                                    isTodayDate && "border border-primary",
                                                    isSelectedDate && "bg-primary text-primary-foreground hover:bg-primary/90"
                                                )}
                                            >
                                                {dayObj.day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    onChange('');
                                    setInputValue('');
                                    setIsOpen(false);
                                }}
                            >
                                Xóa
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleToday}
                            >
                                Hôm nay
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
