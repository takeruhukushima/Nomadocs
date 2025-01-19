import { getContentTree } from "@/lib/get-content-tree";
import { NextResponse } from "next/server";

export async function GET() {
  const tree = await getContentTree();
  return NextResponse.json(tree);
}
