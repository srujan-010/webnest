import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { secret, tags, paths } = await req.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret." }, { status: 401 });
    }

    if (tags?.length) {
      tags.forEach((tag: string) => revalidateTag(tag, { expire: 0 }));
    }

    if (paths?.length) {
      paths.forEach((path: string) => revalidatePath(path));
    }

    // Always revalidate the main pages
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/portfolio");
    revalidatePath("/process");
    revalidatePath("/technologies");
    revalidatePath("/blog");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, revalidated: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
