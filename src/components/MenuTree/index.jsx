import './MenuTree.css'

import axios from 'axios'

import { Checkbox, Text, Box, Button } from '@chakra-ui/react'

import { useState, useEffect } from 'react'

const ReadOnlyWalkTree = (passedProps) => {
    const defaultProps = { list: [] }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    if (!props.list.length) return <></>

    return (
        <>
            {props.list.map((v) => {
                // if (v.children.length) return (); // it's a section
                // else return () ;// it's an option
                // either way continue walking

                return (
                    <Box 
                    fontSize={'2xl'}
                    paddingLeft={4}
                    className='MenuOption'
                    key={v.id}
                    >
                        {!v.children.length 
                        ? <Text
                            color={'whiteAlpha.900'}
                            fontWeight={'bold'}
                            >{v.title}</Text>
                        : <Text color={'whiteAlpha.900'} fontWeight={'bold'}>{v.title}</Text>}
                        {<ReadOnlyWalkTree list={v.children} />}
                    </Box>
                )
            })}
        </>
    )
}

const WalkTree = (passedProps) => {
    const defaultProps = { list: [], offset: 10, parents: [], actions: {} }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }
    
    if (!props.list.length) return <></>

    return (
        <>
            {props.list.map((v) => {
                // if (v.children.length) return (); // it's a section
                // else return () ;// it's an option
                // either way continue walking

                return (
                    <Box 
                    fontSize={'2xl'}
                    paddingLeft={4}
                    className='MenuOption'
                    key={v.id}
                    >
                        {!v.children.length 
                        ? <Checkbox
                            color={'pink.800'}
                            fontWeight={'bold'}
                            spacing={0}
                            gap={2}
                            size={'lg'}
                            flexDirection={'row-reverse'}
                            isChecked={v.isSelected}
                            onChange={() => {
                                props.actions.FromIDListToMenuItem([...props.parents, v.id])
                                props.actions.FromIDListToMenuItemList([ ...props.parents, v.id ])
                                props.actions.SwitchSelectionMenuItemByIDList([ ...props.parents, v.id ])
                            }
                            }>{v.title}</Checkbox>
                        : <Text color={'pink.600'} fontWeight={'bold'}>{v.title}</Text>}
                        {<WalkTree list={v.children} offset={props.offset} parents={[...props.parents, v.id]} actions={props.actions} />}
                    </Box>
                )
            })}
        </>
    )
}

function FromMenuTreeToMenuItemList(menu = []) {
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = []) {
        pool.forEach((v) => {
            const { title, ...rest } = v
            menuItemList.push(title)
            walk(v.children)
            // if (!v.children.length) {
            //     const { children, title, ...rest } = v
            //     menuItemList.push(title)
            //     return
            // }
            // walk(v.children)
            // const { children, title, ...rest } = v
            // menuItemList.push(title)
        })
    }

    walk(menu)

    return menuItemList
}

function FromSelectedMenuTreeToMenuItemList(menu = []) {
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = []) {
        pool.forEach((v) => {
            if (!v.isSelected) return

            if (!v.children.length) {
                const { children, ...rest } = v
                menuItemList.push(rest)
                return
            }
            walk(v.children)
            const { children, ...rest } = v
            menuItemList.push(rest)
        })
    }

    walk(menu)

    return menuItemList
}

// everything, until each's category options is marked as isSelected = true 

function SwitchSelectedFlagMenuItem(pool = [], ids = []) {
    if (!ids.length) return pool
    if (!pool.length) return []

    return pool.map((v) => {
        if (v.id !== ids[0]) {
            return {
                ...v,
                isSelected: ids.length === 1 ? false : v.isSelected,
            }
        }

        if (v.children.length) {
            return {
                ...v,
                isSelected: true,
                children: SwitchSelectedFlagMenuItem(v.children, ids.slice(1)),
            }
        }

        return {
            ...v,
            isSelected: ids.length === 1
        }
    })
}

function DeselectAllMenuTree(pool = []) {
    if (!pool.length) return []

    return pool.map((v) => {
        return {
            ...v,
            isSelected: false,
            children: !v.children.length ? [] : DeselectAllMenuTree(v.children)
        }
    })
}

function FromIDListToMenuItem(menu = [], list = []) {
    if (!list.length) return null
    if (!menu.length) return null

    let found = null

    function walk(pool = [], ids = []) {
        if (!ids.length) return null

        pool.forEach((v) => {
            if (ids[0] === v.id) {
                if (ids.length !== 1) return walk(v.children, ids.slice(1))

                found = v
                return
            }
        })
    }

    walk(menu, list)

    return found
}

function FromIDListToMenuItemList(menu = [], list = []) {
    if (!list.length) return menu
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = [], ids = []) {
        if (!ids.length) return null

        pool.forEach((v) => {
            if (ids[0] === v.id) {
                menuItemList.push(v)
                return walk(v.children, ids.slice(1))
            }
        })
    }

    walk(menu, list)

    return menuItemList
}

function FromFetchedMenuTreeToClientMenuTree(menu = []) {
    if (!menu.length) return []

    function walk(list = []) {
        return list.map((v) => {
            return {
                ...v,
                isSelected: false,
                isOption: !v.children.length,
                children: walk(v.children) ?? []
            }
        })
    }


    return walk(menu)
}

function FilterUnselectedFromMenuTree(menu = []) {
    if (!menu.length) return []

    function walk(pool) {
        return pool.map((v) => {
            if (!v.isSelected) return null
            return {
                ...v,
                children: FilterUnselectedFromMenuTree(v.children).filter(Boolean)
            }
        }).filter(Boolean)
    }

    return walk(menu)
}

function postMenu(body) {
    return axios.post('http://localhost:4000/api/orders', { client_id : 1, body })
}


const MenuTree = (props = { className: '', menu: [] }) => {
    const [interactiveMenu, setInteractiveMenu] = useState([])
    const [cartTree, setCartTree] = useState([])
    const [cart, setCart] = useState([])
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        setCartTree(FilterUnselectedFromMenuTree(interactiveMenu))
        setCart(FromMenuTreeToMenuItemList(FilterUnselectedFromMenuTree(interactiveMenu)))
    }, [interactiveMenu])

    useEffect(() => {
    }, [interactiveMenu])

    const SwitchSelectionMenuItemByIDList = (list) => {
        setInteractiveMenu((prev) => SwitchSelectedFlagMenuItem(prev, list))
    }

    const DeselectMenu = () => {
        setInteractiveMenu((prev) => DeselectAllMenuTree(prev))
    }

    useEffect(() => {
        if (props.menu.length) {
            setInteractiveMenu(() => FromFetchedMenuTreeToClientMenuTree(props.menu))
        }
    }, [props.menu])

    return (
        <>
        <Box className={`MenuTree ${props.className}`} display={'flex'} flexDirection={'row'} gap={4}>
            <Box 
            minWidth={'sm'}
            maxWidth={'max-content'}
            bg={'pink.200'}
            borderRadius={'xl'}
            padding={2}
            >
                <WalkTree list={interactiveMenu} actions={{
                    FromIDListToMenuItem,
                    FromIDListToMenuItemList,
                    SwitchSelectionMenuItemByIDList,
                }} />
                <Button marginTop={4} color={'whiteAlpha.900'} bg={'red.400'} _hover={{bg:'red.600'}} onClick={DeselectMenu}>Limpiar seleccionados</Button>
            </Box>
            <Box
            minWidth={'sm'}
            maxWidth={'max-content'}
            bg={'pink.800'}
            borderRadius={'xl'}
            padding={2}
            >
                <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>Carrito</Text>
                <ReadOnlyWalkTree list={cartTree} />
            </Box>
        <Button 
        bg={'green.400'}
        _hover={{bg:'green.200'}}
        onClick={() => {
            setCreating(true)
            postMenu()
            .then((res) => {
                if (res.status === 201) {
                    setCreating(false)
                }
            })
            .catch((err) => {
            })
        }}
        >Enviar pedido</Button>
        </Box>
        </>
    )
}

export default MenuTree
