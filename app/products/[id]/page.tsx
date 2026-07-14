import type { Metadata } from "next";
import Nav from "@/components/NavBar/Nav";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import { products } from "@/data/products";

type Props = {
params:{

    id: string;
} 

};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return {
      title: "المنتج غير موجود",
      description: "المنتج المطلوب غير متوفر الآن.",
    };
  }

  return {
    title: product.title,
    description: product.description,
    keywords: [product.title, product.category, "فريدو", "سوبر ماركت"],
    openGraph: {
      title: product.title,
      description: product.description,
      type: "article",
      images: [product.image],
    },
  };
}

export default async function Home({ params}: Props) {
    
    const {id} = await params;
  
    
    return (
        <div>
            <Nav/>
            <SingleProduct id={id}/>
        </div>
    )
}