<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoriesCount = (int)$this->command->ask('How many categories?', 20);

        factory(Category::class, $categoriesCount)->make()->each(function ($category) {
            $category->save();
        });
    }
}
