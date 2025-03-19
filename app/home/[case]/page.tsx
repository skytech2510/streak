"use client"
import { useParams } from "next/navigation";
import { DayEntry, Tracker } from "@/app/components/Tracker"
import React, { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const [days, setDays] = useState<DayEntry[] | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${window.origin}/api/streak/${params.case}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const { days, total } = await res.json();
            setDays(days);
            setTotal(total);
            setIsLoading(false);
        }
        fetchData();
    }, [])
    if (isLoading) return <>
        Loading...
    </>
    return <main className="w-full">
        <div className=" flex flex-col">
            <div className=" m-auto flex flex-col mt-[310px]">
                <div className=" text-[#212121] text-[56px]">
                    Your streak is {total} days
                </div>
                <div className="w-fit m-auto">
                    <div className=" border-[2px] border-[#E6E6E6] p-6 rounded-[12px]">
                        <Tracker days={days} />
                    </div>
                </div>
            </div>
        </div>
    </main>
}