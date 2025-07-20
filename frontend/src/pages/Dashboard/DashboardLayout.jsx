import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import Filter from "../../components/Filter";


export default function Dashboard() {

  const { user } = useSelector((state) => state.auth)

  const [filters, setFilters] = useState({ categories: [], status: [] })

  return (
    <div className="flex">
      <Sidebar />
      <Navbar user={user} />

      <div className="bg-gray-50 w-4/5 absolute right-0 top-16 overflow-x-hidden px-12 ">
        <main className="p-6 ">
         {/*  <h1 className="text-2xl font-bold mb-4 ">Dashboard</h1> */}
          <div className="grid grid-cols-3 gap-4  w-screen">
         {/*    <div className="bg-white p-6 rounded-xl shadow"> */}
              <Filter onChange={setFilters} /></div>

        {/*   </div> */}
          <div className="mt-6 min-h-screen">
            <Outlet  context={{ filters }}  />
          </div>
        </main>
      </div>
    </div>
  )
}
