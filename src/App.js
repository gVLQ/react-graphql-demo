import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Histogram from "./components/Histogram";
import { convertPosts } from "./util/convertor";

const PRODUCTS = gql`
  query GetPosts {
    allPosts(count: 1000) {
      id
      title
      body
      published
      createdAt
    }
  }
`;

function App() {
  const response = useQuery(PRODUCTS);

  if (response.loading) return <div>Loading..</div>;

  const allPosts = response.data.allPosts.filter((post) => {
    let date = new Date(parseInt(post.createdAt));
    return date.getFullYear() === 2019;
  });

  const postsDistribution = convertPosts(allPosts);

  if (allPosts.length > 0) {
    return (
      <div className="App">
        <h3> React Graphql VISX demo</h3>
        <Histogram postsDistribution={postsDistribution} />
      </div>
    );
  } else {
    return <div>No posts</div>;
  }
}

export default App;
