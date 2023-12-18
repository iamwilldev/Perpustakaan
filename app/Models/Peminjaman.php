<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;
    public $table = 'peminjaman';

    protected $fillable = ['user_id', 'tgl_pinjam', 'tgl_kembali'];

    public function peminjamanDetails()
    {
        return $this->hasMany(PeminjamanDetail::class, 'peminjaman_id');
    }
}
