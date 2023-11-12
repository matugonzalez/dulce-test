import { WalkMenuTree } from '../../../components/WalkMenuTree';

import axios from 'axios';
import { useEffect, useState } from 'react';

const ClientMenu = (props = { className: '' }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/menu')
        .then((res) => {
            if (res.data.menu) {
                setMenu(res.data.menu);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div className={`ClientMenu ${props.className}`}>
            <WalkMenuTree menu={menu} />
        </div>
    );
};

export default ClientMenu;
