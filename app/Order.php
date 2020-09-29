<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = ['user_id', 'order_number', 'coupon', 'percentage_off', 'subtotal', 'total'];

    protected $hidden = ['updated_at'];

    public function order_items()
    {
        return $this->hasMany('App\OrderItem');
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M d Y H:i A');
    }
}
