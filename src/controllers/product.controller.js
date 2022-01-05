import Product from '../models/Product';

export const createProduct = async (req, res) => {

    const { body: { name, category, price, image} } = req;
    const product = new Product({ name, category, price, image });

    res.status(201).json(product);
}

export const updateProductById = async (req, res) => {

    const { id } = req.params;
    const { body: { name, category, price, image} } = req;

    const product = await Product.findByIdAndUpdate(id, { name, category, price, image});

    res.json('update product by id')
}

export const getProducts = async (req, res) => {

    const products = await Product.find();

    res.status(200).json(products);
}

export const getProductById = async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json(product);
}

export const deleteProductById = (req, res) => {
    res.json('delete product by id')
}
