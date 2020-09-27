<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Bag;
use App\Coupon;
use Illuminate\Support\Facades\DB;

class BagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function store()
    {
        $productExist = Bag::where('user_id', auth()->user()->id)
            ->where('product_id', request()->product_id)->first();
        if ($productExist) {
            $productExist->update([
                'quantity' => $productExist->quantity + request()->quantity
            ]);
        } else {
            Bag::create([
                'user_id' => auth()->user()->id,
                'product_id' => request()->product_id,
                'quantity' => request()->quantity
            ]);
        }
        return $this->count();
    }
    public function count()
    {
        return count(Bag::where('user_id', auth()->user()->id)->get());
    }
    public function increment($id)
    {

        $productExist = Bag::where('user_id', auth()->user()->id)->where('product_id', $id)->first();

        if ($productExist) {
            $productExist->update([
                'quantity' => $productExist->quantity + 1
            ]);
            $coupon = Coupon::where(DB::raw("BINARY `code`"), request()->code)->first();

            return  $this->checkCoupon($coupon);
        }
    }
    public function decrement($id)
    {

        $productExist = Bag::where('user_id', auth()->user()->id)->where('product_id', $id)->first();

        if ($productExist) {
            $newQuantity = $productExist->quantity - 1;
            if ($newQuantity == 0) {
                $productExist->delete();
            } else {
                $productExist->update([
                    'quantity' => $newQuantity
                ]);
            }
            $coupon = Coupon::where(DB::raw("BINARY `code`"), request()->code)->first();

            return  $this->checkCoupon($coupon);
        }
    }
    public function checkCoupon($coupon)
    {
        if ($coupon) {

            $orderList = Bag::where('user_id', auth()->user()->id)->with('product')->get();
            $couponCode = $coupon->code;
            $percentageOff = $coupon->percentage_off * 100;
            $total = $orderList->sum('total');
            return [
                'orderList' => $orderList,
                'coupon' => $couponCode,
                'percentageOff' => $percentageOff,
                'subtotal' => $total,
                'total' => $total - $total * $coupon->percentage_off

            ];
        }

        $orderList = Bag::where('user_id', auth()->user()->id)->with('product')->get();
        return [
            'orderList' => $orderList,
            'subtotal' => $orderList->sum('total'),
            'total' => $orderList->sum('total')
        ];
    }
}
