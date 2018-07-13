# Conway's Game of Life

## Building and Developing

Build and run in docker with the repo mounted in the container for development.

  ```
  $ # Clone the repo and build the docker image.
  $ git clone git@github.com:kevinhankens/golly.git && cd golly
  $ docker build -t kevinhankens/golly:latest .
  $ # Or pull the image from dockerhub.
  $ docker pull kevinhankens/golly:latest
  $ # Run golly in a container mounting your local files.
  $ docker run -d --rm --name golly -p 4000:80 -v "$PWD":/usr/local/apache2/htdocs/ kevinhankens/golly:latest
  $ # Run tests via jest.
  $ docker exec golly npm run test
  $ # To test visually, point your browser at http://localhost:4000/
  ```

## Caveats

- To keep the data size small and allow easy visual inspection, I chose to wrap the edges. The effect is that you can visualize the patterns. The side effect is that after many iterations the state is not true to the game rules as wrapping creates additional collisions. For example, instead of escaping, the gliders will exit on one side and appear on the opposite.
- Some of the Javascript used is relatively modern - e.g. async/await. I did not explore browser/node compatibility very thoroughly, but it appears to work well using:
  - Chrome 60.0.3112.101 (Mac 10.12.6)
  - Safari 11.0 (Mac 10.12.6)
  - Firefox 56.0 (Mac 10.12.6)
  - Node 8.1.2 (Mac 10.12.6)
  - Node 8.6.0 (Debian Jesse)

## TODO

There is still much I would like to add given more time.

- Code clean up and optimization.
- Remove Life object side effects and encapsulate any properties directly accessed.
- Allow configurable sleep duration.
- Create a better input method than just a giant array and add input checks.
- Add canned patterns to make the visual inspection easier.
- Use an alpine container to reduce the size.
- Explore Vue.js a little more to better utilize the bindings instead of just writing the DOM classes.
- Improve browser compatibility.
- Create an option to not wrap the cell edges, or expand the board maybe.

## Some header
- Some thing
- Another thing
