<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingSpace extends Model
{
    use HasFactory;

    protected $fillable = ['type_vehicle_id', 'license_plate', 'driver', 'entry', 'status'];

    // Relación: Un espacio de estacionamiento pertenece a un tipo de vehículo
    public function typeVehicle()
    {
        return $this->belongsTo(TypeVehicle::class, 'type_vehicle_id', 'id');
    }

    public function entrancesExits()
    {
        return $this->hasMany(EntryExit::class, 'parking_space_id', 'id');
    }
}
