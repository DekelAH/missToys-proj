import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <Link to={`/toys/${toy._id}`} className="link">
            <article className="toy-preview">
                <h2>{toy.name}</h2>
                <h4>Price: <label>{toy.price}</label></h4>
                <h4>Labels: {toy.labels.map((label) =>
                    <label key={label}>{label}, </label>
                )}</h4>
                <h4>Created At: <label>{toy.createdAt}</label></h4>
                <h4>In Stock: <label>{toy.inStock}</label></h4>
            </article>
        </Link>
    )
}