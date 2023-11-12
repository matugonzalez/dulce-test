import './MenuPage.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

import { ReadOnlyWalkMenuTree } from "../../components/WalkMenuTree"

import { useAdminSystem } from "../../providers/AdminSystem"
import { Box, Text } from '@chakra-ui/react'

const MenuPage = (passedProps) => {
    const [state] = useAdminSystem()
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get(`${state.api.base_path}/menu`)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                setMenu(res.data.menu)
            }
        })
        .catch((err) => {
            console.error({ fetchMenuError: err })
        })
    }, [])

    return (
        <div className='MenuPage'>
            <Box display='flex' flexDirection='column' paddingBottom='20'>
                <Text fontSize='8xl' color='pink.900'>Menu disponible</Text>
                <ReadOnlyWalkMenuTree 
                list={menu}
                renderOptionAs={(v) => {
                    return (
                        <>
                            <Text 
                            fontSize='4xl'
                            color='pink.700'
                            >[ ] {v.title}</Text>
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
        </div>
    )
}

export default MenuPage
//
//
// import './MenuTree.css'
//
// import axios from 'axios'
// import { useState, useEffect } from 'react'
//
// import { FromMenuTreeToMenuItemList, FromSelectedMenuTreeToMenuItemList, SwitchSelectedFlagMenuItem, DeselectAllMenuTree, FromIDListToMenuItem, FromIDListToMenuItemList, FromFetchedMenuTreeToClientMenuTree, FilterUnselectedFromMenuTree } from './helpers'
// import { WalkTree, ReadOnlyWalkTree } from './WalkTree'
// import { Checkbox, Text, Box, Button } from '@chakra-ui/react'

// const MenuTree = (props = { className: '', menu: [] }) => {
//     const [interactiveMenu, setInteractiveMenu] = useState([])
//     const [cartTree, setCartTree] = useState([])
//     const [cart, setCart] = useState([])
//     const [creating, setCreating] = useState(false)
//
//     useEffect(() => {
//         setCartTree(FilterUnselectedFromMenuTree(interactiveMenu))
//         setCart(FromMenuTreeToMenuItemList(FilterUnselectedFromMenuTree(interactiveMenu)))
//     }, [interactiveMenu])
//
//     useEffect(() => {
//     }, [interactiveMenu])
//
//     const SwitchSelectionMenuItemByIDList = (list) => {
//         setInteractiveMenu((prev) => SwitchSelectedFlagMenuItem(prev, list))
//     }
//
//     const DeselectMenu = () => {
//         setInteractiveMenu((prev) => DeselectAllMenuTree(prev))
//     }
//
//     useEffect(() => {
//         if (props.menu.length) {
//             setInteractiveMenu(() => FromFetchedMenuTreeToClientMenuTree(props.menu))
//         }
//     }, [props.menu])
//
//     return (
//         <>
//         <Box className={`MenuTree ${props.className}`} display={'flex'} flexDirection={'row'} gap={4}>
//             <Box 
//             minWidth={'sm'}
//             maxWidth={'max-content'}
//             bg={'pink.200'}
//             borderRadius={'xl'}
//             padding={2}
//             >
//                 <WalkTree list={interactiveMenu} actions={{
//                     FromIDListToMenuItem,
//                     FromIDListToMenuItemList,
//                     SwitchSelectionMenuItemByIDList,
//                 }} />
//                 <Button marginTop={4} color={'whiteAlpha.900'} bg={'red.400'} _hover={{bg:'red.600'}} onClick={DeselectMenu}>Limpiar seleccionados</Button>
//             </Box>
//             <Box
//             minWidth={'sm'}
//             maxWidth={'max-content'}
//             bg={'pink.800'}
//             borderRadius={'xl'}
//             padding={2}
//             >
//                 <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>Carrito</Text>
//                 <ReadOnlyWalkTree list={cartTree} />
//             </Box>
//         <Button 
//         bg={'green.400'}
//         _hover={{bg:'green.200'}}
//         onClick={() => {
//             setCreating(true)
//             postMenu()
//             .then((res) => {
//                 if (res.status === 201) {
//                     setCreating(false)
//                 }
//             })
//             .catch((err) => {
//             })
//         }}
//         >Enviar pedido</Button>
//         </Box>
//         </>
//     )
// }

// export default MenuTree
