"use client";

import Image from "next/image";


export default function AdminPanel() {


  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 grid grid-rows-[auto_1fr_auto] p-8 gap-16">
        <header className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </header>

        <main className="flex flex-col gap-8 items-center w-full">
          <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

          <div className="w-full bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800">Parsed Data</h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  {["ID", "Title", "Date", "Actions"].map((col) => (
                    <th key={col} className="border border-gray-300 p-2 bg-gray-200">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">Sample Title</td>
                  <td className="border border-gray-300 p-2">2023-10-01</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-4">
            <button className="rounded-full bg-blue-600 text-white h-10 px-4 hover:bg-blue-700 transition">
              Refresh Data
            </button>
            <button className="rounded-full border border-gray-300 bg-white text-gray-800 h-10 px-4 hover:bg-gray-200 transition">
              Export Data
            </button>
          </div>
        </main>

        <footer className="flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 text-gray-600 hover:underline"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
