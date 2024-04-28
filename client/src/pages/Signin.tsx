import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return (
        <h1 className="grid lg:grid-cols-2">
            <Auth type="signin"></Auth>
            <Quote></Quote>
        </h1>
    )
}