<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'product_id', 'quantity'];

    protected $hidden = ['created_at', 'updated_at'];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
