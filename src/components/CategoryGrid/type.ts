export interface ICategoryItem {
  id: string;
  name: string;
  icon: string;
}

export interface ICategoryGridProps {
  categories: ICategoryItem[];
}
