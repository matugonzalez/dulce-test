import './Admin.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import PreviousPageBT from '../../components/PreviousPageBT';

const Admin = () => {

    const navigate = useNavigate()
    return (
        <div className='Admin'>
            <h1>ADMIN</h1>
            <Button onClickFunction={() => navigate('/admin/dashboard')}>DASHBOARD</Button>         
            <Button onClickFunction={() => navigate('/home')}>HOME</Button>         
        </div>
    )
}

export default Admin
