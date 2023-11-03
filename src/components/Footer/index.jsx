import './Footer.css'
import { Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
                        <div className="contactUs_phone">
                            <FontAwesomeIcon className="contactUs_icon" icon={faPhone} />
                            <span>+54 381-542-6534</span>
                        </div>
                        <div className="contactUs_gmail">
                            <FontAwesomeIcon className="contactUs_icon" icon={faEnvelope}/>
                            <span>dolcemikaa@gmial.com</span>
                        </div>
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