<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Order;

class OrderHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function all()
    {
        return Order::where('user_id', auth()->user()->id)->with('order_items')->with('order_items.product')->get();
    }
}
