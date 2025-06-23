import { NextRequest, NextResponse } from "next/server";
import { getPromptDataPaginated } from "@/models/imagePromptsRepository";
import dbConnect from "@/lib/mongoose";
import ImagePrompt from "@/models/ImagePrompt";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "40", 10);
    return NextResponse.json(await getPromptDataPaginated({ page, limit }));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch image prompts." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { imageUrl, prompt, alt } = await req.json();
  const created = await ImagePrompt.create({ imageUrl, prompt, alt });
  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { imageUrl, prompt, alt } = await req.json();
  const updated = await ImagePrompt.findByIdAndUpdate(id, { imageUrl, prompt, alt }, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await ImagePrompt.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
