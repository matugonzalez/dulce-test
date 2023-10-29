import { NavLink } from "react-router-dom"
import "./NavLinks.css"

function NavsLinks({to, children}){
    return(
        <>
        <NavLink className = {({isActive})=>{
            return isActive ? 'isActive': undefined
        }}to={to}>{children}</NavLink>
        </>
    )
}
export default NavsLinks