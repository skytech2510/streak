import { Increment } from "./Increment";

type Status = "INCOMPLETE" | "COMPLETED" | "SAVED" | "AT_RISK";

export interface DayEntry {
    date: Date;
    activities: number;
    state: Status;
}
interface TrackerPropsType {
    days: DayEntry[] | null
}
export const Tracker: React.FC<TrackerPropsType> = ({ days }) => {
    return <div className=" flex flex-row gap-0">
        {days && days.map((day, index) => (
            <Increment key={index} status={day.state} date={new Date(day.date)} activities={day.activities}></Increment>
        ))}
    </div>
}