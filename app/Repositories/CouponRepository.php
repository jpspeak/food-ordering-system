<?php

namespace App\Repositories;

use App\Coupon;

class CouponRepository
{
    public $coupon;

    public function __construct(Coupon $coupon)
    {
        $this->coupon = $coupon;
    }
    public function checkCoupon($code)
    {
        return Coupon::where('code', $code)->first();
    }
}
