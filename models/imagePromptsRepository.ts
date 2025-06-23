import ImagePrompt from "@/models/ImagePrompt";
import dbConnect from "../lib/mongoose";

export const getPromptDataPaginated = async ({ page, limit = 40 }: { page: number; limit?: number }) => {
  const skip = (page - 1) * limit;

  await dbConnect();
  const total = await ImagePrompt.countDocuments();
  const dbResponse: any = await ImagePrompt.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  const data: any = dbResponse?.map((e: any) => ({ ...e, _id: e?._id + "" }));

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + data.length < total,
    },
  };
};
