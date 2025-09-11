/* eslint-disable */
import { categoryMeta } from "@/data/categoryMeta";
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

export const useCategoriesSpecifique = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({
    per_page: 100,
    include: [33, 86, 15, 9, 4, 32],
  });
  if (isLoading) return { categories: [], isLoading: true };

  const categories =
    data?.map((category: any) => {
      const meta = categoryMeta[category.name.toLowerCase()] || {
        color: "#6B7280", // gris par défaut
        icon: "Folder",
        description: "",
      };

      return {
        id: category.id, // on peut utiliser le label comme identifiant unique
        name: category.name.toLowerCase(),
        slug: category.name.toLowerCase(),
        count: category.count,
        ...meta,
      };
    }) || [];

  return { categories, isLoading };
};
