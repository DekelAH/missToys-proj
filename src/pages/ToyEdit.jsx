import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy/toy.actions"
import { showErrorMsg } from "../services/event-bus.service"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.createToy())
    const [labelValue, setLabelValue] = useState('')

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setToy((toy) => ({ ...toy, [field]: value }))
    }

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToy(toy)
            })
            .catch((error) => {
                console.error('error:', error)
            })
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(() => {
                showErrorMsg('Toy saved successfully!')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }

    const { name, price, labels, createdAt, inStock } = toy
    return (
        <section className="toy-edit">
            <Link to="/toy"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" />
                <label htmlFor="name">Price</label>
                <input onChange={handleChange} value={price} type="number" id="price" name="price" />
                <label htmlFor="labels">Labels</label>
                <input onChange={(e) => setLabelValue(e.target.value)} value={labelValue} type="text" id="label" placeholder="add label" />
                <label onClick={() => { labels.push(labelValue) }}>Add Label</label>
                <ul id="labels" name="labels" >
                    {labels &&
                        labels.map((renderedLabel, index) => (
                            <li key={index}>{renderedLabel}</li>
                        ))
                    }
                </ul>
                <label htmlFor="inStock">inStock : </label>
                <input type="checkbox" name="inStock" id="inStock" checked={inStock} onChange={handleChange} />
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}