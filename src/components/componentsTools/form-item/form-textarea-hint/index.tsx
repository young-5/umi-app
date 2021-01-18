/*
 * File: index.tsx
 * Desc: 表单文本输入框提示
 * File Created: 2019-12-10
 * Author: ZTX
 * ------
 * Copyright 2019 - present, karakal
 */
import React, { useEffect, useState } from 'react'

interface FormTextareaHint {
    value: String
    maxLength: Number
}

const FormTextareaHint = ({ value, maxLength }: FormTextareaHint) => {
    const [getLength, setGetLength] = useState<number>(0)
    const max = maxLength || 1000
    const show = !!maxLength
    useEffect(() => {
        value ? setGetLength(value?.length) : setGetLength(0)
    }, [value])
    return show ? (
        <div className="rac_form_textarea_hint-container">{`${getLength} / ${max}`}</div>
    ) : (
        <div />
    )
}

export default FormTextareaHint
