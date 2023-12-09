<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePeminjamanRequest;
use App\Http\Requests\UpdatePeminjamanRequest;
use App\Http\Resources\PeminjamanResource;
use App\Models\Peminjaman;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peminjaman = Peminjaman::orderBy('created_at', 'desc')
            ->whereNotIn('id', function ($query) {
                $query->select('peminjaman_id')->from('pengembalians');
            })
            ->paginate(9);

        return PeminjamanResource::collection($peminjaman);
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
        $data = $request->validated();

        $peminjaman = Peminjaman::create($data);

        return new PeminjamanResource($peminjaman);
    }

    /**
     * Display the specified resource.
     */
    public function show(Peminjaman $peminjaman, Request $request)
    {
        return new PeminjamanResource($peminjaman);
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
        $data = $request->validated();

        $peminjaman->update($data);

        return new PeminjamanResource($peminjaman);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
    {
        $peminjaman->delete();

        return response('', 204);
    }
}
