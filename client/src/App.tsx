import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Landing } from "./pages/Landing";
import { MyBlogs } from "./pages/MyBlogs";
import { ProfileUpdate } from "./pages/ProfileUpdate";
import { Publish } from "./pages/Publish";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar></AppBar>
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs/" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/profile/blogs" element={<MyBlogs />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
