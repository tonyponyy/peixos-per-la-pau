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



}
