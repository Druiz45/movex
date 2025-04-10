<?php

namespace App\Http\Controllers;

use App\Exports\EntryExitExport;
use App\Models\EntryExit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Crypt;

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

        // Clonar la query ya filtrada
        $filteredEntries = (clone $query)->with('typeVehicle')->get();

        // Contadores por tipo de vehículo
        $countsByType = $filteredEntries->groupBy(fn($entry) => $entry->typeVehicle->name)
            ->map(fn($group) => $group->count());

        // Totales por tipo de vehículo (cálculo en tiempo real)
        $totalsByType = $filteredEntries->groupBy(fn($entry) => $entry->typeVehicle->name)
            ->map(function ($group) {
                return $group->reduce(function ($carry, $entry) {
                    if ($entry->departure) {
                        $minutos = Carbon::parse($entry->entry)->diffInMinutes(Carbon::parse($entry->departure));
                        $horasCobradas = max(1, ceil($minutos / 60));
                        $carry += $horasCobradas * $entry->hourly_price_to_date;
                    }
                    return $carry;
                }, 0);
            });

        // Total general (en tiempo real)
        $totalGeneral = $filteredEntries->reduce(function ($carry, $entry) {
            if ($entry->departure) {
                $minutos = Carbon::parse($entry->entry)->diffInMinutes(Carbon::parse($entry->departure));
                $horasCobradas = max(1, ceil($minutos / 60));
                $carry += $horasCobradas * $entry->hourly_price_to_date;
            }
            return $carry;
        }, 0);

        // Paginación y formateo de entradas/salidas
        $entrancesExits = $query->orderByDesc('entry')->paginate(10)->through(function ($entry) {
            $entry->formatted_entry = Carbon::parse($entry->entry)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A');
            $entry->formatted_departure = $entry->departure
                ? Carbon::parse($entry->departure)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A')
                : null;

            $entry->type = $entry->typeVehicle->name;

            if ($entry->departure) {
                $minutos = Carbon::parse($entry->entry)->diffInMinutes(Carbon::parse($entry->departure));
                $horasCobradas = max(1, ceil($minutos / 60));
                $entry->total_price = number_format($horasCobradas * $entry->hourly_price_to_date, 2, '.', '');
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
            'totalsByType' => $totalsByType,
            'totalGeneral' => round($totalGeneral, 2),
            'filters' => [
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
            'name' => Crypt::decrypt(Auth::user()->name),
        ]);
    }


    public function exportExcel()
    {
        return Excel::download(new EntryExitExport, 'entradas y salidas.xlsx');
    }
}
