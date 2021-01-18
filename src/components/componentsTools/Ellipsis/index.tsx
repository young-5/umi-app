/**
 * 省略组件
 */
import React from 'react'
import './index.less'
interface IEllipsisProps {
    text?: any
    width?: any
    len?: number
    isMore?: boolean
}

const Ellipsis: React.FC<IEllipsisProps> = props => {
    const { text, width = '200px', len, isMore = false } = props
    const getValue = () => {
        return len ? text?.substr(0, len) + (text?.length > len ? '...' : '') : text
    }
    return (
        <div
            className={isMore ? 'Ellipsis_clamp' : 'Ellipsis'}
            style={{
                width: width,
            }}
            title={text}
        >
            {getValue()}
        </div>
    )
}

export default Ellipsis
