<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class isSuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    
        public function handle($request, Closure $next)
    {
       $token = $request->input('token')     ;

        if (User::where('api_token', $token)->first() != null &&
            (User::where('api_token', $token)->first())->admin == true
        
        ){

            return $next($request);
        } else{
            return response()->json(['message' => 'error de validació'], 500);
        }
       
        
    }


       
    
}
