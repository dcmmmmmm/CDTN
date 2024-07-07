import NewCommunityPostForm from "../../../../../components/dashboard/Form/NewCommunityPostForm";
import { getData } from "../../../../../lib/getData";
import React from "react";

export default async function NewCommunityPostPage() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return <NewCommunityPostForm categories={categories} />;
}
