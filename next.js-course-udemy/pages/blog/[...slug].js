import { useRouter } from 'next/router';

const BlogPostPage = () => {
    const router = useRouter();
    // Hit: http://localhost:3000/blog/2023/july/4
    console.log("router.query BlogPostPage", router.query); // { slug: ['2023', 'july', '4'] }
    return <div>
        <h1>The Blog Post page</h1>
    </div>
}

export default BlogPostPage;