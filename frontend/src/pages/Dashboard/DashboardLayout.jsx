import { Outlet, useLocation } from "react-router-dom"; 
import Sidebar from "../../components/SideBar";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts, fetchMyPosts } from "../../store/posts/postsSlice";
import Filter from "../../components/Filter";

export default function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation(); 

  const [filters, setFilters] = useState({
    categorie_id: [],
    status: [],
    author_id: [],
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (!user) return;
    if (user.role === "editor") {
      dispatch(fetchAllPosts(filters));
    } else {
      dispatch(fetchMyPosts(filters));
    }
  }, [filters, dispatch, user]);


  return (
    <div className="flex">
      <Sidebar />
      <Navbar user={user} />

      <div className="bg-gray-50 w-4/5 absolute right-0 top-16 overflow-x-hidden px-12">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
        
          {location.pathname === "/dashboard/posts" && (
            <div className="grid grid-cols-3 gap-4 w-screen">
              <Filter onChange={setFilters} />
            </div>
          )}

          <div className="mt-6 min-h-screen">
            <Outlet context={{ filters }} />
          </div>
        </main>
      </div>
    </div>
  );
}
