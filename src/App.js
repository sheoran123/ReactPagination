import './App.css';
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import Posts from './components/Posts';
import Pagination from './components/Pagination'

function App() {
  const [posts,setPosts]=useState([])
  const[loading ,setLoading] =useState(false)
  const [currentPage,setCurrentPage] =useState(1)
  const [postsPerPage]=useState(7)
  

  useEffect(()=>{
    const fetchPosts=async()=>{
      setLoading(true)
      const res =await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts()
  },[])
  
  // Get current posts
  const indexOfLastPost=currentPage*postsPerPage
  const indexOfFirstPost=indexOfLastPost-postsPerPage
  const currentPosts =posts.slice(indexOfFirstPost,indexOfLastPost)

  // change page
  const paginate=(number)=>setCurrentPage(number)

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading}></Posts>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
    </div>
  );
}

export default App;
