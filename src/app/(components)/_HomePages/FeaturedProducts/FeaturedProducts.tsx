import ProductGrid from "@/app/_sharedComponents/ProductGrid/ProductGrid";
import SectionTitle from "@/app/_sharedComponents/SectionTitle/sectionTitle";
import { getProducts } from "@/services/product.service";

export default async function FeaturedProducts() {
  const products = await getProducts();
  if (!products?.data?.length) return null;

  return (
    <section className="container-fc py-14">
      <SectionTitle subTitle="Featured" title="Products" />
      <ProductGrid products={products.data} />
    </section>
  );
}
