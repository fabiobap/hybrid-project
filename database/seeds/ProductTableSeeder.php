<?php

use App\Category;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
       if ($categories->count() === 0) {
            $this->command->info('No categories found!');
            return;
        }
        $productsCount = (int)$this->command->ask('How many products?', 200);

        factory(App\Product::class, $productsCount)->make()->each(function ($product) use ($categories) {
            $product->category_id = $categories->random()->id;
            $product->save();
        });
    }
}
