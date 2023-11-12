import './Home.css'

const Home = () => {
    return (
        <div className='Home'>
            <div className="Home_Container">
                <div className="Home_Title">
                    <h1>Welcome to DolceMika</h1>                 
                </div>
                <div className="Home_AboutMe">
                    <div className="Home_Image">
                    </div>
                    <div className="Home_AboutMe--Texto">
                    <h1>
                        Hola! Soy Mica
                    </h1>
                    <h2>
                        Estudié cocina y me especializo en pastelería
                    </h2>
                   </div>
                </div>
            {/*
                <div className='Home_AboutMe'>
                    <div>
                        <div className="Home_AboutMe--Texto">
                        <h3>Mi trabajo:</h3>
                        </div>
                    </div>
                </div>
            */}
            </div>
        </div>
    )
}

export default Home
