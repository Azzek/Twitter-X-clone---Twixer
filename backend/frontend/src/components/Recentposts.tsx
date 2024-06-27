import React, { useState, useEffect } from 'react';
import Productcard from "./Productcard";
import api from '@/api';

// Definiowanie typu dla postów
interface Post {
  id: number;
  title: string;
  body: string;
  date: string; 
  price: string; 
  town: string;
  image: string;
  category: string;
  author: number; 
  email: string;
  number: string;
}

const Recentposts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await api.get('/api/posts/')
      const data = res.data
      setPosts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container bg-slate-100 flex flex-col justify-center items-center'>
      <h1 className='p-10 text-6xl font-sans font-bold font-roboto'>
        Most recent posts
      </h1>
      <div className="container grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {posts.map(post => (
          <Productcard
            id={post.id}
            key={post.id}
            name={post.title}
            imageURL={post.image}
            price={post.price}
            location={post.town}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Recentposts;
