<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPeminjaman extends Model
{
    protected $table = 'detail_peminjaman';
    use HasFactory;

    protected $fillable = ['peminjaman_id', 'books_id', 'tgl_pinjam', 'tgl_kembali'];
}
