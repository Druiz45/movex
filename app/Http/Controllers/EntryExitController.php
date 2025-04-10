<?php

namespace App\Http\Controllers;

use App\Models\EntryExit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EntryExitController extends Controller
{
    public function index(Request $request)
    {
        Carbon::setLocale('es');

        $query = EntryExit::query();

        if ($request->filled('date_from')) {
            $query->whereDate('entry', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('entry', '<=', $request->date_to);
        }

        // Clonamos la query para poder contar sin afectar el paginado
        $countsByType = (clone $query)
            ->with('typeVehicle')
            ->get()
            ->groupBy(fn($entry) => $entry->typeVehicle->name)
            ->map(fn($group) => $group->count());

        $entrancesExits = $query->orderByDesc('entry')->paginate(10)->through(function ($entry) {
            $entry->formatted_entry = Carbon::parse($entry->entry)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A');
            $entry->formatted_departure = $entry->departure
                ? Carbon::parse($entry->departure)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A')
                : null;

            $entry->type = $entry->typeVehicle->name;

            // 💰 Cálculo del precio total si ya salió
            if ($entry->departure) {

                $minutos = Carbon::parse($entry->entry)->diffInMinutes(Carbon::parse($entry->departure));

                $horasCobradas = max(1, ceil($minutos / 60)); // Mínimo 1 hora

                $total = $horasCobradas * $entry->hourly_price_to_date;
                // dd($total);
                $entry->calculated_price = $total;
                // dd($entry->calculated_price);
            } else {
                $entry->total_price = null;
            }

            return $entry;
        });

        return Inertia::render('entrances_exits/index', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'entrancesExits' => $entrancesExits,
            'countsByType' => $countsByType,
            'filters' => [
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }
}
