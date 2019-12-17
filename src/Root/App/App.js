import React from "react";

// If you want images to be uploaded to S3, import them here
// import imageName from "./images/image.png";

import "./App.scss";
import Footer from "./Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="serverless-react-boilerplate">
        <h2>Serverless React App</h2>
        <Footer />
      </div>
    );
  }
}

export default App;
