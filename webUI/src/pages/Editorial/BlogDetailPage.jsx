import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";
import BlogDetail from "../../components/Blog-detail/BlogDetail";

const ArticleDetailPage = () => {
    return (
        <div>
            <Navbar />
            <BlogDetail />
            <Footer />
        </div>
    )
}

export default ArticleDetailPage;