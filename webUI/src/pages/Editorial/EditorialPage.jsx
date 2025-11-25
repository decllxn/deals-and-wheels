import React from "react";
import Editorial from "../../components/Editorial/Editorial";
import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";

const EditorialPage = () => {
    return (
        <div>
            <Navbar />
            <Editorial />
            <Footer />
        </div>
    )
}

export default EditorialPage;