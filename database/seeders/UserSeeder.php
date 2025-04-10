<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => Crypt::encrypt('Diego Ruiz'),
            'email' => 'diego@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => Crypt::encrypt('Miguel Ruiz'),
            'email' => 'miguel@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::factory()->count(10)->create();
    }
}
