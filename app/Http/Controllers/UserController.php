<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use App\Models\User;
// use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('id', '!=', Auth::id())
            ->paginate(10)
            ->through(function ($user) {
                $user->name = Crypt::decrypt($user->name);
                return $user;
            });

        return Inertia::render('users/index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'users' => $users,
            'name' => Crypt::decrypt(Auth::user()->name),
        ]);
    }

    public function toggleStatus(User $user)
    {
        $user->update([
            'status' => !$user->status,
        ]);

        return redirect()->route('users.index')->with('message', 'Estado actualizado correctamente');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
