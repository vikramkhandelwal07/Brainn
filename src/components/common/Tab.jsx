export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="flex p-1 gap-1 my-6 rounded-full max-w-max bg-black-900 shadow-inner border border-white/30"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${field === tab.type
              ? "bg-white text-gray-900"
              : "bg-transparent text-gray-300 hover:bg-white/50 hover:text-black"
            } py-2 px-5 rounded-full transition-all duration-200 font-medium`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
