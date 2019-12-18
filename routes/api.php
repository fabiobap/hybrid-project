<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->name('api.v1.')->namespace('Api\V1')->group(function () {
    Route::get('/status', function () {
        return response()->json(['status' => 'OK']);
    })->name('status');
    Route::prefix('/react')->group(function () {
        Route::get('/categories/paginate', 'CategoryController@categoriesPaginate');
        Route::apiResource('categories', 'CategoryController');
        Route::get('/products/paginate', 'ProductController@productsPaginate');
        Route::apiResource('products', 'ProductController');
    });
    Route::post('/login', 'AuthController@login')->name('login.api');
    //Route::post('/register', 'AuthController@register')->name('register.api');

    Route::middleware('auth:api')->group(function () {
        Route::get('/logout', 'AuthController@logout')->name('logout');
    });
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Not Found'
    ], 404);
})->name('api.fallback');
