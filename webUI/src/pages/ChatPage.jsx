import Navbar from "../components/Weblayout/Navbar";
import Chat from "../components/chat/Chat";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels"
import Footer from "../components/Weblayout/Footer"

const ChatPage = () => {
    return (
        <div>
            <Navbar />
            <Chat />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ChatPage;