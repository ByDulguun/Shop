"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Heart from "../assets/icon/Heart";
import { Skeleton } from "@mui/material";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: [string];
  productType: string;
  size: string[];
}

interface Category {
  _id: string;
  type: string;
}

const Product = () => {
  const router = useRouter();

  type Size = "Free" | "S" | "M" | "L" | "2XL" | "3XL" | "4XL";

  const sizes: Size[] = ["Free", "S", "M", "L", "2XL", "3XL", "4XL"];

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSizeChange = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/getCategories");
        setCategories(response.data as Category[]);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "An error occurred.");
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    };
    getCategories();
  }, []);

  const getProducts = async () => {
    setLoading(true);
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (category) => category.type === product.productType
      );
    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((selectedSize) => product.size.includes(selectedSize));

    return matchesCategory && matchesSize;
  });

  return (
    <div className="flex justify-center">
      <div className="container flex my-12 h-fit">
        <div className="grid h-fit gap-12 w-[475px]">
          <div>
            <p className="text-[16px] font-bold my-4">Ангилал</p>
            <div className="grid gap-1">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="text"
                      height={30}
                      width="70%"
                    />
                  ))
                : categories.map((category, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer hover:font-bold"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      {category.type}
                    </label>
                  ))}
            </div>
          </div>
          {/* Sizes */}
          <div>
            <p className="text-[16px] font-bold my-4">Хэмжээ</p>
            <div className="grid gap-1">
              {sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center cursor-pointer hover:font-bold"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 grid-flow-row gap-5 gap-y-10">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="relative">
                  <Skeleton
                    variant="rectangular"
                    height={450}
                    className="rounded-md"
                  />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              ))
            : filteredProducts.map((product, index) => (
                <div key={index} className="relative">
                  <div onClick={() => router.push(`/product/${product._id}`)}>
                    <div className="grid gap-4">
                      <div className="overflow-hidden rounded-2xl">
                        <div
                          className={`relative cursor-pointer group h-[450px]`}
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.productName}
                            priority
                            fill
                            className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-[16px]">{product.productName}</p>
                        <p className="text-[16px] font-bold">{product.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
                    <Heart productId={product._id} />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
