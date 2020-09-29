<?php

namespace App\Repositories;

use App\Bag;

class BagRepository
{
    public $bag;

    public function __construct(Bag $bag)
    {
        $this->bag = $bag;
    }
    public function show()
    {
        return Bag::where('user_id', auth()->user()->id)->with('product')->get();
    }
    public function subtotal()
    {
        return Bag::where('user_id', auth()->user()->id)->with('product')->get()->sum('total');
    }
    public function showBagItem($id)
    {
        return Bag::where('user_id', auth()->user()->id)->where('product_id', $id)->first();
    }
    public function incrementItem($id)
    {
        $bagItem = $this->showBagItem($id);
        $bagItem->update([
            'quantity' => $bagItem->quantity + 1
        ]);
    }
    public function decrementItem($id)
    {
        $bagItem = $this->showBagItem($id);
        $bagItem->update([
            'quantity' => $bagItem->quantity - 1
        ]);
    }
    public function updateQuantity($bagItem, $quantity)
    {
        $bagItem->update([
            'quantity' => $bagItem->quantity + $quantity
        ]);
    }
    public function store($productId, $quantity)
    {
        Bag::create([
            'user_id' => auth()->user()->id,
            'product_id' => $productId,
            'quantity' => $quantity
        ]);
    }
    public function count()
    {
        return count(Bag::where('user_id', auth()->user()->id)->get());
    }
    public function clearBag()
    {
        Bag::where('user_id', auth()->user()->id)->delete();
    }
}
