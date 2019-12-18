<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    $faker->addProvider(new \Bezhanov\Faker\Provider\Commerce($faker));
    $faker->addProvider(new \Bezhanov\Faker\Provider\Device($faker));
    return [
        'name' => $faker->productName,
        'image' => $faker->imageUrl(400, 200, 'technics', true, 'Faker'),
        'description' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
        'prodCod' => $faker->unique()->sha256
    ];
});
