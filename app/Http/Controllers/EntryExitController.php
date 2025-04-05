<?php

namespace App\Http\Controllers;

use App\Exports\EntryExitExport;
use App\Models\EntryExit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

        // Clonar la query filtrada
        $filteredEntries = (clone $query)->with('typeVehicle')->get();

        // Contadores por tipo de vehículo
        $countsByType = $filteredEntries->groupBy(fn($entry) => $entry->typeVehicle->name)
            ->map(fn($group) => $group->count());

        // Totales por tipo de vehículo
        $totalsByType = $filteredEntries->groupBy(fn($entry) => $entry->typeVehicle->name)
            ->map(fn($group) => $group->sum('total_price'));

        // Total general
        $totalGeneral = $filteredEntries->sum('total_price');


        $entrancesExits = $query->orderByDesc('entry')->paginate(10)->through(function ($entry) {
            $entry->formatted_entry = Carbon::parse($entry->entry)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A');
            $entry->formatted_departure = $entry->departure
                ? Carbon::parse($entry->departure)->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A')
                : null;

            $entry->total_price = number_format($entry->total_price, 2);
            $entry->type = $entry->typeVehicle->name;
            return $entry;
        });

        return Inertia::render('entrances_exits/index', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'entrancesExits' => $entrancesExits,
            'countsByType' => $countsByType,
            'totalsByType' => $totalsByType,
            'totalGeneral' => $totalGeneral,
            'filters' => [
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    public function exportExcel()
    {
        return Excel::download(new EntryExitExport, 'entradas y salidas.xlsx');
    }
}
