"use client";
import Image from "next/image";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: string[];
}

const Aside = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await api.get("/getProducts");
      setProducts(response.data as ProductType[]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container py-14">
        <div>
          {/* Main featured product */}
          <div className="relative h-[600px]">
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
              <>
                <Image
                  src={products[0]?.images[0]}
                  alt={products[0]?.productName}
                  priority
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute bottom-8 left-8">
                  <p className="text-lg">{products[0]?.productName}</p>
                  <p className="font-bold text-4xl leading-10">
                    {products[0]?.price}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Grid of product cards */}
          <div className="grid grid-cols-4 grid-flow-row gap-5 my-8 [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={500}
                    className="rounded-2xl"
                  />
                ))
              : products.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    _id={product._id}
                    productName={product.productName}
                    price={product.price}
                    qty={product.qty}
                    images={product.images}
                    index={index}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
