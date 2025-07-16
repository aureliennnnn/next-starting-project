import { type NextRequest, NextResponse } from "next/server"

// Mock data (in a real app, this would be in a database)
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const itemIndex = items.findIndex((item) => item.id === params.id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(items[itemIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemIndex = items.findIndex((item) => item.id === params.id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    items.splice(itemIndex, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
