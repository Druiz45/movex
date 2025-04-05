<?php

namespace App\Exports;

use App\Models\EntryExit;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;

class EntryExitExport implements FromCollection, WithHeadings, WithStyles, WithMapping, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */

    public function collection()
    {
        return EntryExit::with('typeVehicle')
            ->select([
                'id',
                'type_vehicle_id',
                'license_plate',
                'driver',
                'entry',
                'departure',
                'hourly_price_to_date',
            ])->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Tipo de vehículo',
            'Placa',
            'Conductor',
            'Entrada',
            'Salida',
            'Precio por hora a la fecha',
            'Total a pagar',
        ];
    }

    public function map($entrancesExits): array
    {
        $entryTime = Carbon::parse($entrancesExits->entry);
        $departureTime = Carbon::parse($entrancesExits->departure);

        $hours = $entryTime->diffInHours($departureTime);
        $totalPrice = $hours * $entrancesExits->hourly_price_to_date;

        return [
            $entrancesExits->id,
            $entrancesExits->typeVehicle->name,
            $entrancesExits->license_plate,
            $entrancesExits->driver,
            $entrancesExits->entry
                ? Carbon::parse($entrancesExits->entry)->locale('es')->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A')
                : null,
            $entrancesExits->departure
                ? Carbon::parse($entrancesExits->departure)->locale('es')->isoFormat('DD [de] MMMM [de] YYYY - hh:mm A')
                : null,
            $entrancesExits->hourly_price_to_date,
            $entrancesExits->total_price = $totalPrice,
            // $entrancesExits->physica_point,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                foreach (range('A', 'H') as $column) { // Ajusta de la columna A a la J
                    $event->sheet->getDelegate()->getColumnDimension($column)->setAutoSize(true);
                }
            },
        ];
    }

    public function styles($sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 12, 'color' => ['rgb' => 'FFFFFF']]],
            'A1:H1' => ['fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '4CAF50']]],
        ];
    }
}
