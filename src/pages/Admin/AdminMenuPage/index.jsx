import './AdminMenuPage.css'

import axios from 'axios'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useState, useEffect } from 'react'
import { ReadOnlyWalkMenuTree } from '../../../components/WalkMenuTree'
import { FromFetchedMenuTreeToAdminMenuTree, FromIDListToMenuItem } from '../../../components/WalkMenuTree/helpers'
import { Text, Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, Checkbox } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'

const AdminMenuPage = () => {
    const [menu, setMenu] = useState([])
    const [state] = useAdminSystem()
    const [isPutting, setIsPutting] = useState(false)
    const [body, setBody] = useState({ title: '', detail: '', price: 0 })
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        FetchMenu()
    }, [])

    const FetchMenu = () => {
        axios.get(`${state.api.base_path}/menu`, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 200) {
                setMenu(FromFetchedMenuTreeToAdminMenuTree(res.data.menu))
            }
        })
        .catch((err) => {
            console.error({ getMenuError: err })
        })
    }

    const Reset = () => {
        setIsPutting(false)
        setIsDeleting(false)
        setIsAdding(false)
        setIsEditing(false)
        setBody({ title: '', detail: '', price: 0 })
    }

    const DeleteItem = (id) => {
        if (!id) return;

        if (isDeleting) true;
        setIsDeleting(true)

        axios.delete(`${state.api.base_path}/menu/${id}`, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 200) {
                FetchMenu()
            }
        })
        .catch((err) => {
            console.error({ deleteItemError: err })
        })
        .finally(() => {
            Reset()
        })
    }

    const EnablePuttingMode = (body) => {
        setIsPutting(true)
        setBody(prev => ({ ...prev, ...body }))
    }

    const ConfirmEditItem = () => {
        const { id, ...rest } = body
        if (!id) return;

        if (isEditing) true;
        setIsEditing(true)

        axios.put(`${state.api.base_path}/menu/${id}`, rest, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 200) {
                FetchMenu()
            }
        })
        .catch((err) => {
            console.error({ deleteItemError: err })
        })
        .finally(() => {
            Reset()
        })
    }

    const ConfirmAddItem = () => {
        if (!body.parent_id) return;

        if (isAdding) true;
        setIsAdding(true)

        axios.post(`${state.api.base_path}/menu/`, body, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 201) {
                FetchMenu()
            }
        })
        .catch((err) => {
            console.error({ deleteItemError: err })
        })
        .finally(() => {
            Reset()
        })
    }

    const Confirm = () => {
        if (body.parent_id) ConfirmAddItem()
        else ConfirmEditItem()
    }



    return (
        <div className='AdminMenuPage'>
            <Text fontSize='6xl' textAlign='center' marginTop='auto'>Menu editable</Text>
            <Box display='flex' flexDirection='row' gap={2} width='6xl' marginBottom='auto' >
                <Box height='xl' flexFlow='1' flexShrink='0' flexBasis='50%' backgroundColor='pink.100' borderRadius='xl' display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding='2'>
                    <ReadOnlyWalkMenuTree 
                    offset={0}
                    list={menu}
                    renderOptionAs={(v) => {
                        return (
                            <Box padding={2} display='flex' flexDirection='row' gap='2' alignItems='center'>
                                <Text 
                                fontSize='3xl'
                                color='pink.700'
                                >{v.title}</Text>
                                <Button 
                                size='xs'
                                colorScheme='green'
                                leftIcon={<AddIcon />}
                                onClick={() => {
                                    EnablePuttingMode({ parent_id: v.id, parent_title: v.title, is_available: v.is_available, price: 0 })
                                }}
                                >Opción</Button>
                                <Button 
                                size='xs'
                                colorScheme='teal'
                                leftIcon={<EditIcon />}
                                onClick={() => {
                                    EnablePuttingMode({ title: v.title, detail: v.detail, price: v.price, is_available: v.is_available, id: v.id })
                                }}
                                >Opción</Button>
                                <Button 
                                size='xs'
                                colorScheme='red'
                                leftIcon={<DeleteIcon />}
                                onClick={() => {
                                    DeleteItem(v.id)
                                }}
                                >Opción</Button>
                            </Box>
                        )
                    }}
                    renderCategoryAs={(v) => {
                        return (
                            <Box padding={2} display='flex' flexDirection='row' gap='2' alignItems='center'>
                                <Text 
                                fontSize='3xl'
                                fontWeight='semibold'
                                color='pink.700'
                                >{v.title}</Text>
                                <Button 
                                size='xs' 
                                colorScheme='green' 
                                leftIcon={<AddIcon />}
                                onClick={() => {
                                    EnablePuttingMode({ parent_id: v.id, parent_title: v.title, is_available: v.is_available, price: 0 })
                                }}
                                >Opción</Button>
                                <Button 
                                size='xs'
                                colorScheme='teal'
                                leftIcon={<EditIcon />}
                                onClick={() => {
                                    EnablePuttingMode({ title: v.title, detail: v.detail, price: v.price, is_available: v.is_available, id: v.id })
                                }}
                                >Categoría</Button>
                                <Button
                                size='xs'
                                colorScheme='red'
                                leftIcon={<DeleteIcon />}
                                onClick={() => {
                                    DeleteItem(v.id)
                                }}
                                >Categoría</Button>
                            </Box>
                        )
                    }}
                    />
                </Box>
                <Box
                height='xl'
                flexFlow='1'
                flexShrink='0'
                flexBasis='50%'
                backgroundColor='pink.100'
                borderRadius='xl'
                display='flex'
                flexDirection='column'
                alignItems='center'
                gap={2}
                padding='2'>
                    {(isPutting && body) &&
                    <Box
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    gap={2}
                    >
                        {body.parent_id ? <Text>Agregando en '{body.parent_title}'</Text> : <Text>Editando</Text>}
                        <Input value={body.title} onChange={(e) => {
                            setBody((prev) => ({ ...prev, title: e.target.value }))
                        }} size='lg' variant='filled' placeholder='Título'/>
                        <Input value={body.detail} onChange={(e) => {
                            setBody((prev) => ({ ...prev, detail: e.target.value  }))
                        }} size='lg' variant='filled' placeholder='Detalle'/>
                        <InputGroup variant='filled' size='lg' >
                            <InputLeftElement
                              pointerEvents='none'
                              color='pink.900'
                              children='$'
                            />
                            <Input value={body.price} onChange={(e) => {
                                if (e.target.value === '') {
                                    setBody((prev) => ({ ...prev, price: 0 }))
                                    return
                                }
                                if (isNaN(Number(e.target.value)) === false) {
                                    setBody((prev) => ({ ...prev, price: e.target.value }))
                                }
                            }} placeholder='Precio' />
                        </InputGroup>                   
                        <Checkbox isChecked={body.is_available} onChange={(e) => {
                            setBody((prev) => ({ ...prev, is_available: e.target.checked }))
                        }} alignSelf='flex-start' size='lg' backgroundColor='pink.200' padding='2' borderRadius='lg'>Está disponible?</Checkbox>
                        <Box display='flex' flexDirection='row' gap={2}>
                            <Button colorScheme='red' onClick={Confirm}>Confirmar</Button>
                            <Button colorScheme='green' onClick={Reset}>Cancelar</Button>
                        </Box>
                    </Box>}
                </Box>
            </Box>
        </div>
    )
}
export default AdminMenuPage
