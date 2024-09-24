import { getProducts } from "@/actions/products";
import Card from "@/components/price/card";

export default async function Page() {
    const products = await getProducts();
    return (
        <div id="prices" className="flex flex-wrap justify-evenly">
            {products.map((product) => (
                <Card key={product.priceId} product={product} />
            ))}
        </div>
    );
}
