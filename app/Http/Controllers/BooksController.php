<?php

namespace App\Http\Controllers;

use App\Http\Requests\BooksStoreRequest;
use App\Http\Requests\BooksUpdateRequest;
use App\Http\Resources\BooksResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $books = Book::paginate(10);

        return BooksResource::collection($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BooksStoreRequest $request)
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
        return new BooksResource($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BooksUpdateRequest $request, Book $book)
    {
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
