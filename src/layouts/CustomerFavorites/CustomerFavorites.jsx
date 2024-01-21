import "./CustomerFavorites.css";

import { useProductsContext } from "../../context/ProductsContext";
import Cookies from "universal-cookie";
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { store } from "../../firebase";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CustomerFavorites = () => {
  const { orders, products } = useProductsContext();

  const cookies = new Cookies();

  const allProducts = orders.flatMap((order) => order.order.products);

  const productCounts = allProducts.reduce((counts, product) => {
    const { productName } = product;
    counts[productName] = (counts[productName] || 0) + 1;
    return counts;
  }, {});

  const sortedProducts = Object.keys(productCounts).sort(
    (a, b) => productCounts[b] - productCounts[a]
  );

  const customerFavorites = sortedProducts.slice(0, 4);

  async function addProduct(name, price, quantity, imageUrl) {
    let productid = btoa(Math.random()).slice(0, 20);

    if (!cookies.get("cartid")) {
      cookies.set("cartid", productid, {
        path: "/",
        maxAge: 24 * 3600,
        secure: true,
        sameSite: "none",
      });

      await setDoc(doc(store, "usercart", cookies.get("cartid")), {
        products: [
          {
            productName: name,
            productPrice: price,
            quantity: parseInt(quantity),
            imageUrl: imageUrl,
          },
        ],
      });
    } else {
      let productRef = doc(store, "usercart", cookies.get("cartid"));
      const result = await getDoc(productRef);

      let check = result
        .data()
        .products.find((element) => element.productName === name);
      if (check) {
        toast.warning("Product already added to your cart");
      } else {
        await updateDoc(productRef, {
          products: arrayUnion({
            productName: name,
            productPrice: price,
            quantity: parseInt(quantity),
            imageUrl: imageUrl,
          }),
        });
        toast.success("Product added successfully");
      }
    }
  }

  return (
    <section className="align_center customer_favorites">
      <h1 className="customer_favorites_heading">Customer Favorites</h1>
      <div className="align_center customer_favorites_products">
        {customerFavorites
          ? customerFavorites.map((product, index) => {
              const productInfo = products.find(
                (item) => item.name === product
              );
              return (
                <article key={index} className="product_details">
                  <div className="product_details_photo">
                    <Link to="/ProductList" state={{ productName: product }}>
                      <img src={productInfo.imageUrl} />
                    </Link>
                  </div>
                  <div className=" product_details_container">
                    <p className="product_details_heading">{product}</p>
                    <div className="align_center product_details_footer">
                      <div className="footer_title">£{productInfo.price}</div>
                      <div>
                        <button
                          className="add_to_cart"
                          onClick={() =>
                            addProduct(
                              productInfo.name,
                              productInfo.price,
                              1,
                              productInfo.imageUrl
                            )
                          }
                        >
                          Add to basket
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          : "No products available"}
      </div>
    </section>
  );
};

export { CustomerFavorites };
