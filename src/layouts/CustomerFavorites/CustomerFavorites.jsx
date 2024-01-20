import "./CustomerFavorites.css";

import steak from "../../assets/steak.png";
import { useProductsContext } from "../../context/ProductsContext";

const CustomerFavorites = () => {
  const { orders, products } = useProductsContext();

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
                    <img src={productInfo.imageUrl} />
                  </div>
                  <div className=" product_details_container">
                    <p className="product_details_heading">{product}</p>
                    <div className="align_center product_details_footer">
                      <div className="footer_title">£{productInfo.price}</div>
                      <div>
                        <button className="add_to_cart">Add to basket</button>
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
