<?php

namespace App\Services;

use App\Coupon;
use App\Repositories\BagRepository;
use App\Repositories\CouponRepository;

class CouponService
{

    public $couponRepository;
    public $bagRepository;
    public $bag;
    public $percentageOff;
    public $couponCode;
    public $subtotal;
    public $total;

    public function __construct(BagRepository $bagRepository, CouponRepository $couponRepository)
    {

        $this->bag = $bagRepository->show();
        $this->subtotal = $bagRepository->subtotal();
        $this->total = $bagRepository->subtotal();
        $this->couponRepository = $couponRepository;
        $this->bagRepository = $bagRepository;
    }
    public function applyDiscount($couponCode)
    {
        $coupon = $this->couponRepository->checkCoupon($couponCode);
        if ($coupon) {
            $this->bag = $this->bagRepository->show();
            $this->percentageOff = $coupon->percentage_off;
            $this->couponCode = $coupon->code;
            $this->subtotal = $this->bagRepository->subtotal();
            $this->total = $this->subtotal - ($this->subtotal * $this->percentageOff);
        }
    }
}
