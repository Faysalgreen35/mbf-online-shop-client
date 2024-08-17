import { Helmet } from "react-helmet-async";
import Shop from "../Shop/Shop";

 

const Home = () => {
    return (
        <div>
              <Helmet>
                <title>MBF Shop | Home</title>

            </Helmet>
            
            <Shop></Shop>
        </div>
    );
};

export default Home;