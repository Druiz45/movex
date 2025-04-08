<?php

namespace App\Http\Controllers;

use App\Models\ParkingSpace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\TypeVehicle;
use App\Models\EntryExit;
use App\Models\Rate;

class ParkingSpaceController extends Controller
{
    public function index()
    {
        $parkingSpaces = ParkingSpace::all();
        $typeVehicles = TypeVehicle::all();
        // return Inertia::render('parking_spaces/index', [
        return Inertia::render('parking_spaces/index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'parkingSpaces' => $parkingSpaces,
            'typeVehicles' => $typeVehicles
        ]);
    }

    public function register(Request $request)
    {
        dd($request->all());
        // $request->validate([
        //     'parking_space_id' => 'required|exists:parking_spaces,id',
        //     'license_plate' => 'required|string|max:10',
        //     'driver' => 'required|string|max:255',
        // ]);

        // Find the parking space
        $parkingSpace = ParkingSpace::findOrFail($request->parking_space_id);

        // Check if space is available
        if ($parkingSpace->status !== 0) {
            return back()->with('error', 'El espacio ya está ocupado');
        }
        $priceHour = Rate::first();
        // Create entry record
        EntryExit::create([
            'parking_space_id' => $parkingSpace->id,
            'type_vehicle_id' => $request->type_vehicle_id,
            'license_plate' => $request->license_plate,
            'driver' => $request->driver,
            'entry' => now(),
            'hourly_price_to_date' => $priceHour->price_hour,
        ]);

        // Update parking space status
        $parkingSpace->update([
            'type_vehicle_id' => $request->type_vehicle_id,
            'license_plate' => $request->license_plate,
            'driver' => $request->driver,
            'status' => 1, // 1 = occupied
        ]);

        return Inertia::render('parking_spaces/index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'parkingSpaces' => ParkingSpace::all(),
            'typeVehicles' => TypeVehicle::all(),
        ])->with('success', 'Vehículo registrado correctamente.');
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'parking_space_id' => 'required|exists:parking_spaces,id',
        ]);

        // Find the parking space
        $parkingSpace = ParkingSpace::findOrFail($request->parking_space_id);

        // Check if space is occupied
        if ($parkingSpace->status !== 1) {
            return back()->with('error', 'El espacio no está ocupado');
        }

        // Find the latest entry for this space without an exit time
        $entry = EntryExit::where('parking_space_id', $parkingSpace->id)
            ->whereNull('exit_time')
            ->latest('entry')
            ->first();

        if ($entry) {
            // Calculate duration and price
            $entryTime = new \DateTime($entry->entry);
            $exitTime = now();
            $interval = $entryTime->diff($exitTime);

            $hours = $interval->h + ($interval->days * 24);
            $minutes = $interval->i;

            // Calculate price (example: $2000 per hour for cars, $1000 for motorcycles)
            $vehicleType = TypeVehicle::find($parkingSpace->type_vehicle_id);
            $hourlyRate = $vehicleType->name === 'Automóvil' ? 2000 : 1000;
            $totalPrice = ceil($hours + ($minutes / 60)) * $hourlyRate;

            // Update entry with exit time and price
            $entry->update([
                'exit_time' => $exitTime,
                'price' => $totalPrice,
            ]);
        }

        // Reset the parking space
        $parkingSpace->update([
            'license_plate' => null,
            'driver' => null,
            'status' => 0, // 0 = available
        ]);

        return redirect()->route('parking_spaces.index');
    }

    public function report()
    {
        $entries = EntryExit::with(['parkingSpace', 'typeVehicle'])
            ->whereNotNull('exit_time')
            ->orderBy('exit_time', 'desc')
            ->get();

        $activeEntries = EntryExit::with(['parkingSpace', 'typeVehicle'])
            ->whereNull('exit_time')
            ->orderBy('entry', 'desc')
            ->get();

        return Inertia::render('Parking/Report', [
            'completedEntries' => $entries,
            'activeEntries' => $activeEntries,
        ]);
    }
}
