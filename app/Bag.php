<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bag extends Model
{
    protected $fillable = ['user_id', 'product_id', 'quantity'];

    protected $hidden = ['created_at', 'updated_at'];

    protected $appends = ['total'];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
    public function getTotalAttribute()
    {
        return $this->quantity * $this->product->price;
    }
}
