import { Product } from "types";
// todo turn into real api
class ProductsApi {
 // eslint-disable-next-line @typescript-eslint/require-await
 async getProducts(): Promise<any> {
  const res: Product[] = [
    {
      id: "1",
      name: "product1",
      price: 1000,
      images: [
        "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
        "https://i.pinimg.com/474x/c0/f9/f1/c0f9f10a0061a8dd1080d7d9e560579c.jpg",
      ],
      sizes: ["s", "m", "l", "xl"],
      category: "shirt",
      is_available: true,
      colors: ["black,white,blue"],
      stock: {
        black: { S: 10, M: 15, L: 20, XL: 5 },
        white: { S: 12, M: 17, L: 22, XL: 7 },
        blue: { S: 8, M: 13, L: 18, XL: 3 }
      },
    },
    {
      id: "2",
      name: "product2",
      price: 2000,
      images: [
        "https://i.kym-cdn.com/photos/images/newsfeed/002/164/493/b8b.jpg",
        "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
      ],
      sizes: ["s", "m"],
      category: "sweater",
      is_available: true,
      colors: ["blue"],
      stock: {
        blue: { S: 8, M: 13, L: 18, XL: 3 }
      },
    },
    {
      id: "3",
      name: "product3",
      price: 3000,
      images: [
        "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
        "https://i.kym-cdn.com/photos/images/newsfeed/002/164/493/b8b.jpg",
        "https://i.pinimg.com/474x/c0/f9/f1/c0f9f10a0061a8dd1080d7d9e560579c.jpg",
      ],
      sizes: ["xs", "s", "m", "l"],
      category: "hat",
      is_available: false,
      colors: ["white"],
      stock: {
        white: { S: 12, M: 17, L: 22, XL: 7 }
      },
    },
  ];
  return res;
  }
}

export default new ProductsApi();