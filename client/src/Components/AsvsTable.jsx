import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AsvsNewItem } from './AsvsNewItem'

const _ALL = 'ALL'

export function AsvsTable() {

    const [items, setItems] = useState([])
    const [filtered, setFiltered] = useState([])
    const [names, setNames] = useState([])
    const [l123, setL123] = useState(_ALL)
    const [name, setName] = useState(_ALL)
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        let arr = items.filter(p => ((p.L1 && l123 === 'L1') || (p.L2 && !p.L1 && l123 === 'L2') || (p.L3 && !p.L2 && l123 === 'L3') || l123 === _ALL)
            && (name === _ALL || name === p.Name))
        arr.sort((a, b) => prepareItemToSort(a) > prepareItemToSort(b) ? 1 : prepareItemToSort(a) < prepareItemToSort(b) ? -1 : 0)
        setFiltered(arr)
    }, [l123, items, name])

    useEffect(() => {
        setNames([_ALL].concat(items.map(p => p.Name).filter((p, i, a) => i === a.indexOf(p))))
    }, [items])

    function prepareItemToSort(item) {
        return Number(item.Item.replace(/[.]/g, ''))
    }

    function refresh() {
        axios.get('/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }

    function saveItem(item) {
        axios.post('/api/items', item)
            .then(res => { setEditItem(null); refresh() })
            .catch(err => console.log(err))
    }

    function joinLevel(item) {
        const arr = []
        if (item.L1)
            arr.push('L1')
        if (item.L2)
            arr.push('L2')
        if (item.L3)
            arr.push('L3')
        return arr.join(', ')
    }

    return (
        <div>
            <select style={{ marginRight: '10px' }} onChange={e => setName(e.target.value)}>
                {names.map((p, i) =>
                    <option key={'' + i}>{p}</option>
                )}
            </select>
            <select style={{ marginRight: '10px' }} onChange={e => setL123(e.target.value)}>
                {[_ALL, 'L1', 'L2', 'L3'].map((p, i) =>
                    <option key={'' + i}>{p}</option>
                )}
            </select>
            <label>Pt</label>
            <input type="radio" name="language" />
            <label>En</label>
            <input type="radio" name="language" />

            {editItem && <AsvsNewItem item={editItem} onSave={item => saveItem(item)} onCancel={() => setEditItem(null)} />}

            <table border="1">
                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Level</th>
                        <th>CWE</th>
                        <th>NIST</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p, i) =>
                        <tr key={'' + i}>
                            <td>{p.Section}</td>
                            <td>{p.Item}</td>
                            <td>{p.Name}</td>
                            <td>
                                <div style={{ marginTop: 20 }}>
                                    {p.Description}
                                </div>
                                <hr />
                                <div style={{ marginBottom: 20 }}>
                                    {p.Translate}
                                </div>
                            </td>
                            <td>{joinLevel(p)}</td>
                            <td>{p.CWE}</td>
                            <td>{p.NIST}</td>
                            <td><button onClick={() => { setEditItem(p); window.scrollTo({ top: 0 }) }}>Edit</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <span>Count: {filtered.length}</span>
        </div>
    )
}