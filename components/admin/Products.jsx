import { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import UpdateProduct from "./UpdateProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [isProductUpdateModal, setIsProductUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Deleted!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product); 
    setIsProductUpdateModal(true); 
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Products</Title>
      <div className="overflow-auto max-h-[400px] w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                IMAGE
              </th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                TITLE
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary "
                  key={product._id}
                  
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center cursor-pointer" onClick={()=>{router.push(`/product/${product?._id}`)}}>
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white cursor-pointer" onClick={()=>{router.push(`/product/${product?._id}`)}}>
                    {product._id.substring(0, 5)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-whiten cursor-pointer" onClick={()=>{router.push(`/product/${product?._id}`)}}>
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white cursor-pointer" onClick={()=>{router.push(`/product/${product?._id}`)}}>
                    $ {product.prices[0]}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white ">
                    <button
                      className="btn-primary !bg-danger mr-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-primary !bg-lime-500"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isProductUpdateModal && (
          <UpdateProduct
            setIsProductModal={setIsProductUpdateModal}
            selectedProduct={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
