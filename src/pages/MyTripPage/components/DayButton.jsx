const DayButton = ({dayNumber}) => {
  return (
    <button className="rounded-30 text-gray-1 bg-sub-accent-1 w-50 h-24 text-14">
      day{dayNumber}
    </button>
  )
}

export default DayButton;