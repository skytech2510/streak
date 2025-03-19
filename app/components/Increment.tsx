import Image from 'next/image';
import React from 'react';
interface IncrementPropsType {
    status: "INCOMPLETE" | "COMPLETED" | "SAVED" | "AT_RISK",
    date: Date,
    activities: number
}

export const Increment: React.FC<IncrementPropsType> = ({
    status,
    date,
    activities
}) => {
    return (
        <div className=' flex flex-col gap-2'>
            <Image width={24} height={24} alt='' src={"/assets/Day.png"}></Image>
        </div>
    )
}