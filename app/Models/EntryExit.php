<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntryExit extends Model
{
    /** @use HasFactory<\Database\Factories\EntryExitFactory> */
    use HasFactory;

    protected $table = 'entrances_exits';

    protected $fillable = [
        'parking_space_id',
        'type_vehicle_id',
        'license_plate',
        'driver',
        'entry',
        'departure',
        'hourly_price_to_date'
    ];

    // Relación: Cada entrada/salida pertenece a un espacio de estacionamiento
    public function parkingSpace()
    {
        return $this->belongsTo(ParkingSpace::class, 'parking_space_id', 'id');
    }

    public function typeVehicle()
    {
        return $this->belongsTo(TypeVehicle::class, 'type_vehicle_id', 'id');
    }

    public function getTotalPriceAttribute()
    {
        if (!$this->departure) {
            return 0;
        }

        $entryTime = Carbon::parse($this->entry);
        $departureTime = Carbon::parse($this->departure);

        $hours = $entryTime->diffInHours($departureTime);
        $totalPrice = $hours * $this->hourly_price_to_date;

        return number_format($totalPrice, 2, '.', ''); // Formatear con 2 decimales
    }
}
