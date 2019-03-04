`Memopad`
=============

React 여섯번째 실습
-------------

Velopert님이 3년전에 작성하신 codelab - Memopad 웹어플리케이션을 만들어보았다.<br>
3년전에 작성되었던 react 예제와 소스들이라 그대로 코드를 사용할 수는 없었고, 현재의 react버전에 맞게 수정해서 작성했다.<br>
그리고 webpack에 대해서 아직은 무지한지라 create-react-app을 중점적으로 사용하였다. (강의는 custom webpack으로 진행되었다.)<br>
server는 Expess를 사용해서 개발했는데, cors 문제가 생기는 부분은 create-react-app의 proxy로 해결하였다. <br>
몽고db는 mLab 사이트가 제공하는 무료db를 사용하였고, 프로덕션 빌드로는 heroku를 사용해보았다. <br><br>
결과물 : [zomb의 Memopad](https://memopad.herokuapp.com/)
<br>
<br>
Link: [참고한 velopert님 강의링크](https://velopert.com/1921)
<br>

#### 사용한 플러그인<br>
1. axios
2. babel-polyfill
3. bcryptjs
4. body-parser
5. concurrently
6. core-js
7. express
8. express-session
9. mongoose
10. react
11. react-addons-css-transition-group
12. react-addons-update
13. react-app-polyfill
14. react-dom
15. react-redux
16. react-router
17. react-router-dom
18. react-scripts
19. react-timeago
20. redux
21. redux-thunk


#### 느낀점 or 특이사항<br>

1. 여전히 webpack설정이 익숙하지 않아서 create-react-app을 이용한다. 
2. webpack을 자유자재로 다루게 되도 create-react-app을 자주 사용하지않을까 싶다.
3. 몽고db를 로컬에서만 돌리다가 mLab같은 외부 서버로 연결은 처음해봤는데, 생각보다 무리없이 사용할 수 있어서 놀랐다.
4. 항상 css를 직접 작성하다가 외부 플러그인 Materialize나 react-addons-css-transition-group을 사용해보니, 너무 편해서 놀랐다.
5. webpack 설정을 잘 못해서 프로덕션 빌드에 겁을 먹고 있었는데, heroku로 직접 해보니 생각보다 쉬웠다.
4. 종합적으로 그동안, 너무 겁먹고 있지 않았었나 싶다. 좀 더 여러가지 어플리케이션을 만들면서 완전히 내 기술로 만들고싶다.
