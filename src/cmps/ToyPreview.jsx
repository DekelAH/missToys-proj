import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <Link to={`/toy/${toy._id}`} className="link">
            <article className="toy-preview">
                <h2>{toy.name}</h2>
                <h4>Price: <label>{toy.price}</label></h4>
                <h4>Labels: {toy.labels && toy.labels.map((label) =>
                    <label key={label}>{label}, </label>
                )}</h4>
            </article>
        </Link>
    )
}