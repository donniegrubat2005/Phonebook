<?php

namespace App\Repositories\User;

interface UserInterface
{

    public function getAllUsers();
    public function findById($id);
    public function passwordUpdate($id, array $attributes);
}
