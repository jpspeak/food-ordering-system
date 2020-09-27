<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Bag;
use Illuminate\Http\Request;

class OrderSummaryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function all()
    {
        $orderList = Bag::where('user_id', auth()->user()->id)->with('product')->get();
        return [
            'orderList' => $orderList,
            'subtotal' => $orderList->sum('total'),
            'total' => $orderList->sum('total')
        ];
    }
}
