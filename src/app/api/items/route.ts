import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const items = [
  {
    id: "1",
    title: "Sample Item 1",
    description: "This is a sample item for demonstration",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sample Item 2",
    description: "Another sample item",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    }

    items.unshift(newItem)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 })
  }
}
