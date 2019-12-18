<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StoreCategory;
use App\Http\Requests\UpdateCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class CategoryController extends Controller
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
            $category = Category::all();
            return DataTables::of($category)
                ->addIndexColumn()
                ->addColumn('qtProducts', function ($row) {
                    $count = $row->withCount('products')->where('id', $row->id)->get();
                    return $count[0]['products_count'];
                })
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
                    <div class="p-2"><a class="btn btn-primary btn-sm" href="/blade/categories/$row->id/edit"><i class="far fa-edit"></i> Edit</a></div>
                    <div class="p-2"><button class="btn btn-danger btn-sm" id="table-btn-remover" onClick="modalDelete($row->id)"><i class="far fa-trash-alt"></i> Remove</button></div>
                    </div>
                    HTML;
                    return $action;
                })
                ->rawColumns(['action'])
                ->make(true);
        }
        return view('category.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('category.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategory $request)
    {

        $validatedData = $request->validated();
        $validatedData['name'] = ucwords($validatedData['name']);
        $category = Category::create($validatedData);

        $request->session()->flash('status', "Category {$category->name} was successfully added!");

        return redirect()->route('categories.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return view('category.edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategory $request, Category $category)
    {
        $validatedData = $request->validated();
        $validatedData['name'] = ucwords($validatedData['name']);
        $category->fill($validatedData);
        $category->save();
        $request->session()->flash('status', "Category {$category->name} was successfully modified!");
        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
    }
}
