<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderby('id', 'desc')->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        #validate
        $this->validate($request, [
            'title'  => 'required',
            'text'   => 'required'
        ]);


        $post = Post::create($request->all());

        return response()->json([
            'status' => 'success',
            'product'   => $post
        ]);
    }

    public function show($id)
    {
        $post = Post::find($id);

        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        #validate
        $this->validate($request, [
            'title'  => 'required',
            'text'   => 'required'
        ]);
        
        $post = Post::find($id);
        $post->update($request->all());

        return response()->json([
            'status' => 'success',
            'post'   => $post
        ]);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json('Post successfully deleted!');
    }
}
