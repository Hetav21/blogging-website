import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return (
        <h1 className="grid lg:grid-cols-2">
            <Auth type="signup"></Auth>
            <Quote></Quote>
        </h1>
    )
}