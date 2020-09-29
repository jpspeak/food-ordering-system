<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Bag;
use App\Coupon;
use Illuminate\Support\Facades\DB;
use App\Repositories\BagRepository;
use App\Repositories\CouponRepository;
use App\Services\CouponService;

class BagController extends Controller
{
    public $couponRepository;
    public $bagRepository;
    public $couponService;
    public function __construct(CouponRepository $couponRepository, BagRepository $bagRepository, CouponService $couponService)
    {
        $this->middleware('auth:api');
        $this->couponRepository = $couponRepository;
        $this->couponService = $couponService;
        $this->bagRepository = $bagRepository;
    }

    public function store()
    {
        $bagItem = $this->bagRepository->showBagItem(request()->product_id);
        if ($bagItem) {
            $this->bagRepository->updateQuantity($bagItem, request()->quantity);
        } else {
            $this->bagRepository->store(request()->product_id, request()->quantity);
        }
        return $this->bagRepository->count();
    }

    public function increment($id)
    {
        $bagItem = $this->bagRepository->showBagItem($id);
        if ($bagItem) {

            $this->bagRepository->incrementItem($id);

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
                'bag' => $this->bagRepository->show(),
                'subtotal' => $this->bagRepository->subtotal(),
                'total' => $this->bagRepository->subtotal(),
            ]);
        }
    }
    public function decrement($id)
    {
        $bagItem = $this->bagRepository->showBagItem($id);
        if ($bagItem) {

            if ($bagItem->quantity == 1) {
                $bagItem->delete();
            } else {
                $this->bagRepository->decrementItem($id);
            }
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
                'bag' => $this->bagRepository->show(),
                'subtotal' => $this->bagRepository->subtotal(),
                'total' => $this->bagRepository->subtotal(),
            ]);
        }
    }
}
