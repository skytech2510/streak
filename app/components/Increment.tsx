import Image from 'next/image';
import React from 'react';
import { getDayInfo } from '../utiles';
import AT_RISK from "@/public/assets/at_risk.svg"
import INCOMPLETED from "@/public/assets/incompleted.svg"
import INCOMPLETED_TODAY from "@/public/assets/incompleted_today.svg"
import SAVED from "@/public/assets/saved.svg"
import COMPLETED from "@/public/assets/completed.svg" // If different, replace with actual completed icon  

type Status = "INCOMPLETE" | "COMPLETED" | "SAVED" | "AT_RISK";

const STATUS_IMAGES: Record<Status, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "AT_RISK": AT_RISK,
    "INCOMPLETE": INCOMPLETED,
    "SAVED": SAVED,
    "COMPLETED": COMPLETED
};

interface IncrementPropsType {
    status: Status,
    date: Date,
    activities: number
}

export const Increment: React.FC<IncrementPropsType> = ({
    status,
    date,
    activities
}) => {
    console.log(activities);
    return (
        <div className='flex flex-col gap-2 items-center px-[14.29px] pb-2 pt-1 shadow-[0_1.5px_0px_0px_#E6E6E6]'>
            <Image
                width={24}
                height={24}
                alt={`${status} status`}
                src={STATUS_IMAGES[status]}
            />
            <div className='text-[#A2A2A2] text-[12px]'>
                {getDayInfo(date).shortName.toUpperCase()}
            </div>
        </div>
    )
}  
