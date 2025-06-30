import {Routes, Route} from "react-router-dom"
import { SignupRoute } from "./pages/SignupRoute"
import { SigninRoute } from "./pages/SigninRoute"
import { BlogRoute } from "./pages/BlogRoute"
import { Blogs } from "./pages/Blogs"
import { PublishBlog } from "./pages/PublishBlog"

function App() {

  return (
    <>
      <Routes>
        <Route path="/signin" element={ <SigninRoute/> }/>
        <Route path="/signup" element={ <SignupRoute/>}/>
        <Route path="/blog" element={ <BlogRoute/>}/>
        <Route path="/publish" element={ <PublishBlog/>}/>
        <Route path="/blog/:id" element={ <Blogs/>}/>
      </Routes>
    </>
  )
}

export default App
