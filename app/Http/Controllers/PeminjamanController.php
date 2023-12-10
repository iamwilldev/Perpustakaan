<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePeminjamanRequest;
use App\Http\Requests\StoreDetailPeminjamanRequest;
use App\Http\Requests\UpdatePeminjamanRequest;
use App\Http\Requests\UpdateDetailPeminjamanRequest;
use App\Http\Resources\PeminjamanResource;
use App\Http\Resources\DetailPeminjamanResource;
use App\Models\Peminjaman;
use App\Models\DetailPeminjaman;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tabel peminjaman : id, user_id
        // tabel detail_peminjaman : id, peminjaman_id, books_id, tgl_peminjaman, tgl_pengembalian
        $peminjamans = Peminjaman::with('details')
            ->orderBy('created_at', 'desc')
            ->paginate(9);

        return PeminjamanResource::collection($peminjamans);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePeminjamanRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Peminjaman $peminjaman, Request $request)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Peminjaman $peminjaman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePeminjamanRequest $request, Peminjaman $peminjaman)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman, Request $request)
    {
        $peminjaman->delete();

        DetailPeminjaman::where('peminjaman_id', $peminjaman->id)->delete();
        return response('', 204);
    }
}
