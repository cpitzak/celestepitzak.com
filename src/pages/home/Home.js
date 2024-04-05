import { FlashOffOutlined } from "@mui/icons-material";
import { CONTACT_ID, DRAWINGS_ID } from "../../App";
import Contact from "../../components/contact/Contact";
import ImageGallery from "../../components/image-gallery/ImageGallery";
import ScrollSpy from "react-ui-scrollspy";
import { useEffect } from "react";

function Home({ setSelectedItem, handleScrollTo }) {

    useEffect(() => {
        const hash = window.location.hash.split('#')[1];
        console.log(hash)
        if (hash) {
            handleScrollTo(hash.toLocaleLowerCase(), 'instant');
        }
    }, []);

    return (
        <div>
            <ScrollSpy scrollThrottle={100} useBoxMethod={FlashOffOutlined} onUpdateCallback={(id) => { setSelectedItem(id) }}>
                <ImageGallery sectionId={DRAWINGS_ID} />
                <Contact sectionId={CONTACT_ID} />
            </ScrollSpy>
        </div>
    );
}

export default Home;