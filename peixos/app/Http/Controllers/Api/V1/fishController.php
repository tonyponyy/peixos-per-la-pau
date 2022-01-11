<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\fish;
use App\Models\fishbowl;
use Illuminate\Http\Request;

class fishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        //trobem l'id de l'ultim peix
        if (Fish::latest('id')->first()){
            $ultim_peix = (Fish::latest('id')->first())->id;
        }else{
            $ultim_peix = 0; 
        }
        

        $fish = new Fish();
        $fish->imatge = $request->input('imatge');
        $fish->text = $request->input('text');
        $fish->nom = $request->input('nom');
        $fish->id_peixera = intval(($ultim_peix)/10)+1;
        $fish->visible = true;
        $res = $fish->save();

        //obtenim el identificador    
        $id_peixera = $fish->id_peixera;
        // si la peixera no existeix, es crea.
        $fishbowl = Fishbowl::where('id', '=', $id_peixera)->first();
        if ($fishbowl === null) {  
            $fishbowl = new Fishbowl();
            // creem aleatoriament un numero del 0 al 999999
            $fishbowl->fons = sprintf('%06d',rand(0, 999999));
            $res = $fishbowl->save();
        }

        if ($res) {
            return response()->json(['message' => 'Peix guardat a la peixera '.$fish->id_peixera], 201);
        }
        return response()->json(['message' => 'error'], 500);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function show(fish $fish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, fish $fish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $fish = Fish::find($id);
        $fish->delete();
    }

    public function get_fish_by_fishbowl($id){
        $peixos = Fish::where('id_peixera', $id)->get();
        $peixera = Fishbowl::where('id',$id)->get();
        
        return response()->json([
            'peixos' => $peixos,
            'peixera' => $peixera,
        ]);

    }

    public function get_fish_invisible(){
        $peixos = Fish::where('visible', false)->get();
        
        return response()->json([
         'peixos' => $peixos

        ]);

    }



    public function set_fish_visible(Request $request){
        $id = $request->input('id');
        $fish = Fish::where('id', $id)->first();
        $fish->visible = !$fish->visible;
        $res = $fish->save();
        if ($res) {
            return response()->json(['message' => 'ok'], 201);
        }
        return response()->json(['message' => 'error'], 500);
    }



    public function last_fishbowl(){
        $last_fishbowl = (Fishbowl::latest('id')->first())->id;
        return response()->json([
            'id' => $last_fishbowl
        ]);
    }

    public function last_5_fishbowl(){

        $fishbowls = Fishbowl::first()
        ->orderBy('id', 'desc')
     ->take(5)

     ->get();
     return response()->json([
         $fishbowls
    ]);

    }

    public function totes_les_peixeres(){

        $peixeres = Fishbowl::all();
        return response()->json([
             $peixeres
        ]);
        

    }




}
