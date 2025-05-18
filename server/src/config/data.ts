import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { seedCategoriesAdd } from '../controllers/seedController';
import slugify from 'slugify';
 
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    isAdmin: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: ProductCategory;
    brand: string;
    image: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products: Product[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

enum ProductCategory {
    ELECTRONICS = 'Electronics',
    CLOTHING = 'Clothing',
    HOME = 'Home & Kitchen',
    BOOKS = 'Books',
    SPORTS = 'Sports & Outdoors',
    BEAUTY = 'Beauty & Personal Care',
}

// Config
const NUM_USERS = 50;
const NUM_PRODUCTS = 60;
const ADMIN_EMAILS = ['admin@example.com', 'superadmin@example.com'];

// Helper Functions
const generateHashedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const generateMockUsers = async (): Promise<User[]> => {
    const users: User[] = [];

    // Generate admin users first
    for (const email of ADMIN_EMAILS) {
        const now = new Date();
        users.push({
            id: uuidv4(),
            firstName: 'Admin',
            lastName: 'User',
            email,
            password: await generateHashedPassword('Admin123!'),
            avatar: faker.image.avatar(),
            isAdmin: true,
            isVerified: true,
            createdAt: now,
            updatedAt: now,
        });
    }

    // Generate regular users
    for (let i = 0; i < NUM_USERS - ADMIN_EMAILS.length; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const now = new Date();

        users.push({
            id: uuidv4(),
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            password: await generateHashedPassword(`${firstName}${Math.floor(Math.random() * 1000)}!`),
            avatar: faker.image.avatar(),
            isAdmin: false,
            isVerified: faker.datatype.boolean(0.8), // 80% verified
            createdAt: now,
            updatedAt: now,
        });
    }

    return users;
};

const generateMockProducts = (): Product[] => {
    const products: Product[] = [];
    const categories = Object.values(ProductCategory);

    for (let i = 0; i < NUM_PRODUCTS; i++) {
        const category = faker.helpers.arrayElement(categories);
        const now = new Date();

        products.push({
            id: uuidv4(),
            name: generateProductName(category),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
            stock: faker.number.int({ min: 0, max: 100 }),
            category,
            brand: faker.company.name(),
            image: generateProductImage(category),
            rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            createdAt: now,
            updatedAt: now,
        });
    }

    return products;
};

const generateProductName = (category: ProductCategory): string => {
    switch (category) {
        case ProductCategory.ELECTRONICS:
            return `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.helpers.arrayElement(['Pro', 'Max', 'Plus', 'Ultra'])}`;
        case ProductCategory.CLOTHING:
            return `${faker.commerce.productMaterial()} ${faker.commerce.product()} ${faker.helpers.arrayElement(['Edition', 'Limited', 'Premium'])}`;
        default:
            return faker.commerce.productName();
    }
};

const generateProductImage = (category: ProductCategory): string => {
    const width = 400;
    const height = 400;

    switch (category) {
        case ProductCategory.ELECTRONICS:
            return faker.image.urlLoremFlickr({ width, height, category: 'electronics' });
        case ProductCategory.CLOTHING:
            return faker.image.urlLoremFlickr({ width, height, category: 'fashion' });
        case ProductCategory.HOME:
            return faker.image.urlLoremFlickr({ width, height, category: 'home' });
        case ProductCategory.BOOKS:
            return faker.image.urlLoremFlickr({ width, height, category: 'books' });
        default:
            return faker.image.urlLoremFlickr({ width, height });
    }
};

// Generate mock categories
const generateMockCategories = (): Category[] => {
    const categories: Category[] = [];
    const now = new Date();

    for (const category of Object.values(ProductCategory)) {
        categories.push({
            id: uuidv4(),
            name: category,
            slug: slugify(category, { lower: true }),
            description: faker.commerce.productDescription(),
            image: faker.image.urlLoremFlickr({ width: 640, height: 480, category }),
            products: [],
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });
    }

    return categories;
};

// Main Export
export const generateMockData = async () => {
    return {
        users: await generateMockUsers(),
        products: generateMockProducts(),
        ProductCategory : generateMockCategories()
    };
};

export type { User, Product };