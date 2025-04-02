<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntryExit extends Model
{
    /** @use HasFactory<\Database\Factories\EntryExitFactory> */
    use HasFactory;

    protected $table = 'entrances_exits';

    protected $fillable = [
        'parking_space_id',
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
}
