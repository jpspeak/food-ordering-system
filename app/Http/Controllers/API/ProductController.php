<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public function all()
    {
        if (request()->category == 1) {
            return Product::all();
        }
        return Product::where('category_id', request()->category)->get();
    }
    public function show($id)
    {
        return Product::where('id', $id)->first();
    }
}
