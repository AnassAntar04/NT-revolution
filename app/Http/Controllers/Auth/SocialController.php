<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
{
    try {
        $socialUser = Socialite::driver($provider)->stateless()->user();
    } catch (\Exception $e) {
        dd($e->getMessage()); // Affiche le vrai message d'erreur
    }

    $user = User::firstOrCreate(
        ['email' => $socialUser->getEmail()],
        [
            'name' => $socialUser->getName(),
            'password' => bcrypt(uniqid())
        ]
    );

    Auth::login($user, true);

    return redirect('/dashboard');
}

    
}

