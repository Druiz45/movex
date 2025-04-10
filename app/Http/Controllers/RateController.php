<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;

class RateController extends Controller
{
    public function index() {}

    public function store(Request $request) {}

    public function show($id) {}

    public function update(Request $request, $id) {}

    public function destroy($id) {}

    public function updateRate(Request $request)
    {
        // Validación opcional
        // $request->validate([
        //     'new_rate' => 'required|numeric|min:0'
        // ]);

        $rate = Rate::first(); // obtiene el primer registro de la tabla
        if ($rate) {
            $rate->update(['price_hour' => $request->new_rate]);
        } else {
            Rate::create(['price_hour' => $request->new_rate]);
        }

        return redirect()->route('parking_spaces.index')->with('message', 'Tarifa actualizada con éxito');
    }
}
