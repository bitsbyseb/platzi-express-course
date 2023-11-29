import { faker } from '@faker-js/faker';
import boom  from '@hapi/boom';

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        Image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
      const item =  this.products.find((el) => el.id === id);
      if (!item) throw boom.notFound('product not found');
      if (item.isBlock) throw boom.conflict('product blocked');
      return item;
    }

  async update(id, changes) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return product;
  }

  async delete(id) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) {
    throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductService;
