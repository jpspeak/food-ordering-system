<?php

namespace App\Http\Controllers\API;

use App\Bag;
use App\Coupon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CouponController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function check()
    {
        $coupon = Coupon::where(DB::raw("BINARY `code`"), request()->code)->first();
        $orderList = Bag::where('user_id', auth()->user()->id)->with('product')->get();


        if ($coupon) {
            $total = $orderList->sum('total');
            $couponCode = $coupon->code;
            $percentageOff = $coupon->percentage_off;

            return [
                'orderList' => $orderList,
                'coupon' => $couponCode,
                'percentageOff' => $percentageOff * 100,
                'subtotal' => $orderList->sum('total'),
                'total' => $total - $total * $percentageOff
            ];
        }
        return response()->json([
            'message' => 'Invalid coupon.'
        ], 404);
    }
}
