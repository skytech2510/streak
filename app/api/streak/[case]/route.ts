import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { case: string } }
) {
    const currentCase = params.case;

    return NextResponse.json({
        case: currentCase
    }, { status: 200 });
}  