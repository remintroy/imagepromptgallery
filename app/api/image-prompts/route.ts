import { NextRequest, NextResponse } from "next/server";
import { getPromptDataPaginated } from "@/models/imagePromptsRepository";

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
