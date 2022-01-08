<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class EnsureTokenIsValid
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

        if (User::where('api_token', $token)->first() != null){
            $user = User::where('api_token', $token)->first();
            if ($user->validated == false){
                return response()->json(['message' => 'Usuari sense validar, contacti amb administrador. '], 400);
            }else{
                return $next($request);
            }
            
        } else{
            return response()->json(['message' => 'error'], 500);
        }
       
        
    }


       
    
}
