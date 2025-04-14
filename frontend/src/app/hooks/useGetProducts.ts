export const fetchProducts = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Products = await response.json()
        return Products;
    } catch (err) {
        console.log("Failed to fetch Products:", err);
    }

}
export const fetchProduct = async (id: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Product = await response.json()
        return Product;
    } catch (err) {
        console.log("Failed to fetch Product:", err);
    }

}