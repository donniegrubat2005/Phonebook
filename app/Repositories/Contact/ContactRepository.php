<?php

namespace App\Repositories\Contact;

use App\Models\Contact;
use Illuminate\Support\Facades\DB;

class ContactRepository implements ContactInterface
{
    protected $contactRepository;

    public function __construct(Contact $contact)
    {
        $this->contactRepository = $contact;
    }

    public function getAll()
    {
        return $this->contactRepository->all();
    }


    public function create(array $attributes)
    {
        return $this->contactRepository->create($attributes);
    }

    public function update($id, array $attributes)
    {
        return $this->contactRepository->findOrFail($id)->update($attributes);
    }

    public function findById($id)
    {
        return $this->contactRepository->findOrFail($id);
    }


    public function delete($id)
    {
        return $this->contactRepository->destroy($id);
    }
}
