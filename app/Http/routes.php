<?php

Route::get('/', function () {
	event(new App\Events\UserSignedUp('jstoone'));

	return view('welcome');
});