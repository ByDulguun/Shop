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
      path: "/dashboards/dashboardPanel",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: `/dashboards/dashboardOrder`,
      icon: <PiNotepad width={24} height={24} />,
    },
    {
      name: "Орлого",
      path: "/dashboards/dashboardIncome",
      icon: <MdDiscount width={24} height={24} />,
    },
    {
      name: "Бүтээгдэхүүн",
      path: "/dashboards/dashboardProduct",
      icon: <FaRegListAlt width={24} height={24} />,
    },
    {
      name: "Тохиргоо",
      path: "/dashboards/dashboardSettings",
      icon: <IoMdSettings width={24} height={24} />,
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="container flex ">
        <div className="grid gap-4 py-6">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-1 text-[16px] font-semibold "
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
        <div className="flex-1">
          <div className="flex my-6 mx-4 gap-2">
            <p>Бүтээгдэхүүн</p>
            <p>Ангилал</p>
          </div>
          <button className="bg-black px-6 flex gap-2 items-center rounded-lg mx-4">
            <p className="text-white text-[24px]">+</p>
            <p className="text-white">Бүтээгдэхүүн нэмэх</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;