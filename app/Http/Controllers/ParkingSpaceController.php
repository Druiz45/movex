<?php

namespace App\Http\Controllers;

use App\Models\ParkingSpace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParkingSpaceController extends Controller
{
    public function index()
    {
        $parkingSpaces = ParkingSpace::paginate(10); // Paginación de 10 elementos por página

        return Inertia::render('parking_spaces/index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'parkingSpaces' => $parkingSpaces,
        ]);
    }
}
