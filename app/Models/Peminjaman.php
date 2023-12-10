<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    protected $table = 'peminjaman';
    use HasFactory;

    protected $fillable = ['user_id'];

    public function details()
    {
        return $this->hasMany(DetailPeminjaman::class);
    }
}
