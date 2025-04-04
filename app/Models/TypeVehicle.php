<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeVehicle extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relación: Un tipo de vehículo tiene muchos espacios de estacionamiento
    public function parkingSpaces()
    {
        return $this->hasMany(ParkingSpace::class, 'type_vehicle_id', 'id');
    }

    public function entrancesExits()
    {
        return $this->hasMany(EntryExit::class, 'type_vehicle_id', 'id');
    }
}
