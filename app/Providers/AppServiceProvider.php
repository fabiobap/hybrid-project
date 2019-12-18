<?php

namespace App\Providers;

use App\Product;
use App\Category;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use JeroenNoten\LaravelAdminLte\Events\BuildingMenu;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    { }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Dispatcher $events)
    {
        Blade::component('components.errors', 'errors');
        Blade::component('components.success', 'success');
        Resource::withoutWrapping();
        $events->listen(BuildingMenu::class, function (BuildingMenu $event) {
            $countProducts = Cache::remember('countProducts', now()->addSeconds(10), function () {
                return Product::all()->count();
            });
            $countCategories = Cache::remember('countCategories', now()->addSeconds(10), function () {
                return Category::all()->count();
            });
            $event->menu->add('MAIN NAVIGATION');
            $event->menu->add([
                'text' => 'Category',
                'url' => '#!',
                'icon'        => 'fas fa-archive',
                'label_color' => 'success',
                'submenu' => [
                    [
                        'icon'        => 'fas fa-plus-square',
                        'icon_color'        => 'green',
                        'text' => ' Add Category',
                        'url'  => 'blade/categories/create',
                    ],
                    [
                        'text' => 'DataTable',
                        'url'  => 'blade/categories',
                        'icon'        => 'fa fa-table',
                        'label'       => $countCategories,
                    ]
                ]
            ]);
            $event->menu->add([
                'text'        => 'Product',
                'url'         => '#!',
                'icon'        => 'fas fa-shopping-basket',
                'label_color' => 'success',
                'submenu' => [
                    [
                        'icon'        => 'fas fa-plus-square',
                        'icon_color'        => 'green',

                        'text' => 'Add Product',
                        'url'  => 'blade/products/create',
                    ],
                    [
                        'text' => 'DataTable',
                        'icon'        => 'fa fa-table',
                        'url'  => 'blade/products',
                        'label'       => $countProducts,
                    ]
                ]
            ]);
        });
    }
}
