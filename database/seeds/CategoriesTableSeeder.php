<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'All Products', 'image' => '/storage/home/category_images/all-products.jpg'],
            ['name' => 'Burgers', 'image' => '/storage/home/category_images/burgers.jpg'],
            ['name' => 'Beverages', 'image' => '/storage/home/category_images/beverages.jpg'],
            ['name' => 'Combo Meals', 'image' => '/storage/home/category_images/combo-meals.jpg']
        ];
        array_map(function ($category) {
            Category::create([
                'name' => $category['name'],
                'image' => $category['image'],
            ]);
        }, $categories);
    }
}
