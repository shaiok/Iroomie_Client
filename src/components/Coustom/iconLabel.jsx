export default function IconLabel({ icon: Icon, label, value }) {
  return <div className="flex items-center gap-2 text-gray-600">
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-xs sm:text-sm">{label}: </span>
    <span className="font-semibold text-gray-900 text-xs sm:text-sm">
      {value}
    </span>
  </div>;
}
