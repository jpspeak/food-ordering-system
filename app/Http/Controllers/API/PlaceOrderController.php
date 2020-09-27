<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderItem;
use App\Bag;
use App\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlaceOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function store()
    {
        $coupon = Coupon::where(DB::raw("BINARY `code`"), request()->code)->first();
        $orderList = Bag::where('user_id', auth()->user()->id)->with('product')->get();

        $couponCode = "";
        $percentageOff = 0;
        $total = $orderList->sum('total');
        if ($coupon) {
            $couponCode = $coupon->code;
            $percentageOff = $coupon->off;
        }
        $order = Order::create([
            'user_id' => auth()->user()->id,
            'order_number' => substr(md5(mt_rand()), 0, 7),
            'coupon' => $couponCode,
            'percentage_off' => $percentageOff,
            'subtotal' => $orderList->sum('total'),
            'total' => $total - $total * $percentageOff,
        ]);
        foreach ($orderList as $orderItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $orderItem->product->id,
                'quantity' => $orderItem->quantity
            ]);
        }

        $this->clear_bag();
    }

    public function clear_bag()
    {
        Bag::where('user_id', auth()->user()->id)->delete();
    }
}
