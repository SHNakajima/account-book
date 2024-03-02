<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LiffController extends Controller
{
    public function index(Request $request)
    {
        return redirect()->to($request->get('liff_state'));
    }
}
