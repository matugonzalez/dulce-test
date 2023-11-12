import { Checkbox, Text, Box } from '@chakra-ui/react'

const ReadOnlyWalkMenuTree = (passedProps) => {
    const defaultProps = { list: [], renderOptionAs: () => {}, renderCategoryAs: () => {}, offset: 10 }
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
                    fontSize={'4xl'}
                    paddingLeft={props.offset}
                    className='MenuOption'
                    key={v.id}
                    >
                        {v.children.length ? props.renderCategoryAs(v) : props.renderOptionAs(v)}
                        <ReadOnlyWalkMenuTree list={v.children} renderCategoryAs={props.renderCategoryAs} renderOptionAs={props.renderOptionAs} />
                    </Box>
                )
            })}
        </>
    )
}

const WalkMenuTree = (passedProps) => {
    const defaultProps = { list: [], parents: [], actions: {}, renderOptionAs: () => {}, renderCategoryAs: () => {}, offset: 10 }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }
    
    if (!props.list.length) return <></>

    if (!props.renderOptionAs || !props.renderCategoryAs) return (
        <>
            {props.list.map((v) => {
                // if (v.children.length) return (); // it's a section
                // else return () ;// it's an option
                // either way continue walking

                return (
                    <Box 
                    fontSize={'2xl'}
                    paddingLeft={props.offset}
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
                        <WalkMenuTree 
                        list={v.children}
                        offset={props.offset}
                        parents={[...props.parents, v.id]}
                        actions={props.actions}
                        renderOptionAs={props.renderOptionAs}
                        renderCategoryAs={props.renderCategoryAs}
                        />
                    </Box>
                )
            })}
        </>
    )

    return (
        <>
            {props.list.map((v) => {
                return (
                    <Box
                    fontSize={'4xl'}
                    paddingLeft={props.offset}
                    className='MenuOption'
                    key={v.id}
                    >
                        {v.children.length ? props.renderCategoryAs({ ...v, parents: [...props.parents] }) : props.renderOptionAs({ ...v, parents: [...props.parents] })}
                        <WalkMenuTree 
                        list={v.children}
                        offset={props.offset}
                        parents={[...props.parents, v.id]}
                        renderOptionAs={props.renderOptionAs}
                        renderCategoryAs={props.renderCategoryAs}
                        />
                    </Box>
                )
            })}
        </>
    )
}

export { ReadOnlyWalkMenuTree, WalkMenuTree }
