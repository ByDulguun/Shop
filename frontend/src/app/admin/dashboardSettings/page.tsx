"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";

const Dashboard = () => {
  const pathname: string = usePathname();
  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/admin",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: "/admin/dashboardOrder",
      icon: <PiNotepad width={24} height={24} />,
    },
    {
      name: "Орлого",
      path: "/admin/dashboardIncome",
      icon: <MdDiscount width={24} height={24} />,
    },
    {
      name: "Бүтээгдэхүүн",
      path: "/admin/dashboardProduct",
      icon: <FaRegListAlt width={24} height={24} />,
    },
    {
      name: "Тохиргоо",
      path: "/admin/dashboardSettings",
      icon: <IoMdSettings width={24} height={24} />,
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="container flex items-start">
        <div className="grid gap-4 py-6">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-2 text-[16px] font-semibold "
                  style={{
                    backgroundColor: pathname === path.path ? "#ECEDF0" : "",
                  }}
                >
                  {path.icon}
                  {path.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex-1 bg-gray-100 w-screen flex justify-center px-48 py-12 h-screen items-start">
          <div className="bg-white border rounded-lg px-[30px] py-8 w-full h-fit grid gap-5">
            <p className="text-[18px] font-semibold">Тохиргоо </p>
            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Баннер зураг </p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                солих
              </button>
            </div>

            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Эхний бүтээгдэхүүнээ нэмнэ үүх</p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                Бүтээгдэхүүн нэмэх
              </button>
            </div>
            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Хүргэлтийг тохируулна уу</p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                Хүргэлт тохируулах
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;