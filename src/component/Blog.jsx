import React, { useEffect, useState } from 'react'
import Blogprofile from '../pages/BlogProfiles/Blogprofile';
import { useLocation, useOutletContext } from 'react-router-dom';
function Blog() {
  // const location = useLocation()
  // console.log("path", location)
  const data = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = (postId) => {
    const post = data.find(post => post.id === postId);
    setSelectedPost(post);
    setIsOpen(true);
  };
  const limitWordsAndAddEllipsis = (text, limit) => {
    if (text) {
      const words = text.split(' ');
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return text;
    }
  };

  return (
    <>
      <div className="vh-100 w-100 gap-5 overflow-y-auto border blog-area">
        {data.map(post => (
          <div key={post.id} className='container Blog-post shadow '>
            <label htmlFor="heading">Topic :</label><h1 className='fs-6'>{post.title}</h1>
            <div className='image-container shadow'><img src={post.image} alt=" " /></div>
            <div className='text-start  blog-content'>
              <p>{limitWordsAndAddEllipsis(post.content, 20)}</p>
              <div className='auther-detail'>
                <label htmlFor="Author">Author: {post.author}</label>
                <label htmlFor="Date">Date: {post.date}</label>
              </div>
              <div>
                <button onClick={() => handleReadMore(post.id)}>Read More...</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && <Blogprofile post={selectedPost} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default Blog;
