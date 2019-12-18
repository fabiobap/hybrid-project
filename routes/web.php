<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::prefix('/blade')->group(function () {
    Route::get('/home', 'HomeController@homeBlade')->name('homeBlade');
    Route::resource('categories', 'CategoryController');
    Route::resource('products', 'ProductController');
});

Route::get('/storage/{filePath}', 'FileController@fileStorageServe')
->where(['filePath' => '.*']);

Route::get('/react/{path?}', function(){
    return view( 'react' );
} )->where('path', '.*');

Route::get('/', 'HomeController@index');

Auth::routes(['verify' => true, 'register' => false]);
