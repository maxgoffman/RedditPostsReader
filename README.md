# RedditPostsReader
Prototype of reddit top posts reader. 
## Test URL
https://goffman.com.ar/redditpostsreader/
## Summary
Did this work in two days. That includes research of how to use Reddit's API, before actually starting implementing the solution. I had to finish in only two days, because I can work only on weekends. Design is a bit crude, I had to rush it:<br />
![alt text](https://raw.githubusercontent.com/maxgoffman/RedditPostsReader/master/screens/rustic.png)<br />
I'm pretty sure that with enough time I could improve it a lot. It is "responsive" in the sense that it adjust the content to the viewport. However, being completely honest, I know that it doesn't look precisely amazing with smaller resolutions.
## Tools
I used create-react-app because I think it's a decent solution for prototyping fast a front tend app. Normally, I don't use it in a professional project. I tend to work with Docker, Docker Compose and Parcel for bundling (because I love it's automagical self configuration). Using create-react-app means I also used Jest for the automated test. I also used a lot of packages to solve my problems fast like reactstrap, font awesome, react-transition-group and so on. I'm saying this because I want to tell you that this isn't what I usually. I tend to be a lot more careful. 
## [Updated] Tools
I didn't even question myself the choice of using React Hooks. Most older projects I work on use stateful components with classes. But Hooks is the way React recommends for new projects.<br /> 
I didn't consider using Typescript, I settled for plain JSX. However, for a long term project I could use it.<br />
It's the same with the fetch API, some people don't like it and prefer using Axios or other libraries. In my case, I have used fetch for personal projects and I never have a problem. Some I'm sticking with fetch for this kind of project.
## Redux
Regarding Redux Store, I also used Redux Thunk because I also thought it's the best middleware for fast prototyping: it's implementation really lightweight (just 14 lines of code), it's easy to implement and it's practically an almost official solution. However, I'm not opposed to using sagas or other middleware.
## Local Run instructions
Prerequisites: npm or yarn.<br />
To run the project, just type npm run start or yarn start in your terminal.
## Test
I admit test coverage is pretty low. I just did a basic test suite. It's not that I think that my code is flawless. But, as I'm writing this lines, it's almost 4 am and I had to leave automated tests for the almost last (writing this document is my last task). <br />
To run the project, just type npm run test or yarn test in your terminal.
