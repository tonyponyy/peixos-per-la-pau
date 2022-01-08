<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //Función que utilizaremos para registrar al usuario
    public function register(Request $request)
    {


        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->password);
        $user->admin = false;
        $user->validated = false;
        $user->api_token = bin2hex(random_bytes(10));

        $res = $user->save();

        if ($res) {
            return response()->json(['message' => 'ok'], 201);
        }
        return response()->json(['message' => 'error'], 500);

    }
    //Funcion que utilizaremos para hacer login
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $current_user = User::where('email', $email)->first();

        if(Hash::check($password,$current_user->password)) {
            return response()->json($current_user->api_token, 201);
        } else {
            return response()->json(['message' => 'error'], 500);
        }

    }

    public function switch_super_admin(Request $request)
    {
        $id = $request->input('id');
        $user = User::where('id', $id)->first();
        $user->admin = !$user->admin;
        $res = $user->save();
        if ($res) {
            return response()->json(['message' => 'ok'], 201);
        }
        return response()->json(['message' => 'error'], 500);

 

    }

    public function validate_user(Request $request)
    {
        $id = $request->input('id');
        $user = User::where('id', $id)->first();
        $user->validated = !$user->validated;
        $res = $user->save();
        if ($res) {
            return response()->json(['message' => 'ok'], 201);
        }
        return response()->json(['message' => 'error'], 500);

 

    }



    
}
