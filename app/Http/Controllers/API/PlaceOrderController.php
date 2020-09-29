<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderItem;
use App\Bag;
use App\Coupon;
use App\Repositories\BagRepository;
use App\Repositories\CouponRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlaceOrderController extends Controller
{
    public $couponRepository;
    public $bagRepository;

    public function __construct(CouponRepository $couponRepository, BagRepository $bagRepository)
    {
        $this->middleware('auth:api');
        $this->couponRepository = $couponRepository;
        $this->bagRepository = $bagRepository;
    }
    public function store()
    {

        $coupon = $this->couponRepository->checkCoupon(request()->code);

        $bag = $this->bagRepository->show();
        $subtotal = $this->bagRepository->subtotal();
        $couponCode = "";
        $percentageOff = 0;
        if ($coupon) {

            $couponCode = $coupon->code;
            $percentageOff = $coupon->percentage_off;
        }
        $order = Order::create([
            'user_id' => auth()->user()->id,
            'order_number' => substr(md5(mt_rand()), 0, 7),
            'coupon' => $couponCode,
            'percentage_off' => $percentageOff,
            'subtotal' => $subtotal,
            'total' => $subtotal - ($subtotal * $percentageOff),
        ]);
        foreach ($bag as $bagItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $bagItem->product->id,
                'quantity' => $bagItem->quantity
            ]);
        }

        $this->bagRepository->clearBag();
    }
}
