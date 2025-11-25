import Chat from "../../components/chat/Chat";
import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";


const ChatPage = () => {
    return (
        <div>
            <Navbar />
            <Chat />
            <Footer />
        </div>
    )
}

export default ChatPage;