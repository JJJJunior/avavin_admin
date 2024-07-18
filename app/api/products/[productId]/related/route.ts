import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });
    const relations = await prisma.product.findMany({
      where: {
        OR: [
          {
            category: product?.category,
          },
        ],
      },
    });

    // 推荐相关的category下的产品
    return NextResponse.json(relations, { status: 200 });
  } catch (err) {
    console.error("[related_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
