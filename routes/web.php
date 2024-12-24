<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home',[
        "title" => "Home"
    ]);
});

Route::get('/about', function () {
    return view('/about', [
        "title" => "About"
    ]);
});
Route::get('/project', function () {
    return view('project', [
        "title" => "Project"
    ]);
});
Route::get('/team', function () {
    return view('team', [
        "title" => "Our Team"
    ]);
});