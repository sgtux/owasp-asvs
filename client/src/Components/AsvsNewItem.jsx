import React, { useState, useEffect } from 'react'

import { AsvsNewItemContainer } from './styles'

export function AsvsNewItem({ item, onSave, onCancel }) {

    const [translate, setTranslate] = useState('')
    const [why, setWhy] = useState('')
    const [recommendation, setRecommendation] = useState('')

    useEffect(() => {
        setTranslate(item.Translate || '')
        setWhy(item.Why || '')
        setRecommendation(item.Recommendation || '')
        console.log(item)
    }, [item])

    return (
        <AsvsNewItemContainer>
            <span>{item.Section}</span><br />
            <span>{item.Name}</span><br />
            <span>{item.Item}</span><br />
            <span>{item.Description}</span><br /><br />
            <span>Translate: </span><br />
            <textarea value={translate} onChange={e => setTranslate(e.target.value)}
                style={{ width: 600, minHeight: 100, fontSize: 20 }}></textarea><br /><br />
            <span>Why: </span><br />
            <textarea value={why} onChange={e => setWhy(e.target.value)}
                style={{ width: 600, minHeight: 100, fontSize: 20 }}></textarea><br /><br />
            <span>Recommendation: </span><br />
            <textarea value={recommendation} onChange={e => setRecommendation(e.target.value)}
                style={{ width: 600, minHeight: 100, fontSize: 20 }}></textarea><br /><br />
            <button onClick={() => onCancel()}>Cancel</button>
            <button onClick={() => onSave({
                ...item,
                Translate: translate,
                Why: why,
                Recommendation: recommendation,
            })}>Save</button>
        </AsvsNewItemContainer>
    )
}