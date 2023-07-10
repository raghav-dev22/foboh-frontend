import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
  return (
    <section style={{textAlign:"center"}}>
            <p style={{textAlign:"center", padding:"50px", margin:"140px", fontSize:"30px", fontWeight:"bold", display:"inline-block" ,boxShadow:"0px 0px 10px #ccc"}}>Coming Soon<br />
            </p>
        
    </section>
  );
};

export default Home;
