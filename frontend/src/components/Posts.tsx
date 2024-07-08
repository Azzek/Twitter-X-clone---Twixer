import React, { useState, useEffect } from 'react';
import Post from "./Post";
import api from '@/api';
import { ScrollArea } from "@/components/ui/scroll-area"
import PostInput from './PostInput';


// Definiowanie typu dla postów
interface PostTypes {
  id: number;
  body: string;
  date: string; 
  image: string
  author: number; 
}

const Recentposts: React.FC = () => {
  const [posts, setPosts] = useState<PostTypes[]>([]);

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

  const removePost = (id:number) => {
    setPosts(posts.filter((p) => p.id != id))
  }

  return (
    <div className='w-2/4 h-screen flex justify-start flex-col ml-[25%]'>
      <PostInput/>
      <div className='w-full'>
        {posts.map(post => (
            <Post
              id={post.id}
              key={post.id}
              body={post.body}
              image ={post.image} 
              authorId={post.author}
              date={post.date}
              remove={removePost}
            />
          ))}
      </div> 
    </div>
  );
};

export default Recentposts;
