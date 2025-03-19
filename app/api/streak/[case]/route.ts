import { DayEntry } from '@/app/components/Tracker';
import { NextRequest, NextResponse } from 'next/server'
function subtractDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}
function getDaysFromOldestToWeek(
    days: DayEntry[],
    referenceDate: Date = new Date(2025, 2, 19)
): DayEntry[] {
    const sortedDays = [...days].sort((a, b) =>
        a.date.getTime() - b.date.getTime()
    );
    const oldestDay = sortedDays[0]?.date;
    const newestDay = sortedDays[sortedDays.length - 1]?.date;

    if (!oldestDay || !newestDay) return [];
    const endOfWeek = new Date(referenceDate);
    endOfWeek.setDate(referenceDate.getDate() + (6 - referenceDate.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    const allDates: DayEntry[] = [];
    const currentDate = new Date(oldestDay);

    while (currentDate <= endOfWeek) {
        const matchingDay = sortedDays.find(day =>
            day.date.toDateString() === currentDate.toDateString()
        );
        allDates.push(matchingDay || {
            date: new Date(currentDate),
            activities: 0,
            state: 'INCOMPLETE'
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return allDates;
}
function getDaysOfCurrentWeek(allDates: DayEntry[]): DayEntry[] {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    const weekDays: DayEntry[] = [];

    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
        const existingDay = allDates.find(entry =>
            entry.date.toDateString() === d.toDateString()
        );
        weekDays.push(existingDay || {
            date: new Date(d),
            activities: 1,
            state: 'COMPLETED'
        });
    }

    return weekDays.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function GET(
    req: NextRequest,
    { params }: { params: { case: string } }
) {
    const defaultDays: DayEntry[] = [
        { date: subtractDays(3), activities: 1, state: 'COMPLETED' },
        { date: new Date(), activities: 3, state: 'INCOMPLETE' },
    ];

    // Use the default days array for all cases or customize as needed  
    const days: DayEntry[] = (() => {
        switch (params.case) {
            case '1':
                return defaultDays;
            case '2':
                return [
                    { date: subtractDays(4), activities: 1, state: 'COMPLETED' },
                    { date: subtractDays(3), activities: 1, state: 'INCOMPLETE' },
                    { date: new Date(), activities: 1, state: 'INCOMPLETE' },
                ];
            case '3':
                return [
                    { date: subtractDays(4), activities: 1, state: 'COMPLETED' },
                    { date: subtractDays(1), activities: 3, state: 'INCOMPLETE' },
                ];
            default:
                return defaultDays;
        }
    })();


    const temp = getDaysFromOldestToWeek(days, new Date());
    let deposite = 0;
    temp.forEach((d, index) => {
        if (index === 0) d.state = 'COMPLETED';
        else {
            if (d.activities === 0 && temp[index - 1].state === 'INCOMPLETE') {
                deposite = deposite + 1;
            }
            else if (d.activities > 0 && temp[index - 1].state === 'INCOMPLETE') {
                let currentIndex = index;
                let availableActivities = d.activities - 1;
                while (1) {
                    if (temp[currentIndex - 1].state == 'COMPLETED') {
                        deposite = 0;
                        d.state = 'COMPLETED';
                        break;
                    }
                    if (availableActivities <= 0) {
                        d.state = 'INCOMPLETE';
                        while (temp[currentIndex - 1].state === 'INCOMPLETE') {
                            temp[currentIndex - 1].state = 'AT_RISK';
                            currentIndex--;
                        }
                        break;
                    }
                    temp[currentIndex - 1].state = 'SAVED';
                    deposite--;
                    currentIndex--;
                    availableActivities--;
                }
            }
            else if (d.activities === 0 && temp[index - 1].state === 'COMPLETED') {
                d.state = 'INCOMPLETE';
                deposite += 1;
            }
            else if (d.activities > 0 && temp[index - 1].state === 'COMPLETED') {
                deposite = 0;
                d.state = 'COMPLETED';
            }
        }
    })
    const result = getDaysOfCurrentWeek(temp);
    let total = 7;
    if (result.filter((day) => day.state === 'INCOMPLETE')) {
        total = total - result.filter((day) => day.state === 'INCOMPLETE').length;
    }
    const activitiesToday = result.filter(day => {
        const today = new Date().toISOString().slice(0, 10);
        const dayDate = day.date.toISOString().slice(0, 10);
        return today === dayDate;
    })[0].date;
    return NextResponse.json({
        days: result,
        activitiesToday: activitiesToday,
        total: total
    }, { status: 200 });
}  