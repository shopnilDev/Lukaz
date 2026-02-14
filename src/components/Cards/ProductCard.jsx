import { getImageUrl } from "@/utils/helpers";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ item }) {
  return (
    <Link
      href={`/product/${item?.slug}`}
      className="mx-auto cursor-pointer block"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden bg-gray-100">
        <Image
          src={getImageUrl("products", item?.color_thumbnails)}
          alt={item?.product_name || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={false}
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item?.product_name}
        </h3>
        <p className="text-sm text-gray-600">৳ {item?.current_price}</p>
      </div>
    </Link>
  );
}
