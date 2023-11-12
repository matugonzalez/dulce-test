import './ClientMenu.css'

import axios from 'axios'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useEffect, useState } from 'react'
import { WalkMenuTree, ReadOnlyWalkMenuTree } from '../../../components/WalkMenuTree'
import { FromFetchedMenuTreeToClientMenuTree, SwitchSelectedFlagMenuItem, DeselectAllMenuTree, FilterUnselectedFromMenuTree, FromIDListToMenuItemList, FromSelectedMenuTreeToMenuItemList } from '../../../components/WalkMenuTree/helpers'
import { Button, Checkbox, Text, Box, Heading } from '@chakra-ui/react'
import { ArrowRightIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'

const ClientMenu = (passedProps) => {
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }
    const [state] = useAdminSystem()

    const [menu, setMenu] = useState([])
    const [selection, setSelection] = useState([])
    const [cart, setCart] = useState([])
    const [cartIsVisible, setCartIsVisible] = useState(false)
    const [isPostingOrder, setIsPostingOrder] = useState(false)

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
        setSelection(FilterUnselectedFromMenuTree(menu))
    }, [menu])

    const AddSelectionToCart = () => {

        setCart((prev) => {
            let maxId = 0;
            prev.forEach((v) => {
                if (v.id > maxId) {
                    maxId = v.id
                }
            })
            
            const list = FromSelectedMenuTreeToMenuItemList(selection)
            if (!list.length) return prev

            const added = {
                body: list.map((v) => v.title).reverse().join(' '),
                price: list.reduce((acc, arr) => acc + (arr.price ?? 0), 0),
                id: maxId + 1
            }

            return [...prev, added]
        })
        DeselectMenu()
    }

    const RemoveFromCart = (id) => {
        if (!id) return
        setCart((prev) => prev.map((v) => v.id === id ? null : v).filter(Boolean))
    }

    const SwitchSelectionMenuItemByIDList = (list) => {
        setMenu((prev) => SwitchSelectedFlagMenuItem(prev, list))
    }

    const DeselectMenu = () => {
        setMenu((prev) => DeselectAllMenuTree(prev))
    }

    const ShowSelection = () => {
        setCartIsVisible(false)
    }

    const ShowCart = () => {
        setCartIsVisible(true)
    }

    const amountItemsCart = cart.length
    const totalPriceCart = cart.reduce((acc, arr) => acc + arr.price, 0)
    const cantAddSelectionToCart = !selection.length

    const PostOrder = () => {
        setIsPostingOrder(true)

        const body = {
            client_id: state.session.user.client_id,
            menu: cart,
            total_price: totalPriceCart
        }
        axios.post(`${state.api.base_path}/orders`, body, {
            headers: { Authorization: `Bearer ${state.session.token}` } 
        })
        .then((res) => {
            if (res.status === 201) {
                // navigate(orders)
            }
        })
        .catch((err) => {
            console.error({ postOrder: err })
        })
        .finally(() => {
            setIsPostingOrder(false)
        })
    }

    return (
        <div className={`ClientMenu ${props.className}`}>
            <Box display='flex' flexDirection='row' justifyContent='center' w='90%' gap='4'>
                <Box flexGrow={0} flexShrink={0} flexBasis='50%' maxHeight='xl' overflowX='hidden' overflowY='auto'>
                    <WalkMenuTree 
                    list={menu}
                    renderOptionAs={(v) => {
                        return (
                            <>
                                <Checkbox 
                                size='lg'
                                isChecked={v.isSelected}
                                onChange={() => {
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
                </Box>
                <Box flexGrow={0} flexShrink={0} flexBasis='50%' background='pink.50' borderRadius='2xl' marginRight='auto' border='4px' borderColor='pink.900'>
                    {cartIsVisible 
                    ? <Box padding={2}>
                        <Heading textAlign='center' color='pink.900' fontWeight='semibold'>Carrito</Heading>
                        <Box height='lg' overflowY='auto' overflowX='hidden'>
                        {cart.map((v) => (
                            <Box key={v.id} backgroundColor='pink.100' borderRadius='lg' display='flex' flexDirection='row' alignItems='center' justifyContent='center' padding={2} marginTop={2}>
                                <Box marginRight='auto'>
                                    <Text fontWeight='semibold'>
                                    {v.body}
                                    </Text>
                                    <Text>
                                    ${v.price}
                                    </Text>
                                </Box>
                                <Button colorScheme='red' onClick={() => RemoveFromCart(v.id)} leftIcon={<DeleteIcon />}>Eliminar</Button>
                            </Box>
                        ))}
                        </Box>
                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' marginTop={2}>
                            <Text fontWeight='semibold'>{amountItemsCart} items</Text>
                            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap={2}>
                                <Text fontWeight='semibold'>Total: ${totalPriceCart}</Text>
                                <Button 
                                colorScheme='green'
                                onClick={PostOrder}
                                rightIcon={<ArrowRightIcon />}
                                isLoading={isPostingOrder}
                                loadingText='Enviando'
                                >Enviar pedido</Button>
                            </Box>
                        </Box>
                    </Box>
                    : <Box>
                        <Heading textAlign='center' color='pink.900' fontWeight='semibold'>Selección</Heading>
                        <Box height='lg' overflowX='hidden' overflowY='auto'>
                            <ReadOnlyWalkMenuTree 
                            list={selection}
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
                    </Box>}
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' gap='4'>
                <Button onClick={AddSelectionToCart} leftIcon={<AddIcon />} isDisabled={cantAddSelectionToCart}>Agregar selección al carrito</Button>
                <Button onClick={DeselectMenu}>Limpiar selección</Button>
                {cartIsVisible 
                    ? <Button onClick={ShowSelection}>Ver selección</Button> 
                    : (
                        <Box display='flex' flexDirection='row' gap='2' alignItems='center' justifyContent='center'>
                            <Button onClick={ShowCart}>Ver carrito</Button>
                            <Text>{amountItemsCart} items | Total: ${totalPriceCart}</Text>
                        </Box>
                    )}
            </Box>
        
        </div>
    )
}

export default ClientMenu
