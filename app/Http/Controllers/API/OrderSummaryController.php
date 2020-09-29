<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Bag;
use App\Repositories\BagRepository;
use Illuminate\Http\Request;

class OrderSummaryController extends Controller
{
    public $bagRepository;
    public function __construct(BagRepository $bagRepository)
    {
        $this->middleware('auth:api');
        $this->bagRepository = $bagRepository;
    }
    public function all()
    {

        return response()->json([
            'bag' => $this->bagRepository->show(),
            'subtotal' => $this->bagRepository->subtotal(),
            'total' => $this->bagRepository->subtotal()
        ]);
    }
}
