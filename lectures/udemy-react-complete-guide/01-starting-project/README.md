# 01-starting-project

## 주요 개념 정리

### 🧩 jsx란?

- jsx는 JavaScript에 HTML을 섞어쓸 수 있는 확장 문법입니다.
- 브라우저는 .jsx 파일을 해석할 수 없기 때문에, 빌드 과정에서 일반 자바스크립트로 변환 됩니다.

### ⚙️ 리액트에서 컴포넌트로 인식 되기 위한 두 가지 규칙

리액트는 특정 조건을 만족하는 함수를 컴포넌트로 인식합니다:

- 함수 이름은 반드시 대문자로 시작해야 합니다. (내장 컴포넌트와 충돌하는 것을 방지)
- 렌더링 가능한 값을 반환해야 합니다. (주로 JSX 형식의 HTML 마크업)

```js
// App.js

function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <main>
        <Header />
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

### 🔁 리액트의 컴포넌트 처리 과정

리액트 앱은 브라우저에서 다음과 같은 흐름으로 동작합니다:

#### 📄 index.html

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
```

`id="root"` 인 `<div>`가 리액트 앱이 삽입 될 엔트리 포인트입니다.

#### 📦 index.jsx

```js
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
```

`ReactDOM.createRoot(...).render(<App />)` 을 통해 `<App />` 컴포넌트가 브라우저에 렌더링 됩니다.

#### 🧱 App.jsx

```js
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <main>
        <Header />
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

- `App`컴포넌트는 최상위 컴포넌트이며, 내부에 `Header` 컴포넌트를 포함하고 있습니다.
- 이 구조는 리액트 앱의 가장 기본적인 트리 형태를 보여주고 있습니다.
