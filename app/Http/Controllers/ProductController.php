<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StoreProduct;
use App\Http\Requests\UpdateProduct;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $category = Product::all();
            return DataTables::of($category)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
                    if (!Auth::check()) {
                        $action = <<<HTML
                        <div>
                            <a class="btn btn-link" href="/login">Sign in</a> to be able to see this!
                        </div>
                        HTML;
                        return $action;
                    }
                    $action = <<<HTML
                <div class="d-flex justify-content-start">
                <div class="p-2"><a class="btn btn-primary btn-sm" href="/blade/products/$row->id/edit"><i class="far fa-edit"></i> Edit</a></div>
                <div class="p-2"><button class="btn btn-danger btn-sm" id="table-btn-remover" onClick="modalDelete($row->id)"><i class="far fa-trash-alt"></i> Remove</button></div>
                </div>
                HTML;
                    return $action;
                })
                ->editColumn('category_id', function ($row) {
                    return $row->category->name;
                })
                ->editColumn('image', function ($row) {
                    //I'm doing this because I'm using faker to populate img with links and not images, you wont need with your own imgs
                    $url = $row->image;
                    if (strpos($row->image, 'uploads') !== false) {
                        $url = "/storage//" . $row->image;
                    }
                    $img = <<<HTML
                        <img src="$url" name="image" id="image" class="responsive" width="100px" title="$row->name" alt="Product Image" height="50px"/>
                    HTML;
                    return $img;
                })
                ->editColumn('name', function ($row) {
                    $name = <<<HTML
                    <a href="/blade/products/$row->id">$row->name</a>
                    HTML;

                    return $name;
                })
                ->rawColumns(['action', 'image', 'name'])
                ->make(true);
        }
        return view('product.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        return view('product.create', ['categories' => $categories]);
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
        $validatedData['name'] = ucwords($validatedData['name']);
        $path = $this->saveImage($request->image, $validatedData['name'], $validatedData['prodCod']);

        $validatedData['image'] = $path;
        $product = Product::create($validatedData);

        $request->session()->flash('status', "Product {$product->name} was successfully added!");

        return redirect()->route('products.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        if (strpos($product->image, 'uploads') !== false) {
            $product->image = "/storage//" . $product->image;
        }
        return view('product.show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $url = $product->image;
        if (strpos($product->image, 'uploads') !== false) {
            $url = "/storage//" . $product->image;
        }
        $product->image = $url;
        $categories = Category::all();
        return view('product.edit', ['product' => $product, 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProduct $request, Product $product)
    {
        $validatedData = $request->validated();
        $validatedData['name'] = ucwords($validatedData['name']);
        if ($request->hasFile('newImage')) {
            $path = $this->saveImage($request->newImage, $validatedData['name'], $validatedData['prodCod']);
            $validatedData['image'] = $path;
        }
        $product->fill($validatedData);
        $product->save();
        $request->session()->flash('status', "Product {$product->name} was successfully modified!");
        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    private function saveImage($image, $name, $prodCod)
    {
        $path = 'uploads/images';
        $fullPath = $image->storeAs($path, $name . '-' . $prodCod . '.' . $image->guessExtension());
        return $fullPath;
    }
}
