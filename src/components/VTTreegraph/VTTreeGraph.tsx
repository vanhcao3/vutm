import Tree from "react-d3-tree";
import { CustomNodeElementProps, Orientation, RawNodeDatum, TreeLinkDatum, TreeNodeDatum } from 'react-d3-tree/lib/types/types/common';
import { HierarchyPointNode } from 'd3-hierarchy';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

interface TreeGraphProps {
    dataTree: RawNodeDatum | RawNodeDatum[],

    // Nhận vào dataa node và biến isSearch khi node đó được search (isSearch để css node)
    customNodeElement: (nodeDatum: any, isSearchNode: boolean) => JSX.Element

    // Hướng của TreeGraph
    orientation?: 'horizontal' | 'vertical'

    // Xử lý và add className vào Link target (trả về className)
    onAddStyleLink?: (link: TreeLinkDatum, orientation: Orientation) => string;

    // Xử lý khi click vào Link
    onLinkClick?: (sourceNode: HierarchyPointNode<TreeNodeDatum>, targetNode: HierarchyPointNode<TreeNodeDatum>, event: SyntheticEvent) => any;

    // Xử lý khi click vào Node
    onNodeClick?: (node: HierarchyPointNode<TreeNodeDatum>) => any;

    // Xử lý click chuột phải vào Node
    onContextNodeMenu?: (any) => void

    // Add className cho Node gốc
    rootNodeClassName?: string

    // Add className cho Node có nhiều hơn 1 Node con
    branchNodeClassName?: string

    // Add className cho Node không có Node con
    leafNodeClassName?: string

    // Nhận idNode để search
    idSearch?: string | number

    // Mức thu phóng ban đầu
    zoom?: number

    // Set mức thu phóng tối thiểu và tối đa
    scaleExtent?: {
        min: number;
        max: number;
    };
}

export const TreeGraph = (props: TreeGraphProps) => {
    const { dataTree, idSearch, onAddStyleLink, onLinkClick, customNodeElement, orientation, onContextNodeMenu, onNodeClick, rootNodeClassName, branchNodeClassName, leafNodeClassName, zoom, scaleExtent } = props
    const treeContainerRef = useRef<HTMLInputElement>()
    const treeRef = useRef()
    const shouldRecenterTreeRef = useRef(true)
    const [treeTranslate, setTreeTranslate] = useState({ x: 0, y: 0 })
    const [positionNode, setPositionNode] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // if (treeContainerRef.current && shouldRecenterTreeRef.current) {
        shouldRecenterTreeRef.current = false;
        const dimensionsContainer = treeContainerRef.current.getBoundingClientRect();
        const dimensionsTree = document.getElementsByClassName("rd3t-g")[0].getBoundingClientRect()

        setTreeTranslate({
            x: (dimensionsContainer.width / 2) - positionNode.x,
            y: (dimensionsContainer.height / 2) - (dimensionsTree.height / 2) - positionNode.y,
        })
        // }
    }, [positionNode])

    useEffect(() => {
        if (idSearch) {
            const nodeElementSearch = document.getElementById(idSearch.toString())
            if (nodeElementSearch) {
                const nodeParent = nodeElementSearch.parentElement
                const transformData = window.getComputedStyle(nodeParent).transform
                const transformDataObj = new WebKitCSSMatrix(transformData)

                setPositionNode({
                    x: transformDataObj.e,
                    y: transformDataObj.f - 150
                })
            }
        }
    }, [idSearch])

    const renderCustomSvgNode = ({ nodeDatum }) => {
        let isSearchNode = false
        if (nodeDatum.metaData.id === Number(idSearch)) isSearchNode = true

        return (
            <g id={nodeDatum.metaData.id} onContextMenu={onContextNodeMenu} onClick={() => onNodeClick(nodeDatum)}>
                {customNodeElement(nodeDatum, isSearchNode)}
            </g >
        )
    }

    return (
        <div ref={treeContainerRef} className='h-[100%]'>
            <Tree
                ref={treeRef}
                translate={treeTranslate}
                data={dataTree}
                onLinkClick={onLinkClick}
                orientation={orientation || 'vertical'}
                pathClassFunc={onAddStyleLink}
                rootNodeClassName={rootNodeClassName}
                branchNodeClassName={branchNodeClassName}
                leafNodeClassName={leafNodeClassName}
                collapsible={false}
                renderCustomNodeElement={renderCustomSvgNode}
                zoom={idSearch ? 1 : (zoom || 1)}
                scaleExtent={scaleExtent}
            />
        </div>
    );
};