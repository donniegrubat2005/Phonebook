<?php

namespace App\Repositories\User;

use App\User;

class UserRepository implements UserInterface
{
    protected $userRepository;

    public function __construct(User $user)
    {
        $this->userRepository = $user;
    }
    public function getAllUsers()
    {
        return $this->userRepository->all();
    }

    public function findById($id)
    {
        return $this->userRepository->findOrFail($id);
    }

    public function passwordUpdate($id, array $attributes)
    {
        return $this->userRepository->findOrFail($id)->update($attributes);
    }
}
