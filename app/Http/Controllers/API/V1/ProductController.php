<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProduct;
use App\Http\Requests\UpdateProduct;
use App\Http\Resources\Product as ProductResource;
use App\Product;

class ProductController extends Controller
{
    public  function __construct(){
        $this->middleware('auth:api', ['except' => ['index','productsPaginate', 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $products)
    {
        return ProductResource::collection($products::all());
    }

    public function productsPaginate(Product $products)
    {
        return ProductResource::collection($products::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProduct $request)
    {
        $validatedData = $request->validated();

        $path = $this->saveImage($request->image, $validatedData['name'], $validatedData['prodCod']);

        $validatedData['image'] = $path;
        $product = Product::create($validatedData);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProduct $request, Product $product)
    {
        $validatedData = $request->validated();
        if ($request->hasFile('image')) {
            $path = $this->saveImage($request->image, $validatedData['name'], $validatedData['prodCod']);
            $validatedData['image'] = $path;
        }
        $product->fill($validatedData);
        $product->save();

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }

    private function saveImage($image, $name, $prodCod)
    {
        $path = 'uploads/images';
        $fullPath = $image->storeAs($path, $name . '-' . $prodCod . '.' . $image->guessExtension());
        return $fullPath;
    }
}
