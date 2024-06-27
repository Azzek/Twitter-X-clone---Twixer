import api from '@/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Post {
    id: number;
    title: string;
    body: string;
    date: string;
    price: string;
    town: string;
    image: string;
    category: string;
    author: string;
    email: string;
    number: string;
}

interface User {
    username: string;
    email: string;
    id: number;
}

const PostPage = () => {
    const { id } = useParams<{ id: string }>()
    const [postData, setPostData] = useState<Post | null>(null)
    const [authorData, setAuthorData] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await api.get(`api/posts/post/${id}`)
                const data = res.data
                setPostData(data)
                
                if (data.author) {
                    const authorRes = await api.get(`/api/accounts/user/${data.author}`)
                    setAuthorData(authorRes.data)
                }

            } catch (err) {
                setError('Failed to fetch post data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!postData) {
        return <div>No post found</div>
    }

    return (
        <div>
            <Navbar />

            <div className='container flex justify-between bg-slate-200 rounded-2xl'>
                <img src={postData.image} alt={`${postData.title} image`} className='w-2/3 mt-4 ml-4 rounded-2xl'/>
                <div className='flex flex-col w-full text-center ml-2 pt-3 gap-2'>
                    <span className='self-start text-sm font-semibold text-neutral-700 pl-3'>Added {postData.date}</span>
                    <div className='bg-slate-300 py-5 flex flex-col justify-center align-middle text-center rounded-2xl'> 
                        <span className='text-2xl font-bold'>{postData.title} </span>
                        <p className='self-center pl-5 font-semibold text-lg'>{postData.price + ' $'}</p>
                    </div>
                    <div className='bg-slate-400 rounded-xl flex flex-col gap-2 py-2'>
                        <h2 className='self-center text-2xl'>Contact:</h2>
                        <span className='bg-slate-300 rounded-2xl'>{postData.number}</span>
                        <span className='bg-slate-300 rounded-2xl'>{postData.email}</span>
                    </div>
                    {authorData && (
                        <div>
                            <p>{authorData.username}</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PostPage
