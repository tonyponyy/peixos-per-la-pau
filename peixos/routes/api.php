<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\fishController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/algo/{id}', [fishController::class, 'get_fish_by_fishbowl'])->middleware('require_token');;
 //Route::get('/algo/{id}', [fishController::class, 'get_fish_by_fishbowl'])->middleware('isSuperAdmin');
 
 
 
//mostrar peixos per peixera :
 Route::get('/peixera/{id}', [fishController::class, 'get_fish_by_fishbowl']);
//guardar peix
Route::post('/guardar_peix', [fishController::class, 'store']);
// mostra l'id de l'ultima peixera
Route::get('/last_fishbowl/', [fishController::class, 'last_fishbowl']);
// mostra tots els peixos de 10 en 10
Route::get('/last_5_fishbowl/', [fishController::class, 'last_5_fishbowl']);
//mostra totes les peixeres 
Route::get('/totes_les_peixeres/', [fishController::class, 'totes_les_peixeres']);

//oculta el peix
Route::post('/visibility_fish', [fishController::class, 'set_fish_visible'])->middleware('require_token');
//elimina el peix
Route::post('/destroy_fish', [fishController::class, 'destroy'])->middleware('require_token');
//pixos invisibles
Route::get('/invisible_fish', [fishController::class, 'get_fish_invisible'])->middleware('require_token');



//comprovamos si es super_admin
Route::get('/is_super', function () {
    return 'true';
})->middleware('isSuperAdmin');

//comprovamos si está conectado
Route::get('/is_online', function () {
    return 'true';
})->middleware('require_token');



//registrar usuario
Route::post('/user/register', [AuthController::class, 'register']);
// login (devuelve token)
Route::post('/user/login', [AuthController::class, 'login']);
// hace a un usuario super_admin
Route::post('/user/super_admin', [AuthController::class, 'switch_super_admin'])->middleware('isSuperAdmin');
// valida al usuario
Route::post('/user/validate_user', [AuthController::class, 'validate_user'])->middleware('isSuperAdmin');
// muestra todos los usuarios
Route::get('/user_all/', [UserController::class, 'show_all_users'])->middleware('isSuperAdmin');

//borra usuario

//oculta peix
