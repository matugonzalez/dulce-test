import './ClientMenu.css'

import axios from 'axios'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useEffect, useState } from 'react'
import { WalkMenuTree, ReadOnlyWalkMenuTree } from '../../../components/WalkMenuTree'
import { FromFetchedMenuTreeToClientMenuTree, SwitchSelectedFlagMenuItem, DeselectAllMenuTree, FilterUnselectedFromMenuTree } from '../../../components/WalkMenuTree/helpers'
import { Button, Checkbox, Text, Box } from '@chakra-ui/react'

const ClientMenu = (passedProps) => {
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }
    const [state] = useAdminSystem()

    const [menu, setMenu] = useState([])
    const [cart, setCart] = useState([])


    useEffect(() => {
        axios.get(`${state.api.base_path}/menu`, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.data.menu.length) {
                setMenu(FromFetchedMenuTreeToClientMenuTree(res.data.menu))
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    useEffect(() => {
        setCart(FilterUnselectedFromMenuTree(menu))
    }, [menu])

    const SwitchSelectionMenuItemByIDList = (list) => {
        setMenu((prev) => SwitchSelectedFlagMenuItem(prev, list))
    }

    const DeselectMenu = () => {
        setMenu((prev) => DeselectAllMenuTree(prev))
    }

    return (
        <div className={`ClientMenu ${props.className}`}>
            <Box display='flex' flexDirection='row'>
                <WalkMenuTree 
                list={menu}
                renderOptionAs={(v) => {
                    return (
                        <>
                            <Checkbox 
                            size='lg'
                            isChecked={v.isSelected}
                            onChange={() => {
                                console.log(v)
                                // FromIDListToMenuItem([...props.parents, v.id])
                                // FromIDListToMenuItemList([ ...props.parents, v.id ])
                                SwitchSelectionMenuItemByIDList([ ...v.parents, v.id ])
                            }}
                            >{v.title}</Checkbox>
                            {v.detail &&
                            <Text 
                            fontSize='sm'
                            paddingLeft='4'
                            color='pink.800'
                            fontWeight='semibold'
                            >({v.detail})</Text>}
                        </>
                    )
                }}
                renderCategoryAs={(v) => {
                    return (
                        <>
                            <Text 
                            fontSize='4xl'
                            color='pink.700'
                            fontWeight='bold'
                            >{v.title}</Text>
                            {v.detail && 
                            <Text 
                            fontSize='sm'
                            paddingLeft='4'
                            color='pink.800'
                            fontWeight='semibold'
                            >{v.detail}</Text>}
                            {v.price && 
                            <Text 
                            fontSize='xl'
                            paddingLeft='4'
                            color='pink.600'
                            fontWeight='semibold'
                            >${v.price}</Text>}
                        </>
                    )
                }}
                />
                <ReadOnlyWalkMenuTree 
                list={cart}
                renderOptionAs={(v) => {
                    return (
                        <>
                            <Text 
                            fontSize='4xl'
                            color='pink.700'
                            >{v.title}</Text>
                            {v.detail &&
                            <Text 
                            fontSize='sm'
                            paddingLeft='4'
                            color='pink.800'
                            fontWeight='semibold'
                            >({v.detail})</Text>}
                        </>
                    )
                }}
                renderCategoryAs={(v) => {
                    return (
                        <>
                            <Text 
                            fontSize='4xl'
                            color='pink.700'
                            fontWeight='bold'
                            >{v.title}</Text>
                            {v.detail && 
                            <Text 
                            fontSize='sm'
                            paddingLeft='4'
                            color='pink.800'
                            fontWeight='semibold'
                            >{v.detail}</Text>}
                            {v.price && 
                            <Text 
                            fontSize='xl'
                            paddingLeft='4'
                            color='pink.600'
                            fontWeight='semibold'
                            >${v.price}</Text>}
                        </>
                    )
                }}
                />
            </Box>
        <Button onClick={DeselectMenu}>Limpiar selección</Button>

        </div>
    )
}

export default ClientMenu
