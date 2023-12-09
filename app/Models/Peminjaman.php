<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    protected $table = 'peminjaman';
    use HasFactory;

    protected $fillable = ['book_id', 'user_id', 'tgl_pinjam', 'tgl_kembali'];
}
