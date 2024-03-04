import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const MonthSelector = ({ currentYear, currentMonth, handleChageYm }) => {
  const goToPreviousMonth = () => {
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const previousYM = previousYear * 100 + previousMonth;
    handleChageYm(previousYM);
  };

  const goToNextMonth = () => {
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const nextYM = nextYear * 100 + nextMonth;
    handleChageYm(nextYM);
  };

  return (
    <div className="flex justify-between items-center">
        <ChevronLeftIcon className="h-6 w-6 cursor-pointer" onClick={goToPreviousMonth} />
        <h2 className="text-xl font-semibold">{`${currentYear}年${currentMonth}月`}</h2>
        <ChevronRightIcon className="h-6 w-6 cursor-pointer" onClick={goToNextMonth} />
    </div>
  );
};

export default MonthSelector;
