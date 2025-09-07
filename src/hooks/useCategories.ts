/* eslint-disable */
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";

export const useCategoriesOptions = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({
    per_page: 100,
  });
  if (isLoading) return { options: [], isLoading: true };

  const options =
    data?.map((category: any) => ({
      value: category.id,
      label: category.slug,
    })) || [];

  return { options, isLoading };
};
