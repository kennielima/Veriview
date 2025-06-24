"use server"
export const fetchProducts = async (page?: number, sort?: string, limit?: number) => {
    const queryString = [
        page && `page=${page}`,
        sort && `sort=${sort}`,
        limit ? `limit=${limit}` : `limit=5`,
    ]
        .filter(Boolean)
        .join("&");

    try {
        const response = await fetch(`${process.env.API_URL}/api/products?${queryString}`, {
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
        const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
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