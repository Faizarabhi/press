export default function Navbarr() {
  return (
    <div className="flex justify-between items-center bg-white h-20 px-6 shadow-md sticky top-0 z-10 ml-64">
      <input
        type="text"
        placeholder="Search task"
        className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
      />
      <div className="flex items-center gap-4">
        <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
          + Add Project
        </button>
        <img
          src="https://ui-avatars.com/api/?name=Totok+Michael"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
