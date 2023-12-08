<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'description', 'penerbit', 'tanggal_terbit', 'stock', 'img'];
}
