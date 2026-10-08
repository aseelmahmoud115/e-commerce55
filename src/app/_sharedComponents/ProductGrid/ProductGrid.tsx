import ProductCard from "@/app/_sharedComponents/ProductCard/ProductCard";
import { IProducts } from "@/interface/product.interface";

export default function ProductGrid({
  products,
  columns = "default",
}: {
  products: IProducts[];
  columns?: "default" | "narrow";
}) {
  const cols =
    columns === "narrow"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  return (
    <div className={`grid gap-4 sm:gap-5 ${cols}`}>
      {products.map((product, i) => (
        <ProductCard key={product._id} product={product} priority={i < 5} />
      ))}
    </div>
  );
}
