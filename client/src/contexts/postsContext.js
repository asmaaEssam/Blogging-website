import React, {createContext, Component} from 'react';
import axios from 'axios'


export const PostsContext = createContext();


class PostsContextProvider extends Component {
    state = { 
        posts: []
     }

     async componentDidMount (){

        const {data : posts} = await axios.get('http://localhost:9000/posts');
        this.setState ({
            posts
        })
    }

    handleAddProduct = post => {
        var posts = [...this.state.posts]
        posts.push(post)
        this.setState({posts})
     }
     handleEditProduct = (post)=>{
        const posts = [...this.state.posts]
        const index = posts.indexOf(posts.find(p=> p.id === post.id))
        posts[index] = post;
        this.setState({
            posts,
        })
      }
     deleteProduct =async id=> {
         //clone
        const originalposts = [...this.state.posts]
        const posts = [...this.state.posts]
        const unremovedPosts = posts.filter(p=>p.id !== id)
        this.setState ({ posts: unremovedPosts});
        try {
            await axios.delete('http://localhost:9000/posts/'+id)
        }catch(error){
            if (error.request.status === 404)
            {
                alert('product already deleted')
            }else {
                alert('Something went wrong !!')

            }
            this.setState({products: originalposts})
        }
     }

    render() { 
        return ( 
            <PostsContext.Provider value={{...this.state}} >
                {this.props.children}
            </PostsContext.Provider>
         );
    }
}

export default PostsContextProvider;
 