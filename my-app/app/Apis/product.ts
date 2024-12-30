export const fetchProducts = async () => {
    const response = await fetch("http://localhost:3001/products");
    const products = await response.json();
    return products
};

export const updateProduct = async (id: any, updatedData: any) => {
    await fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
};

export const deleteProduct = async (id: any) => {
    await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
    });
};
