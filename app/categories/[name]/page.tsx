


import type { Metadata } from "next";
import FilterCategories from "@/components/FilterCategories/FilterCategories";
import Nav from "@/components/NavBar/Nav";
type Props = {
params:{

    name: string;
} 

};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  return {
    title: decodeURIComponent(name),
    description: `تصفح مجموعة ${decodeURIComponent(name)} في فريدو واستمتع بالمنتجات الطازجة والجودة العالية.`,
    keywords: [decodeURIComponent(name), "فريدو", "سوبر ماركت", "منتجات"],
  };
}

export default async function CategoriesPage({params}: Props) {
 const {name} = await params;
    return (
        <>
      <Nav/>
      <FilterCategories name = {name} />
</>
  )
   
}
