<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'image',
        'status',
        'rejection_comment',
        'categorie_id',
        'user_id',
        'published_at',
        'content',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
