<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->getMessageBag()], 401);
        }
        $user = User::create([
            'name' => request()->name,
            'email' => request()->email,
            'password' => Hash::make(request()->password)
        ]);
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'The email or password you entered is incorrect.'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function getAuthUser()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL()
        ]);
    }
}
