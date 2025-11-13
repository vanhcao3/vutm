import TreeGraph from "@/components/VTTreegraph";
import icon from '../../../../../assets/images/icons-QLKN-SVG-116.png'
import logo from '../../../../../assets/images/circleDashStroke2.png'
import { useState } from "react";
import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Menu, MenuItem, Popper, Select } from "@mui/material";
import './index.scss'
import { Button } from "@/components/Elements";

export function DemoTreeGraph() {
    const dataTree = {
        lable: 'qc',
        metaData: {
            id: 1
        },
        children: [
            {
                lable: 'f361',
                metaData: {
                    id: 2
                },
                connectionStatus: 1,
                children: [
                    {
                        lable: 'e228',
                        metaData: {
                            id: 3
                        },
                        connectionStatus: 0,
                        children: [
                            {
                                lable: 'c1',
                                metaData: {
                                    id: 4
                                },
                                connectionStatus: 0,
                            }
                        ]
                    },
                    {
                        lable: 'e250',
                        metaData: {
                            id: 5
                        },
                        connectionStatus: 0,
                    },
                ]
            },
            {
                lable: 'f371',
                metaData: {
                    id: 6
                },
                connectionStatus: -1,
                children: [
                    {
                        lable: 'e290',
                        metaData: {
                            iconNode: logo,
                            id: 7
                        },
                        connectionStatus: 1,
                    },
                ]
            },
            {
                lable: 'lu918',
                metaData: {
                    id: 8
                },
                connectionStatus: 0,
                children: [
                    {
                        lable: '1uand ',
                        metaData: {
                            id: 9
                        },
                        connectionStatus: 1,
                    }
                ]
            },
            {
                lable: 'test',
                metaData: {
                    id: 10
                },
                connectionStatus: -1,
            }
        ]
    }

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [dataDetailNode, setDataDetailNode] = useState<any>({});
    const [positionMenu, setPositionMenu] = useState<{ x: number, y: number } | null>({ x: 0, y: 0 });
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const [search, setSearch] = useState<string | undefined>('')
    const [anchorNode, setAnchorNode] = useState(null)
    const [anchorLink, setAnchorLink] = useState(null)
    const [isMenuContextNode, setIsMenuContextNode] = useState<boolean>(false);

    const handleOnContextMenu = (e) => {
        e.preventDefault()
        setIsMenuContextNode(true)
        setAnchorNode(e.target)
    }

    const handleNodeClick = (node) => {
        setIsOpenDialog(true)
        setDataDetailNode(node)
    }

    const stylePath = ({ source, target }) => {
        if (target.data.connectionStatus === 0) {
            return 'disconnect'
        } else if (target.data.connectionStatus === 1) {
            return 'connect'
        }
        return 'unknown'
    }

    const handleClickLink = (sourceNode, targetNode, event) => {
        setAnchorLink(event.target)
        setPositionMenu({
            x: event.clientX,
            y: event.clientY
        })
        setIsMenu(true)
    }

    const handleCloseMenu = () => {
        setIsMenu(false)
    }

    const handleClickMenuItem = () => {
        handleCloseMenu()
    }

    const handleCloseDialog = () => {
        setIsOpenDialog(false)
        setDataDetailNode({})
    }

    const renderNodeElement = (nodeDatum, isSearchNode) => {
        return (
            <foreignObject x='-65' y='-30' width="130" height="70">
                <div className={`textName ${isSearchNode && 'blink-bg'}`}>
                    {nodeDatum.lable}
                </div>
                {
                    nodeDatum.metaData?.iconNode &&
                    <div className='image'>
                        <img src={nodeDatum.metaData?.iconNode} alt="" />
                    </div>
                }
            </foreignObject>
        )
    }

    const scaleExtent = {
        min: 0.8,
        max: 3
    }

    return (
        <>
            <div className='flex items-center'>
                <span className='mr-2'>Search Node: </span>
                <Select className='min-w-[150px] max-h-[42px]' label='Select' value={search} onChange={(e) => setSearch(e.target.value)}>
                    <MenuItem value="1">qc</MenuItem>
                    <MenuItem value="2">f361</MenuItem>
                    <MenuItem value="3">e228</MenuItem>
                    <MenuItem value="4">c1</MenuItem>
                    <MenuItem value="5">e250</MenuItem>
                    <MenuItem value="6">f371</MenuItem>
                    <MenuItem value="7">e290</MenuItem>
                    <MenuItem value="8">lu918</MenuItem>
                    <MenuItem value="9">1uand</MenuItem>
                    <MenuItem value="10">test</MenuItem>
                </Select>
            </div>

            <div className='treeGraph' id="treeWrapper">
                <TreeGraph
                    dataTree={isOpenDialog ? dataDetailNode : dataTree}
                    onAddStyleLink={stylePath}
                    onLinkClick={handleClickLink}
                    onNodeClick={handleNodeClick}
                    onContextNodeMenu={handleOnContextMenu}
                    customNodeElement={renderNodeElement}
                    idSearch={search}
                    zoom={0.5}
                    scaleExtent={scaleExtent}
                />

                <Menu
                    id='menu-link'
                    anchorEl={anchorLink}
                    open={isMenu}
                    onClose={handleCloseMenu}
                    className='w-[112px] h-[48px] rounded bg-[#3e545b]'
                    style={{ 'left': `${positionMenu.x}px`, 'top': `${positionMenu.y}px` }}
                >
                    <MenuItem
                        style={{ 'left': `${positionMenu.x}px`, 'top': `${positionMenu.y}px`, 'position': 'fixed', 'color': 'white' }}
                        className='w-[112px] h-[48px]'
                        onClick={handleClickMenuItem}
                    >
                        Menu Link
                    </MenuItem>
                </Menu>

                <Menu
                    id='menu-node'
                    open={isMenuContextNode}
                    anchorEl={anchorNode}
                    onClose={() => { setIsMenuContextNode(false) }}
                >
                    <MenuItem
                        className='w-[112px] h-[48px]'
                    >
                        Menu Node
                    </MenuItem>
                </Menu>

                <AlertDialog
                    title={'Detail'}
                    content={'detail'}
                    open={isOpenDialog}
                    onClose={handleCloseDialog}
                    onAgree={handleCloseDialog}
                />
            </div>
        </>
    )
}
