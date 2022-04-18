import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import _ from "lodash";

function App({ value, setValue }) {
  const headerPillData = ["WorkFlow", "Partner", "Line of Business"];
  return (
    <div className="App">
      <div className="headerSection">
        <div className="flex-row">
          <div
            style={{
              height: "65px",
              background: "#862cb1",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Image
              height="40px"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFVklEQVR4nO2d7XnqRhCFZ7aBUIJcQZwKAh24BFyBnQqMK7A7gFRwbwe4A24qEKkA0sCc/EDylbkYS6uzHwi9P+1nZ0dzkM5qtVqJZIaZTczshRkTwBzAk5kVzLiDwswmAJ4A7ACAGbsSAABKAHNm7EFgZndVcd5hxm8IgFGIBmY2BbDGCZj9nBCgZn2VlyUzKz4rfGQBAABmtrwKIRrX+S9h9vuVAA2Ga9RoGGzGAgBD84fqOl92KEBqAYYhxDmDvRABai7LqCuD/dbjgHMTAMAFGPXxjVRfmLmBIECD/IwaxMLXkPNjCgDk4g++BtsGZp7gC1BToqcQzqdRbbCquhaRok8CF04hIkv0MOpOAphZYWbLqvBTnw5bsmcGA7AVkS0z5hFTVS2DGTXbYM+wM7OFmU0CHENhZqvA+dfwjBrAA8IXPtowL6IQJfr4Q0iDPWJtZlNahVsC4DbS8ZXoIkTfO9guiaUo/DE4jJDKCMd73qhrg42QyA7AY7QKt8TMFoggxC+X2iEYLIskRo0IBgvgG8Ngqx/LIw5zTWUj/qb627y/DHGNWgJ3QDNYtB+NleAJEXwgEkoAqsF6etMTq38ENGq2APTrvJm9+CbDXl8UwqhpAoQwWHDm8afMnNj+wBAg2BMjcH5tZYjcWEL0ESDoHSyIU8gh8+xr1F7T0SJyr6oz59wb82CaAPiTGO6OGOsDzrk3Vb0RkXuv9j6NVHXl065jH0WOsc70sfJp53sGxKAgxvqNGItKzgJsibH+I8aikq0AAP4hxvrBisUmWwFE5Dsx1hsxFhUFuq9AUFUNkcwxOIzhi55httUoJTg+tcz5DBAAXkO7oxgzRi6hyFoA59wbgGff9gCenXNbYkp8fO7eYudYTYJ15TF2nl619GqUgA63/Eke8ov4CZC1CZ+iKu6dqv4uPw36B4B/ReR7yOmRr/Cq5aUJkDM+tczahK+BUYDEjAIkZhQgMVkKwH62nPNisOwEADBX1Q0zpqrWe1HMmXEp+Nw8hMjjeFEwMzY+Pl/eBFxE0JnkZwAOy8TXEd66qbkN+jZLR5IJ0NiYaSNxCv8BVZ1XQrwkFSL2JajtamzW8Ym0WuJSguAPXrX0atSvELuQfZzptw0legjhU8sol6DKYDcishSRSYw+PSnk8NppCeA2RodRBKgM9jZGXyQKAA8xOko+Crp2RgESMwqQmFGAxIwCJGYUIDGjAIkZBUjMKEBiRgESMwqQmFGAxIwCJMZLgD5z5kPFd0Gw7xmwxKXtqRyIoy08O9PnEhR2q8bMYW3h2dsD6ofbyHFP5QDUz7RVdaOq877xmCa8UNX1kP0BwIOqliKyENKjVfYoqJCfz1Tn5NjJqN/OEZFXIT/TDjUMLeQgBGWvuFTE2CNbwXkXlw7zLZzqbFx2bLaX8Cs49g7ADD1eBR0wk4Cx9wCeAdw459zWObcAcAPg74CdjogIgBWAP5xzC+fc/t0DKiHmAG4k470VLpg3ADPn3H3z5fFfTNg5t1XVmRx2gNoe/3+kM1sAs892GPt0FKSqq8ZWXNtw+Q2WvYj8pao3595d/nIYqqqr0ag78W6wqvpKjRxzc2tm3gj3EZ8P+MyLdboRG436U04abBu87oRHo37nrMG2oddUxBUb9V5aGGxUKn94ZV1PmbmB5wHZf4SCt6cyEVzDxzyPqb6quhmAAMk2gKIAz48fBMihK1l85YkGDt9+aS0Eue8uAuyQ4VeeKHTxB2a/LQXI32BZtBGC2d9XAlycwbLAmc8Jkvv5TIDLNlgWOGHUAeI3GZbBskDDqMlxawF2GKrBsqj9gRzzLleD/R9uGbu/ABKSQwAAAABJRU5ErkJggg=="
              class="img-fluid desktopViewofLogo"
            />
          </div>
          <div
            style={{ height: "65px", alignItems: "center", padding: "12px" }}
          >
            <Image
              height="25px"
              src="https://www.marketplace.insurancegig.com/static/media/Artboard%209@4x-8.12ec2add.png"
            />
            {/* <h2 className="company-name">InsuranceGIG</h2> */}
          </div>
        </div>
        <div className="flex-row-align-center">
          <p className="header-text">Marketplace</p>
          <span className="dot"></span>
          <p className="header-text">Knowledge Graph</p>
        </div>
        <div className="header-tab-pill-container ">
          {headerPillData.map((h, i) => {
            return (
              <button
                onClick={() => {
                  setValue(i);
                }}
                className={
                  i == value ? " header-button-active" : "header-button"
                }
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
