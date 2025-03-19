"use client"
import { useParams } from "next/navigation";
import React from "react";
export default function Page() {
    const a = useParams();
    console.log(a)
    return <main className="w-full">
        <div className=" flex flex-col">
            <div className=" m-auto flex flex-col mt-[310px]">
                <div className=" text-[#212121] text-[56px]">
                    Your streak is 6 days
                </div>
                <div className="w-fit m-auto">
                    <div className=" border-[2px] border-[#E6E6E6] p-6 rounded-[12px]">

                    </div>
                </div>
            </div>
        </div>
    </main>
}