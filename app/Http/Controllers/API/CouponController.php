<?php

namespace App\Http\Controllers\API;

use App\Bag;
use App\Coupon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\BagRepository;
use App\Repositories\CouponRepository;
use App\Services\CouponService;

class CouponController extends Controller
{
    public $couponRepository;
    public $bagRepository;
    public $couponService;

    public function __construct(CouponRepository $couponRepository, BagRepository $bagRepository, CouponService $couponService)
    {
        $this->middleware('auth:api');
        $this->couponRepository = $couponRepository;
        $this->bagRepository = $bagRepository;
        $this->couponService = $couponService;
    }


    public function applyDiscount()
    {

        $coupon = $this->couponRepository->checkCoupon(request()->code);
        if ($coupon) {
            $this->couponService->applyDiscount(request()->code);
            return response()->json([
                'bag' => $this->couponService->bag,
                'coupon' => $this->couponService->couponCode,
                'percentageOff' => $this->couponService->percentageOff * 100 . '%',
                'subtotal' => $this->couponService->subtotal,
                'total' => $this->couponService->total
            ]);
        }
        return response()->json([
            'error' => 'Invalid coupon code.'
        ], 404);
    }
}
