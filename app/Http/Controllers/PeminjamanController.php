<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePeminjamanRequest;
use App\Http\Requests\UpdatePeminjamanRequest;
use App\Http\Resources\PeminjamanResource;
use App\Models\Peminjaman;
use App\Models\PeminjamanDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (request()->has('all') && request('all') === 'true') {
            $peminjaman = Peminjaman::with('peminjamanDetails')
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $peminjaman = Peminjaman::with('peminjamanDetails')
                ->orderBy('created_at', 'desc')
                ->paginate(9);
        }

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

        $count = Peminjaman::where('user_id', $data['user_id'])->count();
        if ($count >= 3) {
            return response()->json([
                'message' => 'Peminjam sudah melakukan 3x peminjaman, silahkan melakukan pengembalian',
            ], 422);
        } else {
            $peminjaman = Peminjaman::create($data);

            foreach ($data['details'] as $detail) {
                $detail['peminjaman_id'] = $peminjaman->id;
                PeminjamanDetail::create($detail);
            }

            return new PeminjamanResource($peminjaman);
        }
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

        // cek apakah peminjaman_id dan book_id ada di Tabel PeminjamanDetail jika ada, maka update
        foreach ($data['details'] as $detail) {
            $detail['peminjaman_id'] = $peminjaman->id;
            $peminjamanDetail = PeminjamanDetail::where('peminjaman_id', $detail['peminjaman_id'])
                ->where('book_id', $detail['book_id'])
                ->first();

            if ($peminjamanDetail) {
                $peminjamanDetail->update($detail);
            } else {
                PeminjamanDetail::create($detail);
            }
        }

        // Hapus PeminjamanDetail yang tidak terkait dengan buku yang ada di $data['details']
        PeminjamanDetail::where('peminjaman_id', $peminjaman->id)
            ->whereNotIn('book_id', collect($data['details'])->pluck('book_id'))
            ->delete();

        return
            new PeminjamanResource($peminjaman->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman, Request $request)
    {
        $peminjaman->delete();

        return response('', 204);
    }
}
