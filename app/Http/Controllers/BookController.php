<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BooksResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $books = Book::orderBy('created_at', 'desc')
            ->paginate(9);

        return BooksResource::collection($books);
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
    public function store(StoreBookRequest $request)
    {
        $data = $request->validated();

        // check if image was given and save on local file system
        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);
            $data['img'] = $relativePath;
        }

        $book = Book::create($data);

        return new BooksResource($book);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book, Request $request)
    {
        $book = Book::find($request->route('buku'));
        return new BooksResource($book);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book = Book::find($request->route('buku'));
        $data = $request->validated();

        // check if image was given and save on local file system
        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);
            $data['img'] = $relativePath;

            if ($book->img) {
                $absolutePath = public_path($book->img);
                File::delete($absolutePath);
            }
        }

        $book->update($data);
        return new BooksResource($book);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, Request $request)
    {
        $book = Book::find($request->route('buku'));
        if ($book->img) {
            $absolutePath = public_path($book->img);
            File::delete($absolutePath);
        }

        $book->delete();

        return response('', 204);
    }

    private function saveImage($img)
    {
        // check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $img, $type)) {
            $img = substr($img, strpos($img, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif

            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }

            $img = str_replace(' ', '+', $img);
            $img = base64_decode($img);

            if ($img === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $img);

        return $relativePath;
    }
}
