<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => 'Hotdog',
                'price' => 45,
                'category' => 2,
                'image' => '/storage/product/hotdog.png'
            ],
            [
                'name' => 'Cheese Burger',
                'price' => 50,
                'category' => 2,
                'image' => '/storage/product/cheese-burger.png'
            ],
            [
                'name' => 'Fries',
                'price' => 48,
                'category' => 2,
                'image' => '/storage/product/fries.png'
            ],
            [
                'name' => 'Coke',
                'price' => 25,
                'category' => 3,
                'image' => '/storage/product/coke.png'
            ],
            [
                'name' => 'Sprite',
                'price' => 25,
                'category' => 3,
                'image' => '/storage/product/sprite.png'
            ],
            [
                'name' => 'Tea',
                'price' => 30,
                'category' => 3,
                'image' => '/storage/product/tea.png'
            ],
            [
                'name' => 'Chicken Combo Meal',
                'price' => 120,
                'category' => 4,
                'image' => '/storage/product/chicken-combo-meal.png'
            ],
            [
                'name' => 'Pork Combo Meal',
                'price' => 130,
                'category' => 4,
                'image' => '/storage/product/pork-combo-meal.png'
            ],
            [
                'name' => 'Fish Combo Meal',
                'price' => 140,
                'category' => 4,
                'image' => '/storage/product/fish-combo-meal.png'
            ]
        ];
        array_map(function ($product) {
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'category_id' => $product['category'],
                'image' => $product['image'],
            ]);
        }, $products);
    }
}
