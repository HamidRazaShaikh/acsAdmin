import React from 'react'

export default function MailList({ organization }) {
    return (
        <div className="blog-list">
          {organization.map(blog => (
            <div className="blog-preview" key={blog.organization_profile_id} >
              
                <h2>{ blog.email }</h2>
               
              
            </div>
          ))}
        </div>
      );
}
