<?php

namespace App\Http\Controllers;

use App\Models\ParkingSpace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\TypeVehicle;
use App\Models\EntryExit;
use App\Models\Rate;
use Illuminate\Support\Facades\Crypt;

class ParkingSpaceController extends Controller
{
    public function index()
    {
        return Inertia::render('parking_spaces/index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'parkingSpaces' => ParkingSpace::all(),
            'typeVehicles' => TypeVehicle::all(),
            'name' => Crypt::decrypt(Auth::user()->name),
            'current_price' => round(Rate::first()->price_hour),
        ]);
    }

    public function register(Request $request)
    {
        // Validación básica (puedes descomentar cuando quieras activar)
        // $request->validate([
        //     'parking_space_id' => 'required|exists:parking_spaces,id',
        //     'vehicleData.type_vehicle_id' => 'required|exists:type_vehicles,id',
        //     'vehicleData.license_plate' => 'required|string|max:10',
        //     'vehicleData.driver' => 'required|string|max:255',
        // ]);

        $space = ParkingSpace::findOrFail($request->parking_space_id);
        // dd($space);
        if ($space->status !== 0) {
            return back()->with('error', 'El espacio ya está ocupado');
        }
        // dd(now());
        $space->update([
            'type_vehicle_id' => $request->vehicleData['type_vehicle_id'],
            'license_plate' => $request->vehicleData['license_plate'],
            'driver' => $request->vehicleData['driver'],
            'entry' => now(),
            'status' => 1,
        ]);

        return redirect()->route('parking_spaces.index')->with('success', 'Vehículo registrado correctamente.');
    }


    public function checkout(Request $request)
    {
        // $request->validate([
        //     'parking_space_id' => 'required|exists:parking_spaces,id',
        // ]);
        // dd($request->all());
        $parkingSpace = ParkingSpace::find($request->parking_space_id);

        if (!$parkingSpace) {
            return response()->json(['error' => 'Espacio no encontrado'], 404);
        }

        if ($parkingSpace->status !== 1) {
            return back()->with('error', 'El espacio no está ocupado');
        }

        if (!$parkingSpace->entry) {
            return back()->with('error', 'No se ha registrado la hora de entrada para este vehículo.');
        }

        $rate = Rate::first();
        if (!$rate) {
            return back()->with('error', 'No hay tarifa registrada para calcular el precio.');
        }

        EntryExit::create([
            'parking_space_id' => $parkingSpace->id,
            'type_vehicle_id' => $parkingSpace->type_vehicle_id,
            'license_plate' => $parkingSpace->license_plate,
            'driver' => $parkingSpace->driver,
            'entry' => $parkingSpace->entry,
            'departure' => now(),
            'hourly_price_to_date' => $rate->price_hour,
        ]);
        // dd($request->all());
        $parkingSpace->update([
            'type_vehicle_id' => null,
            'license_plate' => null,
            'driver' => null,
            'status' => 0,
            'entry' => null, // 👈 limpiamos también la hora de entrada
        ]);

        return redirect()->route('parking_spaces.index')->with('success', 'Vehículo retirado correctamente.');
    }
}
