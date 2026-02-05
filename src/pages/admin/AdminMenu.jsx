import React from 'react';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline, IoLibraryOutline, IoCameraOutline } from "react-icons/io5";

const AdminMenu = () => {
  return (
    <div className="bg-ode-navy min-h-screen pt-40 px-6 text-center text-white">
      <h1 className="text-4xl font-serif font-bold mb-16 tracking-tight">Admin Dashboard</h1>
      
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
        
        {/* 1. Add New */}
        <Link to="/admin/work/add" className="flex-1 bg-white/5 hover:bg-white/10 p-10 rounded-xl transition border border-white/5 group">
          <IoAddCircleOutline className="text-5xl text-green-400 mb-4 mx-auto group-hover:scale-110 transition-transform"/>
          <h2 className="text-2xl font-mono text-green-400 mb-2">Add Portfolio</h2>
          <p className="opacity-50 text-sm">Create a new project</p>
        </Link>

        {/* 2. Manager */}
        <Link to="/admin/work/manage" className="flex-1 bg-white/5 hover:bg-white/10 p-10 rounded-xl transition border border-white/5 group">
          <IoLibraryOutline className="text-5xl text-yellow-400 mb-4 mx-auto group-hover:scale-110 transition-transform"/>
          <h2 className="text-2xl font-mono text-yellow-400 mb-2">Portfolio Manager</h2>
          <p className="opacity-50 text-sm">Edit or Delete existing projects</p>
        </Link>

        {/* 3. Equipment */}
        <Link to="/admin/equipment" className="flex-1 bg-white/5 hover:bg-white/10 p-10 rounded-xl transition border border-white/5 group">
          <IoCameraOutline className="text-5xl text-blue-400 mb-4 mx-auto group-hover:scale-110 transition-transform"/>
          <h2 className="text-2xl font-mono text-blue-400 mb-2">Equipment</h2>
          <p className="opacity-50 text-sm">Manage gear list</p>
        </Link>

      </div>
    </div>
  );
};
export default AdminMenu;