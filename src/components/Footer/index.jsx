import './Footer.css'
import { Divider } from '@chakra-ui/react'


function Footer(){
    return(
        <>
            <div className="footer">
                <div className="footer_body">
                    <div className="footer_brand">
                        <h1>DolceMika</h1>
                    </div>
                    <div className="footer_contactUs">
                        <h1>ContancUs</h1>
                    </div>
                </div>
                <Divider/>
                    <div className="footer_copyrigth">
                        <h5>© 2023 DolceMika</h5>
                    </div>
            </div>
        </>
    )
}

export default Footer