<?php

namespace App\Http\Controllers;

use App\Models\EntryExit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EntryExitController extends Controller
{
    public function index()
    {
        $entrancesExits = EntryExit::paginate(10); // Paginación de 10 elementos por página

        return Inertia::render('entrances_exits/index', [
            'auth' => [
                'user' => Auth::user() // Asegurar que se envía 'user'
            ],
            'entrancesExits' => $entrancesExits,
        ]);

        // return response()->json($EntryExit);
    }
}
