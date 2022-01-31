<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function show_all_users(){
        $users = User::all();
        return response()->json([
             $users
        ]);
        
        }

        public function delete_user($id)
        {
            $user = User::find($id);
            $user->delete();
        }

        public function validate_user($id)
        {
            $user = User::find($id);
            $user->validated = !$user->validated;
            $res = $user->save();
            if ($res) {
            return response()->json(['message' => 'ok'], 201);
            }
            return response()->json(['message' => 'error'], 500);
            }

            public function super_user($id)
        {

            $user = User::find($id);
            $user->admin = !$user->admin;
            $res = $user->save();
            if ($res) {
            return response()->json(['message' => 'ok'], 201);
            }
            return response()->json(['message' => 'error'], 500);
            }




}
