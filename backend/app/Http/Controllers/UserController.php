<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getReporters() {
        $reporters = User::where('role', 'reporter')->select('id', 'name')->get();
      /*   $reporters = User::where('role', 'editor')->get();      $reporters = User::where('role', 'reporter')->select('id', 'name')->get();
       */  return response()->json($reporters);
    }
}
