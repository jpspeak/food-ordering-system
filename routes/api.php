<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', 'API\Auth\AuthController@register');
    Route::post('login', 'API\Auth\AuthController@login');
    Route::post('logout', 'API\Auth\AuthController@logout');
    Route::post('refresh', 'API\Auth\AuthController@refresh');
    Route::get('user', 'API\Auth\AuthController@getAuthUser');
});
Route::group(['middleware' => 'api'], function () {
    Route::get('categories', 'API\CategoryController@all');
    Route::get('products/{id}', 'API\ProductController@show');
    Route::get('menu', 'API\ProductController@all');

    Route::get('order-summary', 'API\OrderSummaryController@all');

    Route::post('bag', 'API\BagController@store');
    Route::post('bag/{id}/increment', 'API\BagController@increment');
    Route::post('bag/{id}/decrement', 'API\BagController@decrement');
    Route::get('bag/count', 'API\BagController@count');

    Route::post('apply-discount', 'API\CouponController@applyDiscount');

    Route::post('place-order', 'API\PlaceOrderController@store');

    Route::get('order-history', 'API\OrderHistoryController@all');
});
