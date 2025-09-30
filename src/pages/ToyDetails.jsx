import { toyService } from "../services/toy.service"

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(toyData => {
                setToy(toyData)
            })
            .catch(error => {
                console.error('Error loading toy:', error)
            })
    }


    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <h4>Price: <label>{toy.price}</label></h4>
            <h4>Labels: {toy.labels.map((label) =>
                <label key={label}>{label}, </label>
            )}</h4>
            <h4>Created At: <label>{toy.createdAt}</label></h4>
            <h4>In Stock: <label>{toy.inStock}</label></h4>
            <button><Link to="/toy">Back</Link></button>
        </section>
    )
}