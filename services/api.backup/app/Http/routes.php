<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->welcome();
});

$app->post('auth/login', 'App\Http\Controllers\Auth\AuthController@postLogin');

$app->group(['prefix' => 'apis', 'middleware' => 'jwt.auth'], function ($app) {
    $app->get('/', 'App\Http\Controllers\APIs\V1\IndexController');
});