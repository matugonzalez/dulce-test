import './Footer.css'
import { Divider } from '@chakra-ui/react'
import InstagramIcon from '../Icons/Instagram';

function Footer(){
    return (
        <div className="footer">
            <div className="footer_body">
                <div className="footer_brand">
                    <h2>DolceMika</h2>
                </div>
                <div className="footer_contactUs">
                    <h1>Contacto</h1>
                    <div>
                        <InstagramIcon className='footer__instagram_icon' />
                        <a href='https://www.instagram.com/dolcemikaa' target='_blank'>@dolcemikaa</a>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className="footer_copyrigth">
                <h5>© 2023 DolceMika</h5>
            </div>
        </div>
    )
}

export default Footer
